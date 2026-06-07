# LaunchPilot AI

**Turn Any Idea Into a Launch-Ready TON Startup**

An AI-powered venture studio that helps founders transform startup ideas into launch-ready TON projects — complete with startup validation, tokenomics, whitepapers, STON.fi liquidity planning, and Mira AI co-founder handoff.

---

## Tech Stack

- **Next.js 15** — App framework
- **TypeScript** — Type safety throughout
- **TailwindCSS** — Utility styling + design tokens
- **Framer Motion** — Animations and transitions
- **TanStack React Query** — Server state management
- **Hubot Sans** — Primary typeface (GitHub's humanoid font)

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Sticky nav with logo, dark mode, wallet chip
│   ├── LandingPage.tsx     # Hero, features, how it works, CTA
│   ├── ConnectWallet.tsx   # TON wallet connection screen
│   ├── Dashboard.tsx       # Main dashboard orchestrator
│   ├── Sidebar.tsx         # Dashboard navigation sidebar
│   ├── DashPanels.tsx      # All dashboard tab panels
│   └── LoadingOverlay.tsx  # Animated loading overlay
├── lib/
│   ├── theme.tsx           # Dark/light mode context
│   └── types.ts            # Shared TypeScript types
├── pages/
│   ├── _app.tsx            # App wrapper with providers
│   ├── _document.tsx       # HTML shell + font preload
│   └── index.tsx           # Root page, screen orchestration
└── styles/
    └── globals.css         # CSS variables, Hubot Sans import, base styles
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## Dashboard Modules

| Tab | Description |
|-----|-------------|
| Startup Idea | Input form — name, industry, description, users, token |
| Validation | AI scores + market, competition, revenue, risk analysis |
| Tokenomics | Token overview, donut chart distribution, vesting schedule |
| Branding | Names, taglines, positioning, visual identity concepts |
| Whitepaper | 4-section investor-grade whitepaper with PDF export |
| Roadmap | 4-column milestone grid (Month 1/3/6/12) |
| Liquidity Planner | STON.fi allocation strategy + ecosystem metrics |
| Pool Intelligence | Live-style pool table + recommended pool for token launch |
| Launch Score | 83/100 readiness score with 4 sub-score bars |
| Mira AI | Context handoff → deep link to Mira on Telegram |

---

## Design System

- **Font**: Hubot Sans (GitHub's humanoid sans-serif, 200–900 weight)
- **Primary**: `#0098EA` (TON blue)
- **Accent**: `#7C3AED` (violet)
- **Dark mode**: Full CSS variable swap via `.dark` class on `<html>`
- **No emojis** — professional iconography only
- **No fake social proof** — all content is functional, not decorative

---

## Notes

- Place your logo at `public/logo.png`
- TON Connect wallet integration is stubbed — replace `handleConnect` in `pages/index.tsx` with real `@tonconnect/ui-react` implementation
- STON.fi API calls can be wired into the liquidity and pools panels using `@ston-fi/sdk`
- Mira deep link uses `t.me/mira_ton_bot?start=<encoded_context>` — update the bot username as needed
