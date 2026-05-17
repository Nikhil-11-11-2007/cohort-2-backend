# 🏛️ GovSewa Portal — Unhinged UI/UX Crimes

> **"Empowering Citizens Through Intentionally Confusing Technology Since 1947"**
>
> Built for the **Unhinged UI/UX Crimes** Hackathon

---

## 🚀 Tech Stack

- **React 19 + Vite 8**
- **React Router v6** (programmatic navigation everywhere)
- **GSAP** (animations on every interaction)
- **Tailwind CSS v4** (`@tailwindcss/vite`)

---

## 📍 Routes

| Route | Page | Description |
|---|---|---|
| `/` | `Home.jsx` | Landing page with sidebar ads, wrong nav links |
| `/apply` | `ApplyForm.jsx` | Full form with every UX crime |
| `/captcha` | `CaptchaPage.jsx` | Reverse CAPTCHA — wrong answer proceeds |
| `/confirm` | `ConfirmPage.jsx` | 4× Confirmation Modal Hell + FakeLoader |
| `/success` | `SuccessPage.jsx` | Confetti + fake download button |

---

## 💀 UX Crimes Catalogue

| # | Crime | Component | Route |
|---|---|---|---|
| 1 | **Submit button escapes cursor on hover** — GSAP moves it to random position; surrenders after 5 attempts via `gsap.to()` | `EscapeButton.jsx` | `/apply` |
| 2 | **Fake loading bar resets 3× before proceeding** — `gsap.timeline()` fills 0→100% then snaps back, 3 cycles, then `useNavigate` | `FakeLoader.jsx` | `/confirm` |
| 3 | **Virus popup flies in mid-form** — `gsap.fromTo()` from random off-screen corner; 4×4px ✕ close button | `VirusPopup.jsx` | `/apply` |
| 4 | **Giant cookie accept / 4px decline** — GSAP `from({ y:100, opacity:0 })` slides up on mount | `CookieBanner.jsx` | All pages |
| 5 | **Infinite marquee ticker** — `gsap.to({ x: '-50%' })` repeat -1 | `MarqueeTicker.jsx` | All pages |
| 6 | **Session timer resets at 3 forever** — counts 10→3, resets, never expires | `SessionTimer.jsx` | All pages |
| 7 | **Reverse CAPTCHA** — "Which is NOT a vegetable?" — correct answer (Sun) fails; picking a vegetable passes | `CaptchaPage.jsx` | `/captcha` |
| 8 | **Password from hell** — requires uppercase + number + emoji + min 47 chars; errors say "Seriously? Try harder." | `ApplyForm.jsx` | `/apply` |
| 9 | **4× chained confirmation modals** — "Are you sure?" → "REALLY sure?" → "Last chance!" → "Fine. Whatever." | `ConfirmModal.jsx` | `/confirm` |
| 10 | **Triple nested dropdown** — State → District → Sub-district | `NestedDropdown.jsx` | `/apply` |
| 11 | **Wrong navigation** — Home nav link goes to `/apply`, About loops to `/` | `Home.jsx` | `/` |
| 12 | **Random redirect (20%)** — any nav click has 20% chance to go to wrong route | `Home.jsx` | `/` |
| 13 | **Fields randomly clear on blur (30%)** — with cheeky error message | `ApplyForm.jsx` | `/apply` |
| 14 | **Help tooltip** — Office hours: 3:00 AM–3:15 AM, alternate Tuesdays only | `ApplyForm.jsx` | `/apply` |
| 15 | **Document type selector: horizontal scroll only** — 20 options, no vertical scroll | `ApplyForm.jsx` | `/apply` |
| 16 | **Volume slider locked to 80–100%** — "Muting is unpatriotic" | `ApplyForm.jsx` | `/apply` |
| 17 | **Every popup has 4×4px ✕ button** — invisible, impossible to click | `VirusPopup`, `ConfirmModal`, `CookieBanner` | All |
| 18 | **Fake sidebar ads** — "Buy Aadhaar Cover ₹2,999 — Limited Stock!" | `Home.jsx` | `/` |
| 19 | **Page entry animations** — `gsap.fromTo({ opacity:0, y:30 }, {...})` on every route | `usePageTransition.js` | All pages |
| 20 | **SuccessPage confetti burst** — `gsap.fromTo()` stagger on 50 divs, infinite repeat | `SuccessPage.jsx` | `/success` |
| 21 | **Download button fails** — `alert()` says "Server under maintenance. Visit office 3:00 AM." | `SuccessPage.jsx` | `/success` |

---

## 🎨 Visual Crimes

| Crime | Implementation |
|---|---|
| **Clashing color palette** | `#003087` (gov blue) + `#FF6600` (saffron) + `#800000` (maroon) + `#008080` (teal) — all on same page |
| **4 fonts clashing** | Impact (headings) + Times New Roman (body) + Comic Sans (errors) + Courier New (legal/code) |
| **6px legal disclaimer in Comic Sans** | Unreadable wall of disclaimers on every page |
| **GOVERNMENT OF INDIA watermark** | Repeating diagonal text, `opacity-5`, fixed behind all content |
| **Headings: UPPERCASE + tracking-widest** | All `<h1>` / `<h2>` in Impact |
| **Mobile intentionally broken** | Giant fonts, buttons near edge, overlapping elements on small screens |
| **Marquee ticker** | Red bar with yellow text, absurd government notices |
| **Bouncing CTA button** | `animate-bounce` on the main Apply button |
| **Session timer** | Red pulsing badge, top-right, fixed |

---

## 🗂️ Component Structure

```
src/
├── App.jsx                    — Routes + Watermark + global components
├── main.jsx                   — BrowserRouter setup
├── pages/
│   ├── Home.jsx               — Landing, sidebar ads, wrong nav
│   ├── ApplyForm.jsx          — Full form, all UX crimes
│   ├── CaptchaPage.jsx        — Reverse CAPTCHA
│   ├── ConfirmPage.jsx        — 4× modal + FakeLoader
│   └── SuccessPage.jsx        — Confetti burst
├── components/
│   ├── EscapeButton.jsx       — GSAP fleeing submit button
│   ├── FakeLoader.jsx         — GSAP 3× fake loading bar
│   ├── VirusPopup.jsx         — GSAP off-screen fly-in
│   ├── CookieBanner.jsx       — GSAP slide-up from bottom
│   ├── SessionTimer.jsx       — Resets at 3 forever
│   ├── ConfirmModal.jsx       — 4 chained modals
│   ├── MarqueeTicker.jsx      — GSAP infinite marquee
│   └── NestedDropdown.jsx     — Triple-nested location selector
└── hooks/
    └── usePageTransition.js   — GSAP fromTo on every page mount
```

---

## 🏃 Running Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

*"The best government website is one that makes you question your life choices."*
