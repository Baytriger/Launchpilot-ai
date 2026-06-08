"use client";

import { useState, useEffect } from "react";
import { GeneratedData, StartupInput, Pool } from "@/lib/types";

/* ── Responsive styles ───────────────────────────────────────── */
if (typeof document !== "undefined") {
  const id = "__dash-responsive";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      .dash-panel { max-width: 100%; }
      @media (max-width: 480px) {
        .dash-panel h2 { font-size: 18px !important; }
        .dash-panel .panel-sub { font-size: 12px !important; }
      }
    `;
    document.head.appendChild(s);
  }
}

/* ── Shared primitives ───────────────────────────────────────── */

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--sub)", marginBottom: 10 }}>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
      {items?.map((item, i) => (
        <li key={i} style={{ fontSize: 13, color: "var(--sub)", display: "flex", alignItems: "flex-start", gap: 7, lineHeight: 1.55 }}>
          <span style={{ color: "var(--primary)", fontWeight: 700, flexShrink: 0 }}>—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function NextBtn({ label, onClick, accent }: { label: string; onClick: () => void; accent?: boolean }) {
  return (
    <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
      <button onClick={onClick} style={{ padding: "9px 18px", borderRadius: 9, border: "none", background: accent ? "var(--accent)" : "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: "var(--font-hubot)", fontSize: 13, fontWeight: 600 }}>
        {label}
      </button>
    </div>
  );
}

function PanelHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--text)" }}>{title}</h2>
      <p style={{ fontSize: 13, color: "var(--sub)" }}>{sub}</p>
    </div>
  );
}

/* ── IDEA TAB ────────────────────────────────────────────────── */

const INDUSTRIES = ["DeFi & Finance", "NFT & Gaming", "Infrastructure", "Social & Community", "E-Commerce", "Identity & Privacy", "AI & Data", "Gaming", "Custom"];

export function IdeaTab({ startup, onChange, onGenerate }: {
  startup: StartupInput; onChange: (s: StartupInput) => void; onGenerate: () => void;
}) {
  const field = (key: keyof StartupInput, value: string) => onChange({ ...startup, [key]: value });
  const isCustom = startup.industry === "Custom";
  const canGenerate = startup.name && startup.description && startup.targetUsers && startup.tokenSymbol && (!isCustom || startup.customIndustry);

  const inputStyle: React.CSSProperties = {
    padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border-2)",
    background: "var(--bg-2)", fontFamily: "var(--font-hubot)", fontSize: 13,
    color: "var(--text)", outline: "none", width: "100%",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 700, color: "var(--muted)",
    textTransform: "uppercase", letterSpacing: "0.8px",
  };

  return (
    <div>
      <PanelHead title="Startup Idea" sub="Describe your startup. AI will analyze every dimension of your concept." />
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Startup Name</label>
            <input value={startup.name} onChange={(e) => field("name", e.target.value)} placeholder="e.g. TonVault Protocol" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Industry</label>
            <select value={startup.industry} onChange={(e) => field("industry", e.target.value)} style={inputStyle}>
              {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
            </select>
          </div>
        </div>

        {isCustom && (
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
            <label style={labelStyle}>Specify Industry</label>
            <input value={startup.customIndustry ?? ""} onChange={(e) => field("customIndustry", e.target.value)} placeholder="e.g. Real Estate Tokenization" style={inputStyle} />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
          <label style={labelStyle}>Description</label>
          <textarea
            value={startup.description}
            onChange={(e) => field("description", e.target.value)}
            rows={4}
            placeholder="Describe what your startup does, the problem it solves, and why TON is the right blockchain for it..."
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Target Users</label>
            <input value={startup.targetUsers} onChange={(e) => field("targetUsers", e.target.value)} placeholder="e.g. TON holders, DeFi investors" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Token Symbol</label>
            <input value={startup.tokenSymbol} onChange={(e) => field("tokenSymbol", e.target.value)} placeholder="e.g. NEXA" style={{ ...inputStyle, textTransform: "uppercase" }} />
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={!canGenerate}
          style={{
            width: "100%", padding: 12, borderRadius: 10, border: "none",
            background: canGenerate ? "var(--primary)" : "var(--bg-3)",
            color: canGenerate ? "#fff" : "var(--muted)",
            fontFamily: "var(--font-hubot)", fontSize: 14, fontWeight: 700,
            cursor: canGenerate ? "pointer" : "not-allowed", letterSpacing: "-0.2px",
            transition: "all 0.2s",
          }}
        >
          {canGenerate ? "Generate Full Launch Plan" : "Fill in all fields to generate"}
        </button>
      </Card>
    </div>
  );
}

/* ── VALIDATION TAB ──────────────────────────────────────────── */

export function ValidationTab({ data, onNext }: { data: GeneratedData["validation"]; onNext: () => void }) {
  const scores = [
    { val: data.overallScore, label: "Overall Score", color: "var(--primary)" },
    { val: data.marketScore, label: "Market Opportunity", color: "#22C55E" },
    { val: data.investorScore, label: "Investor Readiness", color: "var(--accent)" },
  ];

  return (
    <div>
      <PanelHead title="Startup Validation" sub="AI-powered analysis across market, competition, revenue, and risk dimensions." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 14 }}>
        {scores.map((s) => (
          <Card key={s.label}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1.5px", color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 700 }}>{s.label}</div>
            <div style={{ height: 3, borderRadius: 2, background: "var(--bg-3)", marginTop: 10, overflow: "hidden" }}>
              <div style={{ width: `${s.val}%`, height: "100%", borderRadius: 2, background: s.color }} />
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
        <Card><SectionLabel>Market Opportunity</SectionLabel><BulletList items={data.marketOpportunity} /></Card>
        <Card><SectionLabel>Competition Analysis</SectionLabel><BulletList items={data.competition} /></Card>
        <Card><SectionLabel>Revenue Pathways</SectionLabel><BulletList items={data.revenue} /></Card>
        <Card><SectionLabel>Risk Assessment</SectionLabel><BulletList items={data.risks} /></Card>
      </div>
      <Card style={{ marginTop: 10 }}>
        <SectionLabel>Anticipated Investor Questions</SectionLabel>
        <BulletList items={data.investorQuestions} />
      </Card>
      <NextBtn label="Next: Tokenomics" onClick={onNext} />
    </div>
  );
}

/* ── TOKENOMICS TAB ──────────────────────────────────────────── */

export function TokenomicsTab({ data, tokenSymbol, onNext }: { data: GeneratedData["tokenomics"]; tokenSymbol: string; onNext: () => void }) {
  const r = 46, cx = 60, cy = 60;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const arcs = data.distribution.map((d) => {
    const dash = (d.pct / 100) * circ;
    const arc = { ...d, dash, offset };
    offset += dash;
    return arc;
  });

  return (
    <div>
      <PanelHead title="Tokenomics" sub="AI-designed token economics based on your startup concept." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, marginBottom: 10 }}>
        <Card>
          <SectionLabel>Token Overview</SectionLabel>
          {[
            ["Token Symbol", tokenSymbol.toUpperCase()],
            ["Total Supply", Number(data.totalSupply).toLocaleString()],
            ["Launch Price", `$${data.launchPrice}`],
            ["Initial Market Cap", data.initialMc],
            ["Fully Diluted Valuation", data.fdv],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
              <span style={{ color: "var(--sub)" }}>{k}</span>
              <strong style={{ color: "var(--text)" }}>{v}</strong>
            </div>
          ))}
        </Card>
        <Card><SectionLabel>Token Utility</SectionLabel><BulletList items={data.utility} /></Card>
      </div>
      <Card style={{ marginBottom: 10 }}>
        <SectionLabel>Distribution Architecture</SectionLabel>
        <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg-3)" strokeWidth={16} />
            {arcs.map((a) => (
              <circle key={a.label} cx={cx} cy={cy} r={r} fill="none" stroke={a.color} strokeWidth={16}
                strokeDasharray={`${a.dash} ${circ - a.dash}`} strokeDashoffset={-a.offset}
                transform={`rotate(-90 ${cx} ${cy})`} />
            ))}
            <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-hubot)" fontWeight={800} fontSize={13} fill="var(--text)">
              {(data.totalSupply / 1_000_000).toFixed(0)}M
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize={10} fontWeight={600} fill="var(--muted)">{tokenSymbol.toUpperCase()}</text>
          </svg>
          <div style={{ flex: 1 }}>
            {data.distribution.map((d) => (
              <div key={d.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                  {d.label}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{d.pct}%</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{((d.pct / 100) * data.totalSupply / 1_000_000).toFixed(1)}M {tokenSymbol.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card><SectionLabel>Vesting Schedule</SectionLabel><BulletList items={data.vesting} /></Card>
      <NextBtn label="Next: Liquidity Planning" onClick={onNext} />
    </div>
  );
}

/* ── BRANDING TAB ────────────────────────────────────────────── */

export function BrandingTab({ data }: { data: GeneratedData["branding"] }) {
  const sections = [
    { title: "Alternative Names", items: data.names },
    { title: "Taglines", items: data.taglines },
    { title: "Brand Positioning", items: data.positioning },
    { title: "Visual Identity Concepts", items: data.visualConcepts },
  ];
  return (
    <div>
      <PanelHead title="Branding" sub="AI-crafted identity to position your startup for maximum market impact." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
        {sections.map((s) => (
          <Card key={s.title}>
            <SectionLabel>{s.title}</SectionLabel>
            {s.items?.map((item, i) => (
              <div key={i} style={{ fontSize: 13, padding: "8px 0", borderBottom: i < s.items.length - 1 ? "1px solid var(--border)" : "none", color: "var(--text)", lineHeight: 1.5 }}>{item}</div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ── WHITEPAPER TAB ──────────────────────────────────────────── */

export function WhitepaperTab({ data, startupName, onNext }: { data: GeneratedData["whitepaper"]; startupName: string; onNext: () => void }) {
  const sections = [
    { title: "Executive Summary", body: data.executiveSummary },
    { title: "Problem Statement", body: data.problemStatement },
    { title: "Solution Architecture", body: data.solution },
    { title: "Roadmap Overview", body: data.roadmapOverview },
  ];
  return (
    <div>
      <PanelHead title="Whitepaper" sub="Investor-grade documentation generated for your startup." />
      {sections.map((s) => (
        <Card key={s.title} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--primary)", marginBottom: 9 }}>{s.title}</div>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--sub)" }}>{s.body}</p>
        </Card>
      ))}
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <button onClick={() => alert("PDF export — wire up a PDF library like jsPDF or react-pdf in production.")} style={{ flex: 1, padding: 10, borderRadius: 9, border: "none", background: "var(--primary)", color: "#fff", fontFamily: "var(--font-hubot)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Export as PDF
        </button>
        <button onClick={onNext} style={{ padding: "10px 18px", borderRadius: 9, border: "1px solid var(--border-2)", background: "transparent", fontFamily: "var(--font-hubot)", fontSize: 13, fontWeight: 500, color: "var(--sub)", cursor: "pointer" }}>
          View Roadmap
        </button>
      </div>
    </div>
  );
}

/* ── ROADMAP TAB ─────────────────────────────────────────────── */

export function RoadmapTab({ data }: { data: GeneratedData["roadmap"] }) {
  const months = [
    { label: "Month 1", color: "var(--primary)", items: data.month1 },
    { label: "Month 3", color: "var(--accent)", items: data.month3 },
    { label: "Month 6", color: "#22C55E", items: data.month6 },
    { label: "Month 12", color: "#F59E0B", items: data.month12 },
  ];
  return (
    <div>
      <PanelHead title="Launch Roadmap" sub="12-month execution plan generated from your startup profile." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
        {months.map((m) => (
          <Card key={m.label} style={{ borderTop: `2px solid ${m.color}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--primary)", marginBottom: 12 }}>{m.label}</div>
            {m.items?.map((item, i) => (
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

/* ── LIQUIDITY TAB ───────────────────────────────────────────── */

export function LiquidityTab({ data, tokenSymbol, onNext }: { data: GeneratedData["liquidity"]; tokenSymbol: string; onNext: () => void }) {
  return (
    <div>
      <PanelHead title="STON.fi Liquidity Planner" sub="AI-powered strategy tailored to your token and STON.fi DEX intelligence." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, marginBottom: 10 }}>
        <Card>
          <SectionLabel>Allocation Plan — {data.totalBudget} Total</SectionLabel>
          {data.allocation?.map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
              <span style={{ color: "var(--sub)" }}>{row.label}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>{row.pct}%</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{row.usd}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card><SectionLabel>Launch Strategy</SectionLabel><BulletList items={data.strategy} /></Card>
      </div>
      <NextBtn label="View Pool Intelligence" onClick={onNext} />
    </div>
  );
}

/* ── POOLS TAB ───────────────────────────────────────────────── */

export function PoolsTab({ tokenSymbol, onNext }: { tokenSymbol: string; onNext: () => void }) {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    fetch("/api/pools")
      .then((r) => r.json())
      .then((data) => {
        setPools(data.pools ?? []);
        setIsFallback(!!data.fallback);
      })
      .catch(() => setIsFallback(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PanelHead title="Pool Intelligence" sub={isFallback ? "STON.fi pool data (fallback — live API temporarily unavailable)" : "Live STON.fi pool data for strategic positioning."} />
      <Card style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <SectionLabel>Top Pools by TVL</SectionLabel>
          {!isFallback && <span style={{ fontSize: 11, color: "#22C55E", fontWeight: 600, background: "rgba(34,197,94,0.08)", padding: "3px 8px", borderRadius: 6 }}>LIVE</span>}
        </div>
        {loading ? (
          <div style={{ padding: "24px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>Loading live pool data...</div>
        ) : (
          <div>
            {pools.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 15px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, marginBottom: 7, transition: "border-color 0.2s" }}
                onMouseOver={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,152,234,0.25)")}
                onMouseOut={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.2px", color: "var(--text)" }}>{p.token0Symbol} / {p.token1Symbol}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>TVL: {p.tvlUsd} · Vol: {p.volume24hUsd} / 24h · Fee: {p.fee}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#22C55E" }}>{p.apy} APY</div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
        <Card>
          <SectionLabel>Recommended Pool for {tokenSymbol.toUpperCase()} Launch</SectionLabel>
          <div style={{ background: "rgba(0,152,234,0.06)", borderRadius: 9, padding: 13, marginTop: 7, border: "1px solid rgba(0,152,234,0.14)" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3, color: "var(--text)" }}>{tokenSymbol.toUpperCase()} / TON</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>Standard Pool · 0.3% Fee Tier</div>
            {[["Recommended Liquidity", "Defined in your liquidity plan"], ["Projected LP APY", "4–8% (based on live pool data)"], ["Best Execution Via", "STON.fi Omniston SDK"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
                <span style={{ color: "var(--sub)" }}>{k}</span>
                <span style={{ fontWeight: 700, color: "var(--text)" }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionLabel>Ecosystem Insights</SectionLabel>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
            {["STON.fi is the leading DEX on TON with the deepest liquidity across major pairs", "Omniston SDK provides best-execution routing for all token swaps on your platform", "Farming program support available for new protocol listings via STON.fi BD team", "Concentrated liquidity pools allow tighter spreads and better capital efficiency at launch"].map((item, i) => (
              <li key={i} style={{ fontSize: 13, color: "var(--sub)", display: "flex", alignItems: "flex-start", gap: 7, lineHeight: 1.55 }}>
                <span style={{ color: "var(--primary)", fontWeight: 700, flexShrink: 0 }}>—</span>{item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <NextBtn label="View Launch Score" onClick={onNext} />
    </div>
  );
}

/* ── READINESS TAB ───────────────────────────────────────────── */

export function ReadinessTab({ data, onNext }: { data: GeneratedData["readiness"]; onNext: () => void }) {
  const bars = [
    { label: "Business Score", val: data.business, color: "var(--primary)", note: data.businessNote },
    { label: "Tokenomics Score", val: data.tokenomics, color: "var(--accent)", note: data.tokenomicsNote },
    { label: "Liquidity Score", val: data.liquidity, color: "#22C55E", note: data.liquidityNote },
    { label: "Community Score", val: data.community, color: "#F59E0B", note: data.communityNote },
  ];
  return (
    <div>
      <PanelHead title="Launch Readiness Score" sub="Comprehensive readiness assessment based on your actual startup profile." />
      <div style={{ textAlign: "center", padding: 32, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: "-4px", color: "var(--primary)", lineHeight: 1 }}>{data.overall}</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 5, textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 700 }}>out of 100</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginTop: 7, letterSpacing: "-0.4px", color: "var(--text)" }}>
          {data.overall >= 80 ? "Launch Ready" : data.overall >= 60 ? "Nearly Ready" : "Needs Work"}
        </div>
        <div style={{ fontSize: 13, color: "var(--sub)", marginTop: 7, maxWidth: 420, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>{data.verdict}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
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

/* ── MIRA TAB ────────────────────────────────────────────────── */

export function MiraTab({ startupName, miraPrompt, data }: {
  startupName: string; miraPrompt: string; data: GeneratedData;
}) {
  const [copied, setCopied] = useState(false);

  const handleOpenMira = () => {
    // Copy prompt to clipboard so user can paste it to Mira
    navigator.clipboard.writeText(miraPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
    // Open Mira in Telegram
    window.open("https://t.me/mira", "_blank");
  };

  const contextRows = [
    ["Startup Name", startupName],
    ["Validation Score", `${data.validation.overallScore} / 100`],
    ["Launch Readiness", `${data.readiness.overall} / 100 — ${data.readiness.overall >= 80 ? "Launch Ready" : "Nearly Ready"}`],
    ["Token Symbol", data.tokenomics.distribution?.[0] ? `${data.tokenomics.totalSupply.toLocaleString()} total supply` : "—"],
    ["Initial Market Cap", data.tokenomics.initialMc],
    ["Top Priority", data.readiness.communityNote?.split(".")[0] ?? "Community building"],
  ];

  return (
    <div>
      <PanelHead title="Mira AI Co-Founder" sub="Transfer your startup context and continue building with your AI co-founder." />
      <div style={{ background: "linear-gradient(160deg, #060A12, #0D1220 60%, #100B1F)", borderRadius: 16, padding: "44px 32px", textAlign: "center" }}>
        <style>{`@keyframes mira-pulse { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.1);opacity:1} } .mira-orb-inner{width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.15);animation:mira-pulse 2.5s ease-in-out infinite;}`}</style>
        <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 22px", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="mira-orb-inner" />
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.7px", marginBottom: 10, color: "#fff" }}>
          Meet Mira, Your AI Co-Founder
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.65, marginBottom: 24, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          Your full startup profile for {startupName} has been compiled. Click below to open Mira on Telegram — your briefing prompt will be copied to clipboard automatically so you can paste it straight into the chat and continue building immediately.
        </p>

        {/* Context block */}
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 16, marginBottom: 16, textAlign: "left", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>Startup Context</div>
          {contextRows.map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 13 }}>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{k}</span>
              <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Prompt preview */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 14, marginBottom: 20, textAlign: "left", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Briefing Prompt (auto-copied)</div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxHeight: 80, overflow: "hidden" }}>
            {miraPrompt?.slice(0, 220)}...
          </p>
        </div>

        <button
          onClick={handleOpenMira}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", maxWidth: 480, margin: "0 auto 10px", padding: 14, borderRadius: 11, border: "none", background: "#229ED9", color: "#fff", fontFamily: "var(--font-hubot)", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" }}
          onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.9")}
          onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        >
          {copied ? "Prompt copied — Mira is opening..." : `Open Mira on Telegram with ${startupName} context`}
        </button>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 10 }}>
          Paste the copied prompt into Mira to begin your co-founder session without starting over.
        </p>
      </div>
    </div>
  );
}
