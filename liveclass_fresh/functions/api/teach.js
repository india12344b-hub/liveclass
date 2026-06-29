/*
  LiveClass — /functions/api/teach.js
  Cloudflare Pages Function (auto-detected from functions/ folder)
  Handles POST /api/teach → calls Gemini → returns { text }

  ENV VAR NEEDED (set once in CF Dashboard):
  Name: GEMINI_API_KEY
  Type: Secret
*/

const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function onRequestPost({ request, env }) {

  // Parse body
  let body;
  try { body = await request.json(); }
  catch { return res({ error: 'Invalid JSON' }, 400); }

  const { messages, system } = body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res({ error: 'messages[] required' }, 400);
  }

  // API key check — shows clear error on board if missing
  if (!env.GEMINI_API_KEY) {
    return res({
      error: 'GEMINI_API_KEY missing. Set it in: CF Dashboard → liveclass → Settings → Environment Variables → Add → GEMINI_API_KEY (Secret)'
    }, 500);
  }

  // Build Gemini payload
  const contents = messages.map(m => ({
    role:  m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content) }],
  }));

  const payload = {
    system_instruction: { parts: [{ text: system || '' }] },
    contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
  };

  // Call Gemini
  try {
    const r    = await fetch(`${GEMINI_URL}?key=${env.GEMINI_API_KEY}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const data = await r.json();

    if (!r.ok) {
      return res({ error: data?.error?.message || 'Gemini API error' }, r.status);
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res({ text });

  } catch (err) {
    return res({ error: 'Worker error: ' + err.message }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: cors() });
}

function res(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
}

function cors() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
