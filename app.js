/* =============================================
   LiveClass — app.js
   AET Teaching Framework + Gemini AI
   Version: 0.4
   ============================================= */

// ─── CONFIG — CHANGE NOTHING ELSE ───────────
// This is the ONLY line you may need to change
// in the future if you rename your Pages project.
// It always points to the same Pages domain + /api/teach
const API_URL = '/api/teach';
// ────────────────────────────────────────────

const STATE = {
  listening:   false,
  speaking:    false,
  history:     [],   // conversation history sent to AI
  lastSpoken:  '',
  notes:       [],
  chapter:     '',
  topic:       '',
  rec:         null,
};

// ─── DOM ────────────────────────────────────
const $ = id => document.getElementById(id);
const dom = {
  ringO:      $('ringO'),
  ringI:      $('ringI'),
  sDot:       $('sDot'),
  sTxt:       $('sTxt'),
  topicCh:    $('topicCh'),
  topicTxt:   $('topicTxt'),
  boardTitle: $('boardTitle'),
  boardSteps: $('boardSteps'),
  chalkCursor:$('chalkCursor'),
  ptsCard:    $('ptsCard'),
  ptsList:    $('ptsList'),
  notesCard:  $('notesCard'),
  notesList:  $('notesList'),
  notesCount: $('notesCount'),
  micBtn:     $('micBtn'),
  micIcon:    $('micIcon'),
  stopIcon:   $('stopIcon'),
  micHint:    $('micHint'),
  waveform:   $('waveform'),
  toast:      $('toast'),
  handBtn:    $('handBtn'),
  notesBtn:   $('notesBtn'),
};

// ─── SYSTEM PROMPT (AET Framework) ──────────
const SYSTEM = `You are Priya Ma'am — an AI teacher for Indian students (Class 6 to 12, JEE, NEET, CBSE, ICSE boards).

PERSONALITY:
- Warm, encouraging, patient — like a best friend who knows everything
- Speak in Hinglish (natural Hindi + English mix)
- Never say "Wrong answer" — say "Almost! Thoda aur sochte hain"
- Celebrate small wins genuinely
- Never behave like a chatbot or AI assistant

AET TEACHING FLOW (always follow this order):
Phase 1 — Hook: Start with a real-life story or surprising fact (30 sec)
Phase 2 — Visual: Describe what to imagine or draw
Phase 3 — Teach: Definition → Formula/Equation → Example → Step-by-step solve
Phase 4 — Check: Ask one question to verify understanding
Phase 5 — Encourage: Celebrate + preview next concept

BOARD RULES:
- Never write long paragraphs on board
- Each board step = one short, clear idea
- Formulas always in their own box
- Chemical equations in their own box
- Examples clearly labeled

EIE (Exam Intelligence Engine):
- Tag concepts with exam weight: [1M] [2M] [3M] [5M]
- Mention CBSE/JEE/NEET relevance when teaching
- Give answer writing tips for board exams
- "Ye 5-mark question ban sakta hai — diagram zaroor banana"

RESPONSE FORMAT — return ONLY this JSON, nothing else:
{
  "chapter": "Chapter name",
  "topic": "Current micro-topic being taught",
  "boardSteps": [
    { "type": "text",    "content": "Short intro line" },
    { "type": "def",     "label": "Definition", "content": "The definition" },
    { "type": "formula", "label": "Formula",    "content": "F = ma" },
    { "type": "eq",      "label": "Equation",   "content": "Mg + O₂ → MgO" },
    { "type": "eg",      "label": "Example",    "content": "Example here" },
    { "type": "bullets", "items": ["Point 1", "Point 2"] },
    { "type": "q",       "label": "Priya Ma'am Asks", "content": "Question?" },
    { "type": "enc",     "content": "Very good! Aage chalte hain." }
  ],
  "spoken": "Full natural Hinglish speech — what Priya Ma'am says aloud. 2-3 minutes of teaching. Include hook, explanation, example, and question at the end.",
  "keyPoints": ["Formula or trick 1", "Definition 2"],
  "examTip": "Optional: Board/JEE exam tip for this concept"
}

Use only the board step types you need. Always end with a "q" step.
boardSteps: 3 to 7 steps maximum per response.
Return ONLY the JSON. No extra text.`;

// ─── TEACHER STATE MACHINE ───────────────────
function setMode(mode) {
  // mode: idle | listening | thinking | talking
  const cls = { idle:'', listening:'listening', thinking:'thinking', talking:'talking' };
  dom.ringO.className = `ring ring-o ${cls[mode] || ''}`;
  dom.ringI.className = `ring ring-i ${cls[mode] || ''}`;
  dom.sDot.className  = `status-dot ${cls[mode] || ''}`;
  const labels = { idle:'Ready to teach', listening:'Listening...', thinking:"Thinking...", talking:"Teaching..." };
  dom.sTxt.textContent = labels[mode] || 'Ready';
}

// ─── CHALKBOARD ENGINE ───────────────────────
function clearBoard() {
  dom.boardSteps.innerHTML = '';
  dom.chalkCursor.style.display = 'none';
}

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function buildStep(s) {
  const div = document.createElement('div');
  div.className = 'step';

  if (s.type === 'text') {
    div.innerHTML = `<p class="step-text">${esc(s.content)}</p>`;

  } else if (s.type === 'def') {
    div.innerHTML = `<div class="step-def"><span class="lbl">${esc(s.label||'Definition')}</span><span class="val">${esc(s.content)}</span></div>`;

  } else if (s.type === 'formula') {
    div.innerHTML = `<div class="step-formula"><span class="lbl">${esc(s.label||'Formula')}</span><span class="val">${esc(s.content)}</span></div>`;

  } else if (s.type === 'eq') {
    div.innerHTML = `<div class="step-eq"><span class="lbl">${esc(s.label||'Equation')}</span><span class="val">${esc(s.content)}</span></div>`;

  } else if (s.type === 'eg') {
    div.innerHTML = `<div class="step-eg"><span class="lbl">${esc(s.label||'Example')}</span><span class="val">${esc(s.content)}</span></div>`;

  } else if (s.type === 'bullets') {
    const items = (s.items||[]).map(i=>`<li>${esc(i)}</li>`).join('');
    div.innerHTML = `<ul class="step-bullets">${items}</ul>`;

  } else if (s.type === 'q') {
    div.innerHTML = `<div class="step-q"><span class="lbl">${esc(s.label||"Priya Ma'am Asks")}</span><span class="val">${esc(s.content)}</span></div>`;

  } else if (s.type === 'enc') {
    div.innerHTML = `<p class="step-enc">✨ ${esc(s.content)}</p>`;

  } else {
    div.innerHTML = `<p class="step-text">${esc(s.content||'')}</p>`;
  }
  return div;
}

function showBoard(steps, spokenText) {
  clearBoard();
  dom.chalkCursor.style.display = 'flex';

  // Spread steps over the speech duration
  const words   = (spokenText||'').trim().split(/\s+/).length;
  const totalMs = Math.max(3000, (words / 130) * 60000); // ~130 wpm teaching pace
  const delay   = Math.floor(totalMs / (steps.length + 1));

  steps.forEach((step, i) => {
    setTimeout(() => {
      const el = buildStep(step);
      dom.boardSteps.appendChild(el);
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
      if (i === steps.length - 1) {
        setTimeout(() => { dom.chalkCursor.style.display = 'none'; }, 500);
      }
    }, i * delay);
  });
}

function boardMessage(content, type = 'text') {
  clearBoard();
  const el = buildStep({ type, content });
  dom.boardSteps.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
}

// ─── KEY POINTS ──────────────────────────────
function showKeyPoints(pts, examTip) {
  if (!pts || pts.length === 0) return;
  dom.ptsList.innerHTML = '';
  const allPts = examTip ? [...pts, `📋 Exam Tip: ${examTip}`] : pts;
  allPts.forEach(pt => {
    const li = document.createElement('li');
    li.className = 'pt-item';
    li.innerHTML = `<span class="pt-chk">✓</span><span class="pt-txt">${esc(pt)}</span><button class="save-btn" onclick="saveNote(this)">Save</button>`;
    dom.ptsList.appendChild(li);
  });
  dom.ptsCard.style.display = 'block';
}

// ─── NOTES ───────────────────────────────────
window.saveNote = function(btn) {
  const txt = btn.previousElementSibling.textContent;
  STATE.notes.push(txt);
  const li = document.createElement('li');
  li.className = 'note-item';
  li.innerHTML = `<span>★</span><span>${esc(txt)}</span>`;
  dom.notesList.appendChild(li);
  dom.notesCard.style.display = 'block';
  dom.notesCount.textContent  = STATE.notes.length;
  btn.textContent = '✓ Saved'; btn.classList.add('saved'); btn.disabled = true;
  showToast();
};

function showToast() {
  dom.toast.style.display = 'block';
  clearTimeout(window._toastT);
  window._toastT = setTimeout(() => { dom.toast.style.display = 'none'; }, 2000);
}

window.toggleNotes = function() {
  const show = dom.notesCard.style.display === 'none';
  dom.notesCard.style.display = show ? 'block' : 'none';
  dom.notesBtn.classList.toggle('active', show);
  if (show) dom.notesCard.scrollIntoView({ behavior:'smooth', block:'nearest' });
};

// ─── RAISE HAND ──────────────────────────────
window.raiseHand = function() {
  stopListening(); stopSpeaking();
  dom.handBtn.classList.add('active');
  boardMessage("Haan beta, poochho! Main sun rahi hoon. 🙏", 'enc');
  setMode('listening');
  setTimeout(() => {
    dom.handBtn.classList.remove('active');
    startMic();
  }, 800);
};

// ─── REPEAT ──────────────────────────────────
window.repeatLast = function() {
  if (!STATE.lastSpoken) { boardMessage("Abhi kuch padhaya nahi — pehle topic batao!", 'text'); return; }
  stopSpeaking(); speak(STATE.lastSpoken);
};

// ─── SPEECH RECOGNITION ──────────────────────
function initRec() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { boardMessage("Browser voice support nahi hai. Chrome use karo.", 'text'); return null; }
  const r = new SR();
  r.continuous = false; r.interimResults = true; r.lang = 'hi-IN';

  r.onstart = () => {
    STATE.listening = true;
    setMode('listening');
    dom.micBtn.classList.add('on');
    dom.micIcon.style.display = 'none'; dom.stopIcon.style.display = 'block';
    dom.micHint.textContent   = 'Tap to stop';
    dom.waveform.style.display = 'flex';
    stopSpeaking();
  };

  r.onresult = e => {
    let t = '';
    for (let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript;
    if (!e.results[e.results.length-1].isFinal) {
      dom.boardTitle.textContent = `"${t}..."`;
      return;
    }
    dom.boardTitle.textContent = STATE.topic || 'Teaching...';
    onStudentSpoke(t.trim());
  };

  r.onerror = e => { stopListening(); if (e.error !== 'no-speech') boardMessage(`Mic error: ${e.error}`, 'text'); };
  r.onend   = () => { if (STATE.listening) stopListening(); };
  return r;
}

function startMic() {
  if (!STATE.rec) STATE.rec = initRec();
  if (!STATE.rec) return;
  try { STATE.rec.start(); }
  catch(e) { STATE.rec = initRec(); STATE.rec?.start(); }
}

function stopListening() {
  STATE.listening = false;
  dom.micBtn.classList.remove('on');
  dom.micIcon.style.display = 'block'; dom.stopIcon.style.display = 'none';
  dom.micHint.textContent   = 'Tap to speak';
  dom.waveform.style.display = 'none';
  try { STATE.rec?.stop(); } catch(e) {}
}

window.toggleMic = function() {
  if (STATE.listening) { stopListening(); return; }
  startMic();
};

// ─── STUDENT SPOKE → AI ──────────────────────
async function onStudentSpoke(text) {
  if (!text) return;
  stopListening();
  setMode('thinking');
  clearBoard();
  dom.chalkCursor.style.display = 'flex';
  dom.boardTitle.textContent    = "Priya Ma'am soch rahi hain...";

  STATE.history.push({ role:'user', content: text });
  if (STATE.history.length > 20) STATE.history = STATE.history.slice(-18);

  try {
    const raw = await callAPI(STATE.history);
    handleResponse(raw);
  } catch(err) {
    console.error('API error:', err);
    boardMessage(`Network error: ${err.message} — Check CF Pages env vars (GEMINI_API_KEY)`, 'text');
    setMode('idle');
  }
}

// ─── API CALL ────────────────────────────────
async function callAPI(messages) {
  const res = await fetch(API_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ messages, system: SYSTEM }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`${res.status} — ${t}`);
  }
  const data = await res.json();
  return data.text || '';
}

// ─── HANDLE AI RESPONSE ──────────────────────
function handleResponse(raw) {
  let parsed;
  try {
    const clean = raw.replace(/^```json\s*/i,'').replace(/```\s*$/,'').trim();
    parsed = JSON.parse(clean);
  } catch(e) {
    parsed = { chapter:'', topic:'', boardSteps:[{type:'text',content:raw}], spoken:raw, keyPoints:[] };
  }

  const { chapter, topic, boardSteps, spoken, keyPoints, examTip } = parsed;

  if (chapter) { STATE.chapter = chapter; dom.topicCh.textContent  = chapter; }
  if (topic)   { STATE.topic   = topic;   dom.topicTxt.textContent = topic;   }
  dom.boardTitle.textContent = topic || 'Teaching...';

  STATE.history.push({ role:'assistant', content: raw });
  STATE.lastSpoken = spoken || raw;

  setMode('talking');
  speak(spoken || raw);
  if (boardSteps?.length) showBoard(boardSteps, spoken || raw);
  showKeyPoints(keyPoints, examTip);
}

// ─── TTS ─────────────────────────────────────
function speak(text) {
  if (!window.speechSynthesis) return;
  stopSpeaking();
  const clean = text.replace(/[*_`#]/g,'').substring(0, 900);
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = 'hi-IN'; u.rate = 0.9; u.pitch = 1.05; u.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v=>(v.lang==='hi-IN'||v.lang==='en-IN')&&/female/i.test(v.name))
         || voices.find(v=>v.lang==='hi-IN'||v.lang==='en-IN')
         || null;
  if (v) u.voice = v;
  u.onstart = () => { STATE.speaking = true; setMode('talking'); };
  u.onend   = () => { STATE.speaking = false; setMode('idle'); };
  u.onerror = () => { STATE.speaking = false; setMode('idle'); };
  window.speechSynthesis.speak(u);
}

function stopSpeaking() {
  window.speechSynthesis?.cancel();
  STATE.speaking = false;
}

// ─── BOOT ────────────────────────────────────
window.addEventListener('load', () => {
  window.speechSynthesis?.getVoices();
  window.speechSynthesis?.addEventListener('voiceschanged', ()=>window.speechSynthesis.getVoices());

  setTimeout(() => {
    setMode('talking');
    const welcome = [
      { type:'text', content:"Namaste! Main hoon Priya Ma'am. Aaj hum milke padhai karenge! 🙏" },
      { type:'q',    label:"Bolo Beta", content:"Kaunsa subject aur chapter padhna hai aaj? Physics, Chemistry, ya Maths?" },
    ];
    showBoard(welcome, "Namaste beta! Main Priya Ma'am. Kaunsa chapter padhna hai?");
    speak("Namaste beta! Main hoon Priya Ma'am. Aaj hum milke padhai shuru karte hain. Bolo — kaunsa chapter study karna hai? Physics, Chemistry ya Maths?");
    STATE.lastSpoken = "Namaste beta! Kaunsa chapter padhna hai?";
    STATE.history.push({ role:'assistant', content:"Namaste! I am Priya Ma'am. Which chapter would you like to study today?" });
  }, 600);
});
