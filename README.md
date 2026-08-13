# 🌴 HH Goa 2026 — Builder ID Card Generator

A **100% frontend** tool that lets builders create and share a personalised event badge for Hacker House Goa 2026.

No login. No signup. No backend. Works in one pass, start to finish.

---

## ✨ What it does

1. **Upload a photo** — JPG, PNG, WEBP or HEIC (up to 20 MB, any aspect ratio)
2. **Fill in your details** — name, stack/role, and an auto-generated builder title
3. **Preview in real-time** — the card updates instantly as you type
4. **Download** — saves a crisp 900 × 500 px PNG to your device
5. **Share to X** — opens a pre-filled tweet with `#FrameInGoa`; on mobile the Web Share API attaches the image directly

---

## 📁 Folder Structure

```
idcard_module/
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── assets/
        │   └── hh_goa_logo.png
        ├── components/
        │   └── HHGoaIdCard.jsx       ← The card renderer (900 × 500 px)
        └── pages/
            └── HHGoaGeneratorPage.jsx ← Upload → customise → download/share flow
```

---

## 🚀 Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `react` + `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `html-to-image` | Captures the card component as a PNG |
| `vite` | Dev server & bundler |

---

## 🛠️ Building for Production

```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/`. Deploy the contents of `dist/` to any static host (Vercel, Netlify, GitHub Pages, etc.).

---

## 📐 Card Specs

- **Size**: 900 × 500 px (landscape, optimised for social sharing)
- **Format**: PNG (downloaded at 2× pixel ratio = 1800 × 1000 px)
- **Theme**: Dark (`#060d1e` base), teal (`#00d4aa`) and gold (`#ffd166`) accents

---

## ⚠️ Notes

- **HEIC photos** (iPhone default format) are accepted via the file input. Browser support for rendering HEIC varies; if the preview looks blank, convert to JPG first or use Chrome/Safari.
- The **Web Share API** (mobile image attach) requires HTTPS in production. On `localhost` it falls back to a Twitter intent URL.
- No data is ever sent to a server — everything runs locally in the browser.
