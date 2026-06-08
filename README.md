#LaunchPilot AI

Turn any idea into a launch-ready TON startup.
LaunchPilot AI is an AI-powered venture studio built on the TON blockchain. Founders input a startup concept and receive a complete launch package in under 60 seconds — including validation scores, tokenomics, an investor-grade whitepaper, STON.fi liquidity strategy, and a full context handoff to Mira AI.

Features

Startup Validation — AI scoring across market opportunity, competitive landscape, revenue potential, and investor readiness
Tokenomics Generator — Token supply modeling, distribution architecture, vesting schedules, and treasury strategy
Whitepaper Generator — Investor-grade documentation with executive summary, problem statement, solution architecture, and roadmap
STON.fi Liquidity Planner — Intelligent allocation strategy powered by live STON.fi DEX pool data
Mira AI Handoff — Transfer your full startup context to Mira AI for continued co-founder guidance in Telegram
TON Wallet Integration — Native TON Connect authentication with on-chain context awareness


Tech Stack
TechnologyPurposeNext.js 14App frameworkTypeScriptType safetyTailwindCSSUtility stylingFramer MotionAnimations and transitionsHubot SansPrimary typeface

Getting Started
bash# 1. Clone the repository
git clone https://github.com/Baytriger/Launchpilot-ai.git
cd Launchpilot-ai

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start the development server
npm run dev
Open http://localhost:3000 in your browser.

Project Structure
src/
├── components/
│   ├── Navbar.tsx           # Navigation with wallet chip and dark mode
│   ├── LandingPage.tsx      # Hero, features, workflow, CTA
│   ├── ConnectWallet.tsx    # TON wallet connection screen
│   ├── Dashboard.tsx        # Dashboard orchestrator and state
│   ├── Sidebar.tsx          # Dashboard tab navigation
│   ├── DashPanels.tsx       # All dashboard tab panels
│   └── LoadingOverlay.tsx   # Animated generation overlay
├── lib/
│   ├── theme.tsx            # Dark/light mode context
│   └── types.ts             # Shared TypeScript types
├── pages/
│   ├── _app.tsx             # App wrapper with providers
│   ├── _document.tsx        # HTML shell and font preload
│   ├── index.tsx            # Root page and screen orchestration
│   └── api/
│       ├── generate.ts      # AI generation endpoint
│       └── pools.ts         # STON.fi live pool data endpoint
└── styles/
    └── globals.css          # CSS variables and base styles

Dashboard Modules
TabDescriptionStartup IdeaInput form — name, industry, description, target users, token symbolValidationAI scores with market, competition, revenue, and risk analysisTokenomicsToken overview, distribution chart, and vesting scheduleBrandingNames, taglines, positioning, and visual identity conceptsWhitepaperFour-section investor-grade whitepaperRoadmapMilestone grid across Month 1, 3, 6, and 12Liquidity PlannerSTON.fi allocation strategy and ecosystem metricsPool IntelligenceLive pool data with recommended pool for token launchLaunch ScoreReadiness score with sub-score breakdownMira AIFull context handoff to Mira AI on Telegram

Design

Font: Hubot Sans (200–900 weight)
Primary: #0098EA — TON blue
Accent: #7C3AED — violet
Theming: Full dark/light mode via CSS variables and a .dark class on <html>


Built With

TON Connect — Wallet authentication
STON.fi DEX API — Live pool data and liquidity intelligence
Mira AI — Telegram-based AI co-founder
Anthropic Claude — All AI generation
