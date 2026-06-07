"use client";

import { DashTab } from "@/lib/types";

interface SidebarProps {
  activeTab: DashTab;
  onTabChange: (tab: DashTab) => void;
  generated: boolean;
}

const mainItems: { id: DashTab; label: string }[] = [
  { id: "idea", label: "Startup Idea" },
  { id: "validation", label: "Validation" },
  { id: "tokenomics", label: "Tokenomics" },
  { id: "branding", label: "Branding" },
  { id: "whitepaper", label: "Whitepaper" },
  { id: "roadmap", label: "Roadmap" },
];

const stonfiItems: { id: DashTab; label: string }[] = [
  { id: "liquidity", label: "Liquidity Planner" },
  { id: "pools", label: "Pool Intelligence" },
  { id: "readiness", label: "Launch Score" },
];

const aiItems: { id: DashTab; label: string }[] = [
  { id: "mira", label: "Mira AI" },
];

function SidebarItem({ id, label, active, onClick, locked }: {
  id: DashTab; label: string; active: boolean; onClick: () => void; locked?: boolean;
}) {
  return (
    <div
      onClick={locked ? undefined : onClick}
      title={locked ? "Generate your launch plan first" : undefined}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "9px 10px", borderRadius: 8,
        cursor: locked ? "not-allowed" : "pointer",
        fontSize: 13, fontWeight: active ? 600 : 500,
        color: active ? "var(--primary)" : locked ? "var(--muted)" : "var(--sub)",
        background: active ? "rgba(0,152,234,0.1)" : "transparent",
        transition: "all 0.15s",
        opacity: locked ? 0.5 : 1,
      }}
      onMouseOver={(e) => { if (!active && !locked) { (e.currentTarget as HTMLDivElement).style.background = "var(--bg-3)"; (e.currentTarget as HTMLDivElement).style.color = "var(--text)"; } }}
      onMouseOut={(e) => { if (!active && !locked) { (e.currentTarget as HTMLDivElement).style.background = "transparent"; (e.currentTarget as HTMLDivElement).style.color = "var(--sub)"; } }}
    >
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: active ? "var(--primary)" : "var(--border-2)", flexShrink: 0, transition: "background 0.15s" }} />
      {label}
    </div>
  );
}

export function Sidebar({ activeTab, onTabChange, generated }: SidebarProps) {
  return (
    <div style={{ background: "var(--bg-2)", borderRight: "1px solid var(--border)", padding: "18px 10px", display: "flex", flexDirection: "column", gap: 2, width: 192, flexShrink: 0 }}>
      {mainItems.map((item) => (
        <SidebarItem key={item.id} id={item.id} label={item.label} active={activeTab === item.id} onClick={() => onTabChange(item.id)} locked={item.id !== "idea" && !generated} />
      ))}
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--muted)", padding: "10px 10px 4px", marginTop: 6 }}>STON.fi</div>
      {stonfiItems.map((item) => (
        <SidebarItem key={item.id} id={item.id} label={item.label} active={activeTab === item.id} onClick={() => onTabChange(item.id)} locked={item.id !== "pools" && !generated} />
      ))}
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--muted)", padding: "10px 10px 4px", marginTop: 6 }}>AI Co-Founder</div>
      {aiItems.map((item) => (
        <SidebarItem key={item.id} id={item.id} label={item.label} active={activeTab === item.id} onClick={() => onTabChange(item.id)} locked={!generated} />
      ))}
    </div>
  );
}
