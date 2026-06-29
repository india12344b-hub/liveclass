# LiveClass — Priya Ma'am

## Deployment

This project uses **Cloudflare Workers + Pages unified deployment** via GitHub.
GitHub push → Cloudflare auto-builds and deploys. No manual steps needed.

## File Structure

```
liveclass/
├── public/
│   ├── index.html          ← Full UI (teacher avatar, board, controls)
│   └── app.js              ← All frontend logic (speech, board, Gemini call)
├── functions/
│   └── api/
│       └── teach.js        ← Cloudflare Pages Function → calls Gemini API
├── wrangler.toml
└── .gitignore
```

## One-time Setup (API Key)

1. Get free Gemini key: **aistudio.google.com** → Get API Key → Create
2. CF Dashboard → Workers & Pages → **liveclass** → **Settings**
3. **Environment Variables** → Add variable:
   - Name:  `GEMINI_API_KEY`
   - Value: `AIza...`
   - ✓ Encrypt (Secret)
4. Save → **Deployments** → Retry deployment

That's it. Every future `git push` auto-deploys.

## Future Updates

| What to change         | File                        |
|------------------------|-----------------------------|
| UI / design            | `public/index.html`         |
| Teaching logic / AI    | `public/app.js`             |
| AI model / backend     | `functions/api/teach.js`    |

Push to GitHub → live in ~30 seconds.

## How it works

```
Student speaks
    ↓
Web Speech API (Chrome/Android)
    ↓
app.js → POST /api/teach
    ↓
functions/api/teach.js (Cloudflare Pages Function)
    ↓
Gemini 2.0 Flash API (key stays secret on server)
    ↓
JSON response → Board updates + Priya Ma'am speaks
```
