"use client";

import { StartupInput, DashTab } from "@/lib/types";

/* ─── Shared primitives ─────────────────────────────────── */

function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "1px",
        color: "var(--sub)",
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontSize: 13,
            color: "var(--sub)",
            display: "flex",
            alignItems: "flex-start",
            gap: 7,
            lineHeight: 1.55,
          }}
        >
          <span
            style={{
              color: "var(--primary)",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            —
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div
      style={{
        height: 3,
        borderRadius: 2,
        background: "var(--bg-3)",
        marginTop: 10,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          borderRadius: 2,
          background: color,
          transition: "width 0.8s ease",
        }}
      />
    </div>
  );
}

function NextBtn({
  label,
  onClick,
  accent,
}: {
  label: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
      <button
        onClick={onClick}
        style={{
          padding: "9px 18px",
          borderRadius: 9,
          border: "none",
          background: accent ? "var(--accent)" : "var(--primary)",
          color: "#fff",
          cursor: "pointer",
          fontFamily: "var(--font-hubot)",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {label}
      </button>
    </div>
  );
}

/* ─── IDEA TAB ──────────────────────────────────────────── */

interface IdeaTabProps {
  startup: StartupInput;
  onChange: (s: StartupInput) => void;
  onGenerate: () => void;
}

export function IdeaTab({ startup, onChange, onGenerate }: IdeaTabProps) {
  const field = (key: keyof StartupInput, value: string) =>
    onChange({ ...startup, [key]: value });

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>
          Startup Idea
        </h2>
        <p style={{ fontSize: 13, color: "var(--sub)" }}>
          Describe your startup. AI will analyze every dimension of your concept.
        </p>
      </div>

      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
              Startup Name
            </label>
            <input
              value={startup.name}
              onChange={(e) => field("name", e.target.value)}
              placeholder="e.g. TonVault Protocol"
              style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border-2)", background: "var(--bg-2)", fontFamily: "var(--font-hubot)", fontSize: 13, color: "var(--text)", outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
              Industry
            </label>
            <select
              value={startup.industry}
              onChange={(e) => field("industry", e.target.value)}
              style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border-2)", background: "var(--bg-2)", fontFamily: "var(--font-hubot)", fontSize: 13, color: "var(--text)", outline: "none" }}
            >
              <option>DeFi &amp; Finance</option>
              <option>NFT &amp; Gaming</option>
              <option>Infrastructure</option>
              <option>Social &amp; Community</option>
              <option>E-Commerce</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Description
          </label>
          <textarea
            value={startup.description}
            onChange={(e) => field("description", e.target.value)}
            rows={4}
            style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border-2)", background: "var(--bg-2)", fontFamily: "var(--font-hubot)", fontSize: 13, color: "var(--text)", outline: "none", resize: "vertical" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
              Target Users
            </label>
            <input
              value={startup.targetUsers}
              onChange={(e) => field("targetUsers", e.target.value)}
              placeholder="e.g. DeFi investors"
              style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border-2)", background: "var(--bg-2)", fontFamily: "var(--font-hubot)", fontSize: 13, color: "var(--text)", outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
              Token Symbol
            </label>
            <input
              value={startup.tokenSymbol}
              onChange={(e) => field("tokenSymbol", e.target.value)}
              placeholder="e.g. NEXA"
              style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border-2)", background: "var(--bg-2)", fontFamily: "var(--font-hubot)", fontSize: 13, color: "var(--text)", outline: "none" }}
            />
          </div>
        </div>

        <button
          onClick={onGenerate}
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "var(--primary)", color: "#fff", fontFamily: "var(--font-hubot)", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "-0.2px" }}
        >
          Generate Full Launch Plan
        </button>
      </Card>
    </div>
  );
}

/* ─── VALIDATION TAB ────────────────────────────────────── */

export function ValidationTab({ onNext }: { onNext: () => void }) {
  const scores = [
    { val: 87, label: "Overall Score", color: "var(--primary)" },
    { val: 91, label: "Market Opportunity", color: "#22C55E" },
    { val: 79, label: "Investor Readiness", color: "var(--accent)" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>Startup Validation</h2>
        <p style={{ fontSize: 13, color: "var(--sub)" }}>AI-powered analysis across market, competition, revenue, and risk dimensions.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
        {scores.map((s) => (
          <Card key={s.label}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1.5px", color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 700 }}>{s.label}</div>
            <ScoreBar value={s.val} color={s.color} />
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Card>
          <SectionLabel>Market Opportunity</SectionLabel>
          <BulletList items={[
            "TON DeFi TVL growing 340% year-over-year — optimal entry window for yield optimization infrastructure",
            "$2.8B addressable market across active TON Jetton holders seeking passive yield generation",
            "STON.fi processes over $180M in daily volume, providing significant liquidity depth for integrations",
            "Fewer than three direct protocol competitors operating on TON mainnet currently",
          ]} />
        </Card>
        <Card>
          <SectionLabel>Competition Analysis</SectionLabel>
          <BulletList items={[
            "No dominant automated yield optimizer exists within the TON ecosystem at this stage",
            "EVM-native protocols such as Yearn Finance are structurally inaccessible to TON users",
            "First-mover advantage window estimated at six to nine months before market intensifies",
            "AI-driven rebalancing creates a defensible moat against simpler manual pool selectors",
          ]} />
        </Card>
        <Card>
          <SectionLabel>Revenue Pathways</SectionLabel>
          <BulletList items={[
            "0.15% performance fee applied to all optimized yield generated through the protocol",
            "Premium subscription offering advanced AI strategy access at $49 per month",
            "B2B API licensing to TON-native wallets and Telegram Mini App developers",
            "Protocol-owned liquidity positions generating baseline fee revenue independently",
          ]} />
        </Card>
        <Card>
          <SectionLabel>Risk Assessment</SectionLabel>
          <BulletList items={[
            "Smart contract exposure: mitigate with pre-launch independent security audit",
            "Regulatory frameworks for DeFi yield products remain unsettled in key jurisdictions",
            "User education overhead: yield optimization requires clear onboarding design",
            "STON.fi API dependency carries low risk given its proven infrastructure track record",
          ]} />
        </Card>
      </div>

      <Card style={{ marginTop: 10 }}>
        <SectionLabel>Anticipated Investor Questions</SectionLabel>
        <BulletList items={[
          "What prevents a fork? Protocol-owned liquidity combined with a proprietary AI model creates compounding defensibility over time",
          "How do you handle black swan market events? Multi-strategy allocation with an automatic risk-off circuit breaker",
          "12-month user acquisition target? 10,000 active depositors with $50M TVL by end of Month 12",
        ]} />
      </Card>

      <NextBtn label="Next: Tokenomics" onClick={onNext} />
    </div>
  );
}

/* ─── TOKENOMICS TAB ────────────────────────────────────── */

export function TokenomicsTab({ onNext }: { onNext: () => void }) {
  const distribution = [
    { label: "Community & Ecosystem", pct: 40, amount: "40M", color: "#0098EA" },
    { label: "Team & Advisors", pct: 24, amount: "24M", color: "#7C3AED" },
    { label: "Treasury", pct: 20, amount: "20M", color: "#22C55E" },
    { label: "Public Sale", pct: 16, amount: "16M", color: "#F59E0B" },
  ];

  // Build SVG donut
  const r = 46;
  const cx = 60;
  const cy = 60;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const arcs = distribution.map((d) => {
    const dash = (d.pct / 100) * circ;
    const arc = { ...d, dash, offset };
    offset += dash;
    return arc;
  });

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>Tokenomics</h2>
        <p style={{ fontSize: 13, color: "var(--sub)" }}>AI-designed token economics for sustainable protocol growth.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <Card>
          <SectionLabel>Token Overview</SectionLabel>
          {[
            ["Token Name", "NEXA"],
            ["Total Supply", "100,000,000"],
            ["Launch Price", "$0.042"],
            ["Initial Market Cap", "$1.26M"],
            ["Fully Diluted Valuation", "$4.2M"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
              <span style={{ color: "var(--sub)" }}>{k}</span>
              <strong style={{ color: "var(--text)" }}>{v}</strong>
            </div>
          ))}
        </Card>
        <Card>
          <SectionLabel>Token Utility</SectionLabel>
          <BulletList items={[
            "Governance: vote on supported pools and protocol risk parameters",
            "Fee reduction: 50% discount on performance fees for staked NEXA holders",
            "Yield boost: stakers receive a 1.5x multiplier on protocol yield earned",
            "Revenue sharing: 40% of all protocol fees distributed to active stakers",
            "Access: advanced AI strategies gated by top-tier holding thresholds",
          ]} />
        </Card>
      </div>

      <Card style={{ marginBottom: 10 }}>
        <SectionLabel>Distribution Architecture</SectionLabel>
        <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg-3)" strokeWidth={16} />
            {arcs.map((a) => (
              <circle
                key={a.label}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={a.color}
                strokeWidth={16}
                strokeDasharray={`${a.dash} ${circ - a.dash}`}
                strokeDashoffset={-a.offset}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            ))}
            <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-hubot)" fontWeight={800} fontSize={14} fill="var(--text)">100M</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize={10} fontWeight={600} fill="var(--muted)">NEXA</text>
          </svg>
          <div style={{ flex: 1 }}>
            {distribution.map((d) => (
              <div key={d.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                  {d.label}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{d.pct}%</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{d.amount} NEXA</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <SectionLabel>Vesting Schedule</SectionLabel>
        <BulletList items={[
          "Team & Advisors: 12-month cliff followed by 24-month linear vesting",
          "Public Sale: 6-month cliff followed by 12-month linear release schedule",
          "Community Ecosystem: No cliff; 36-month linear emissions",
          "Treasury: DAO-governed with a 7-day timelock enforced on all releases",
        ]} />
      </Card>

      <NextBtn label="Next: Liquidity Planning" onClick={onNext} />
    </div>
  );
}

/* ─── BRANDING TAB ──────────────────────────────────────── */

export function BrandingTab() {
  const sections = [
    {
      title: "Alternative Names",
      items: ["NexaFi — Futuristic, concise, memorable", "YieldTON — Direct utility signal to market", "Autonoma — AI-first positioning strategy", "Nexus Yield — Premium enterprise positioning"],
    },
    {
      title: "Taglines",
      items: ["Your yield, optimized.", "AI-powered returns on TON.", "Put your TON to work.", "Smarter liquidity, automatically."],
    },
    {
      title: "Brand Positioning",
      items: ["Category: Intelligent DeFi Infrastructure", "Tone: Sophisticated, trusted, forward-thinking", "Audience: Crypto-native yield seekers on TON", "Differentiator: AI-driven rebalancing engine"],
    },
    {
      title: "Visual Identity Concepts",
      items: [
        "Minimalist interconnected nodes forming the letter N — electric blue (#0098EA) on white, geometric precision",
        "Abstract yield curve transitioning into an upward vector — gradient from blue to violet",
      ],
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>Branding</h2>
        <p style={{ fontSize: 13, color: "var(--sub)" }}>AI-crafted identity to position your startup for maximum market impact.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {sections.map((s) => (
          <Card key={s.title}>
            <SectionLabel>{s.title}</SectionLabel>
            {s.items.map((item, i) => (
              <div key={i} style={{ fontSize: 13, padding: "8px 0", borderBottom: i < s.items.length - 1 ? "1px solid var(--border)" : "none", color: "var(--text)", lineHeight: 1.5 }}>
                {item}
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── WHITEPAPER TAB ────────────────────────────────────── */

export function WhitepaperTab({ onNext }: { onNext: () => void }) {
  const sections = [
    {
      title: "Executive Summary",
      body: "NexaFi is an AI-powered yield optimization protocol built natively on The Open Network (TON). By automatically allocating user liquidity across STON.fi pools, Jetton farms, and TON-native yield opportunities, NexaFi delivers 2.3–4.1x better risk-adjusted returns than manual strategies. The NEXA governance token powers protocol governance, fee distribution, and tiered access to premium AI strategies. NexaFi targets the $2.8B addressable market of TON-native asset holders seeking passive income without active management overhead.",
    },
    {
      title: "Problem Statement",
      body: "TON's DeFi ecosystem is expanding rapidly, with STON.fi processing over $180M in daily volume across dozens of active liquidity pools. Despite this growth, retail participants face three structural challenges: limited visibility into optimal yield opportunities, high cognitive load from manual pool rebalancing, and significant gas and slippage costs from frequent position migrations. The result is that the majority of TON holders leave substantial liquidity idle, earning zero yield on appreciating digital assets.",
    },
    {
      title: "Solution Architecture",
      body: "NexaFi's AI rebalancing engine continuously monitors STON.fi pools and TON-native farms using a proprietary yield-risk scoring model. When the algorithm identifies a superior yield opportunity with a net-positive expected value after accounting for gas costs and slippage, it automatically migrates user liquidity in a single atomic on-chain transaction. Smart contract architecture uses upgradeable proxy patterns with DAO-controlled administrative keys and a 48-hour timelock enforced on all critical parameter modifications.",
    },
    {
      title: "Roadmap Overview",
      body: "Q1 2025: Smart contract audit completion, STON.fi SDK integration, 100-user private beta. Q2 2025: Public mainnet launch with three core AI strategies, NEXA token generation event and STON.fi pool listing. Q3 2025: Expansion to ten strategies, cross-protocol yield support, governance DAO activation. Q4 2025: $50M TVL milestone, B2B API launch, Telegram Mini App release. 2026: Multi-chain expansion roadmap, institutional partnership program, $200M TVL target.",
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>Whitepaper</h2>
        <p style={{ fontSize: 13, color: "var(--sub)" }}>Investor-grade documentation ready for distribution.</p>
      </div>

      {sections.map((s) => (
        <Card key={s.title} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--primary)", marginBottom: 9 }}>{s.title}</div>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--sub)" }}>{s.body}</p>
        </Card>
      ))}

      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <button
          onClick={() => alert("PDF export — production-ready feature.")}
          style={{ flex: 1, padding: "10px", borderRadius: 9, border: "none", background: "var(--primary)", color: "#fff", fontFamily: "var(--font-hubot)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          Export as PDF
        </button>
        <button
          onClick={onNext}
          style={{ padding: "10px 18px", borderRadius: 9, border: "1px solid var(--border-2)", background: "transparent", fontFamily: "var(--font-hubot)", fontSize: 13, fontWeight: 500, color: "var(--sub)", cursor: "pointer" }}
        >
          View Roadmap
        </button>
      </div>
    </div>
  );
}

/* ─── ROADMAP TAB ───────────────────────────────────────── */

export function RoadmapTab() {
  const months = [
    {
      label: "Month 1",
      color: "var(--primary)",
      items: ["Deploy testnet smart contracts", "STON.fi SDK integration complete", "Recruit 3 core engineers", "Legal entity formation", "Security audit engagement begins"],
    },
    {
      label: "Month 3",
      color: "var(--accent)",
      items: ["Audit complete — zero critical findings", "Mainnet v1 deployed on TON", "NEXA token generation event", "STON.fi pool listing secured", "500 beta users onboarded"],
    },
    {
      label: "Month 6",
      color: "#22C55E",
      items: ["$5M TVL milestone achieved", "Governance DAO goes live", "5,000 active depositors", "Telegram Mini App beta", "Seed round close — $1.5M"],
    },
    {
      label: "Month 12",
      color: "#F59E0B",
      items: ["$50M TVL target achieved", "10,000+ active users", "B2B API — 3 integrations live", "Series A process initiated", "Multi-chain roadmap published"],
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>Launch Roadmap</h2>
        <p style={{ fontSize: 13, color: "var(--sub)" }}>12-month execution plan with measurable milestones.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {months.map((m) => (
          <Card key={m.label} style={{ borderTop: `2px solid ${m.color}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--primary)", marginBottom: 12 }}>{m.label}</div>
            {m.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 5, fontSize: 12, color: "var(--sub)", lineHeight: 1.5 }}>
                <div style={{ width: 13, height: 13, borderRadius: 3, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                  <svg viewBox="0 0 13 13" width={9} height={9} fill="none">
                    <path d="M2 6.5l3 3 6-6" stroke="#22C55E" strokeWidth={1.5} strokeLinecap="round" />
                  </svg>
                </div>
                {item}
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── LIQUIDITY TAB ─────────────────────────────────────── */

export function LiquidityTab({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>STON.fi Liquidity Planner</h2>
        <p style={{ fontSize: 13, color: "var(--sub)" }}>AI-powered strategy using STON.fi DEX intelligence.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <Card>
          <SectionLabel>Allocation Plan</SectionLabel>
          {[
            { label: "NEXA / TON Pool (STON.fi)", pct: "45%", usd: "$94,500" },
            { label: "NEXA / USDT Pool (STON.fi)", pct: "30%", usd: "$63,000" },
            { label: "Protocol-Owned Liquidity", pct: "15%", usd: "$31,500" },
            { label: "Emergency Reserve", pct: "10%", usd: "$21,000" },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
              <span style={{ color: "var(--sub)" }}>{row.label}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>{row.pct}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{row.usd}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <SectionLabel>Launch Strategy</SectionLabel>
          <BulletList items={[
            "Deploy NEXA/TON pool first — highest depth and volume in the TON ecosystem",
            "Target $150K initial liquidity to minimize price impact on early swaps",
            "Use STON.fi concentrated liquidity for tighter spreads at launch",
            "Set initial fee tier at 0.3% to align with STON.fi standard pool pricing",
            "Activate STON.fi farming incentives from Month 2 to bootstrap TVL growth",
            "Protocol-owned liquidity removes rug risk perception and signals long-term alignment",
          ]} />
        </Card>
      </div>

      <Card>
        <SectionLabel>STON.fi Ecosystem Metrics</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, marginTop: 9 }}>
          {[
            { val: "$180M+", label: "Daily Volume", color: "var(--primary)" },
            { val: "340%", label: "TON DeFi YoY", color: "#22C55E" },
            { val: "2.1%", label: "Avg Pool APY", color: "var(--accent)" },
          ].map((m) => (
            <div key={m.label} style={{ background: "var(--bg-2)", borderRadius: 9, padding: 13, textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.6px", color: m.color }}>{m.val}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 700 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <NextBtn label="View Pool Intelligence" onClick={onNext} />
    </div>
  );
}

/* ─── POOLS TAB ─────────────────────────────────────────── */

export function PoolsTab({ onNext }: { onNext: () => void }) {
  const pools = [
    { pair: "TON / USDT", tvl: "$42.8M", vol: "$12.4M", fee: "0.3%", apy: "3.82%" },
    { pair: "TON / NOT", tvl: "$28.1M", vol: "$8.7M", fee: "0.3%", apy: "5.14%" },
    { pair: "TON / STON", tvl: "$19.3M", vol: "$5.2M", fee: "0.3%", apy: "4.67%" },
    { pair: "USDT / jUSDC", tvl: "$14.7M", vol: "$3.9M", fee: "0.05%", apy: "2.31%" },
    { pair: "TON / MEGA", tvl: "$9.8M", vol: "$2.1M", fee: "0.3%", apy: "7.43%" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>Pool Intelligence</h2>
        <p style={{ fontSize: 13, color: "var(--sub)" }}>STON.fi pool data and ecosystem insights for strategic positioning.</p>
      </div>

      <Card style={{ marginBottom: 10 }}>
        <SectionLabel>Top Pools by TVL</SectionLabel>
        <div style={{ marginTop: 9 }}>
          {pools.map((p) => (
            <div
              key={p.pair}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 15px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, marginBottom: 7, transition: "border-color 0.2s" }}
              onMouseOver={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,152,234,0.25)")}
              onMouseOut={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.2px", color: "var(--text)" }}>{p.pair}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>TVL: {p.tvl} · Vol: {p.vol} / 24h · Fee: {p.fee}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#22C55E" }}>{p.apy} APY</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Card>
          <SectionLabel>Recommended Pool — NEXA Launch</SectionLabel>
          <div style={{ background: "rgba(0,152,234,0.06)", borderRadius: 9, padding: 13, marginTop: 7, border: "1px solid rgba(0,152,234,0.14)" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3, color: "var(--text)" }}>NEXA / TON</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>Standard Pool · 0.3% Fee Tier</div>
            {[
              ["Recommended Liquidity", "$94,500"],
              ["Projected LP APY", "4.2–6.8%"],
              ["Price Impact at $10K Swap", "~0.8%"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
                <span style={{ color: "var(--sub)" }}>{k}</span>
                <span style={{ fontWeight: 700, color: k === "Projected LP APY" ? "#22C55E" : "var(--text)" }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionLabel>Ecosystem Insights</SectionLabel>
          <BulletList items={[
            "Yield optimization demand on TON up 89% over the trailing 90 days",
            "Average pool APY declining as TVL grows — confirms need for intelligent allocation",
            "STON.fi Omniston SDK enables best-execution swap routing for NEXA liquidity pairs",
            "Farming program support available via the STON.fi business development team",
          ]} />
        </Card>
      </div>

      <NextBtn label="View Launch Score" onClick={onNext} />
    </div>
  );
}

/* ─── READINESS TAB ─────────────────────────────────────── */

export function ReadinessTab({ onNext }: { onNext: () => void }) {
  const bars = [
    { label: "Business Score", val: 87, color: "var(--primary)", note: "Strong market thesis, clear revenue model, and defined competitive differentiation." },
    { label: "Tokenomics Score", val: 81, color: "var(--accent)", note: "Well-structured distribution. Improve utility narrative for broader retail accessibility." },
    { label: "Liquidity Score", val: 89, color: "#22C55E", note: "Strong STON.fi integration plan. $150K initial liquidity target is appropriate for launch scale." },
    { label: "Community Score", val: 74, color: "#F59E0B", note: "Requires 2–3 months of pre-launch community development for optimal launch outcomes." },
  ];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>Launch Readiness Score</h2>
        <p style={{ fontSize: 13, color: "var(--sub)" }}>Comprehensive readiness assessment across all launch dimensions.</p>
      </div>

      <div style={{ textAlign: "center", padding: 32, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: "-4px", color: "var(--primary)", lineHeight: 1 }}>83</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 5, textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 700 }}>out of 100</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginTop: 7, letterSpacing: "-0.4px", color: "var(--text)" }}>Launch Ready</div>
        <div style={{ fontSize: 13, color: "var(--sub)", marginTop: 7, maxWidth: 380, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
          NexaFi is well-positioned for a successful TON launch. Prioritize community development and tokenomics communication prior to the public launch date.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {bars.map((b) => (
          <Card key={b.label}>
            <div style={{ fontSize: 12, fontWeight: 600, display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={{ color: "var(--text)" }}>{b.label}</span>
              <span style={{ color: b.color }}>{b.val} / 100</span>
            </div>
            <div style={{ height: 5, borderRadius: 3, background: "var(--bg-3)", overflow: "hidden" }}>
              <div style={{ width: `${b.val}%`, height: "100%", borderRadius: 3, background: b.color }} />
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 5, lineHeight: 1.5 }}>{b.note}</div>
          </Card>
        ))}
      </div>

      <NextBtn label="Continue With Mira AI Co-Founder" onClick={onNext} accent />
    </div>
  );
}

/* ─── MIRA TAB ──────────────────────────────────────────── */

export function MiraTab() {
  const handleOpen = () => {
    const ctx = encodeURIComponent(
      JSON.stringify({
        startup: "NexaFi",
        score: 87,
        readiness: 83,
        token: "NEXA",
        supply: "100M",
        pool: "NEXA/TON on STON.fi",
        priority: "community building",
      })
    );
    window.open(`https://t.me/mira_ton_bot?start=${ctx}`, "_blank");
  };

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>Mira AI Co-Founder</h2>
        <p style={{ fontSize: 13, color: "var(--sub)" }}>Transfer your startup context and continue building with your AI co-founder.</p>
      </div>

      <div style={{ background: "linear-gradient(160deg, #060A12, #0D1220 60%, #100B1F)", borderRadius: 16, padding: "44px 32px", textAlign: "center" }}>
        {/* Orb */}
        <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 22px", background: "linear-gradient(135deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <style>{`
            @keyframes mira-pulse { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.1);opacity:1} }
            .mira-orb-inner { width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.15);animation:mira-pulse 2.5s ease-in-out infinite; }
          `}</style>
          <div className="mira-orb-inner" />
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.7px", marginBottom: 10, color: "#fff" }}>
          Meet Mira, Your AI Co-Founder
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.65, marginBottom: 24, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          Mira has absorbed the complete NexaFi startup profile — validation scores, tokenomics architecture, liquidity strategy, and launch roadmap. She is ready to co-found this startup with you inside Telegram, available around the clock.
        </p>

        {/* Context block */}
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 16, marginBottom: 22, textAlign: "left", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
            Startup Context Being Transferred
          </div>
          {[
            ["Startup Name", "NexaFi"],
            ["Validation Score", "87 / 100 — Strong"],
            ["Launch Readiness", "83 / 100 — Launch Ready"],
            ["Token", "NEXA · 100M total supply"],
            ["Primary Pool", "NEXA / TON on STON.fi · $94.5K"],
            ["Priority Action", "Community building (score: 74)"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 13 }}>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{k}</span>
              <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{v}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleOpen}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", maxWidth: 480, margin: "0 auto", padding: 14, borderRadius: 11, border: "none", background: "#229ED9", color: "#fff", fontFamily: "var(--font-hubot)", fontSize: 15, fontWeight: 700, cursor: "pointer" }}
        >
          Continue Building with Mira on Telegram
        </button>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>
          Your full startup context will be passed to Mira for continued co-founder collaboration in Telegram.
        </p>
      </div>
    </div>
  );
}
