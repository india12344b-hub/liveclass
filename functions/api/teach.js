/* =============================================
   LiveClass — Cloudflare Pages Function
   File: functions/api/teach.js

   HOW THIS WORKS:
   - Cloudflare Pages automatically detects this file
   - It becomes the /api/teach endpoint
   - Your GEMINI_API_KEY stays secret on the server
   - Frontend never sees the key

   SETUP (one time only):
   CF Dashboard → Pages → YOUR_PROJECT → Settings
   → Environment Variables → Add variable
   Name: GEMINI_API_KEY
   Value: AIza... (from aistudio.google.com)
   Type: Secret ✓
   → Save → Deployments → Retry deployment
   ============================================= */

// ── Gemini model to use ──────────────────────
// Change this line only if you want a different model
const GEMINI_MODEL = 'gemini-2.0-flash';
// ────────────────────────────────────────────

export async function onRequestPost({ request, env }) {

  // 1. Parse request body
  let body;
  try { body = await request.json(); }
  catch { return respond({ error: 'Invalid request body' }, 400); }

  const { messages, system } = body;

  // 2. Validate
  if (!Array.isArray(messages) || messages.length === 0) {
    return respond({ error: 'messages array is required' }, 400);
  }

  // 3. Check API key — clear error message if missing
  if (!env.GEMINI_API_KEY) {
    return respond({
      error: 'GEMINI_API_KEY not found. Go to: CF Dashboard → Pages → your project → Settings → Environment Variables → Add GEMINI_API_KEY as Secret'
    }, 500);
  }

  // 4. Build Gemini API request
  // Gemini uses "model" role instead of "assistant"
  const contents = messages.map(m => ({
    role:  m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content) }],
  }));

  const geminiPayload = {
    system_instruction: { parts: [{ text: system || '' }] },
    contents,
    generationConfig: {
      temperature:     0.7,
      maxOutputTokens: 1500,
    },
  };

  // 5. Call Gemini
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;

  try {
    const res  = await fetch(geminiURL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(geminiPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      // Gemini returned an error — log it and return clear message
      console.error('Gemini error:', JSON.stringify(data));
      return respond({
        error: data?.error?.message || 'Gemini API error',
        hint:  'Check your GEMINI_API_KEY is valid and has quota'
      }, res.status);
    }

    // 6. Extract text from Gemini response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return respond({ text }, 200);

  } catch (err) {
    console.error('Pages Function error:', err.message);
    return respond({ error: 'Server error: ' + err.message }, 500);
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

// ── Helpers ──────────────────────────────────
function respond(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
