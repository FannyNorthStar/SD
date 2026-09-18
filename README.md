# Ask a Coach 🌿

A self-coaching companion that uses the CTFAR model (Circumstance → Thought → Feeling → Action → Result) to help you understand your thought patterns and find better perspectives.

Write a brain dump. Get a structured analysis. Continue the conversation. Archive your growth.

---

## Quick Start

1. Put `index.html` in a GitHub repo and enable GitHub Pages (Settings → Pages → Deploy from branch)
2. Open the page, click ⚙️ Settings
3. Paste your **OpenAI API key**
4. Start brain-dumping

---

## How It Works

**You write freely.** Messy, emotional, unfiltered. Whatever is on your mind.

**The coach analyzes.** Using the CTFAR model, it identifies:
- The neutral **Circumstance** (what actually happened)
- The **Thought** creating your experience (the sentence in your mind)
- The **Feeling** that thought generates (one word)
- The **Actions** that feeling drives (including inaction)
- The **Result** — which always reinforces the original thought

**Then it offers alternatives.** Believable bridge thoughts and stretch thoughts that could create different results. Not toxic positivity — real, gradual shifts.

**You continue talking.** The coach asks powerful questions. You explore. You gain awareness. That's the real work.

---

## Setup: Google Sheets Archive (Optional)

This lets you keep a cloud backup of all your sessions.

### Step by step

1. **Create a Google Sheet** — name it whatever you want (e.g., "Coach Archive")

2. **Open Apps Script** — Extensions → Apps Script

3. **Paste the script** — delete the default code, paste everything from `google-apps-script.js`

4. **Deploy:**
   - Click **Deploy → New deployment**
   - Click the gear icon → **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
   - Authorize when prompted (you'll see a warning because it's your own script — click Advanced → Go to [project name])

5. **Copy the URL** — it looks like `https://script.google.com/macros/s/AKfycb.../exec`

6. **Paste in Settings** — open Ask a Coach → ⚙️ → paste the URL → Save

7. **Test** — click "Test connection," then check your sheet for a test row

### What gets archived

Each exchange (brain dump + coach response) appends a row with:
- Timestamp
- Session ID & title
- Your brain dump text
- The coach's response
- CTFAR models (formatted text)
- The coaching question
- Message count

---

## Architecture

```
Browser (GitHub Pages)
  ├── index.html .............. Single-file app, no build step
  ├── localStorage ............ Sessions, settings, API key
  │
  ├──→ OpenAI API ............. GPT-4o / GPT-4o-mini
  │     (direct from browser,
  │      API key stays local)
  │
  └──→ Google Apps Script ..... Webhook for archiving
        └── Google Sheet ....... Cloud backup of all sessions
```

### Security Notes

- **API key** is stored in your browser's `localStorage`. It never touches any server except OpenAI's API. Use this on a personal device you control.
- **Brain dump content** is sent to OpenAI for processing. Review their [data usage policy](https://openai.com/policies/api-data-usage-policies) — API data is not used for training by default.
- **Google Sheets sync** uses `no-cors` mode, so the browser can't read the response. The script just appends data. Your sheet is only accessible to you.

### Cost

- GPT-4o: roughly $0.02–0.05 per coaching exchange
- GPT-4o-mini: roughly $0.002–0.005 per exchange
- A typical 6-message session costs ~$0.10 on GPT-4o

---

## The CTFAR Model

See `ctfar-reference.md` for the full methodology reference. Key points:

**Circumstances** are neutral facts. "He said X" not "He was rude."

**Thoughts** are optional. They feel like truth, but they're interpretations. This is where all the coaching leverage is.

**Feelings** are one word. If it takes a sentence, that's a thought pretending to be a feeling.

**Actions** include what you do, what you don't do, and how you show up.

**Results** always prove the original thought true. That's the self-fulfilling cycle. Change the thought, change the result.

---

## Customization

### Change the coaching style

Edit the `SYSTEM_PROMPT` constant in `index.html`. The prompt defines the coach's personality, approach, and response format.

### Change the model

In Settings, pick between GPT-4o (best quality, higher cost) and GPT-4o-mini (faster, cheaper, still good). GPT-4.1 variants are also available.

### Self-host

This is a single HTML file with no dependencies. Put it anywhere that serves static files — GitHub Pages, Netlify, a local web server, even open it directly as a file.

---

## Limitations & Known Issues

1. **Not therapy.** This is a self-development tool. If you're in crisis, please reach out to a mental health professional.

2. **Quality varies.** The AI sometimes drifts into generic advice instead of clean model work. The system prompt minimizes this but it's not perfect.

3. **Context window.** Only the last 16 messages are sent to the AI. Very long sessions may lose early context.

4. **Sheets sync is fire-and-forget.** Due to CORS limitations, the app can't confirm the sync succeeded. Check your sheet periodically.

5. **Single device.** Sessions live in localStorage. If you clear browser data or switch devices, local sessions are gone (Sheets archive remains).

---

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire app — drop it in a repo and go |
| `ctfar-reference.md` | Full methodology reference (for your reading / customizing the prompt) |
| `google-apps-script.js` | Paste into Google Apps Script for Sheets archiving |
| `README.md` | This file |

---

Built with the philosophy that awareness is the first step, thoughts are always optional, and you already have the answers inside you.
