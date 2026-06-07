"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  {
    color: "var(--primary)",
    title: "Startup Validation Engine",
    desc: "Multi-dimensional AI scoring across market opportunity, competitive landscape, revenue potential, and investor readiness.",
  },
  {
    color: "var(--accent)",
    title: "Tokenomics Generator",
    desc: "Token supply modeling, distribution architecture, vesting schedules, treasury strategy, and utility design.",
  },
  {
    color: "#22C55E",
    title: "Whitepaper Generator",
    desc: "Investor-grade documentation with executive summary, problem statement, solution architecture, and roadmap.",
  },
  {
    color: "#F59E0B",
    title: "STON.fi Liquidity Planner",
    desc: "Intelligent liquidity allocation powered by STON.fi DEX analytics and Omniston SDK routing intelligence.",
  },
  {
    color: "var(--accent)",
    title: "Mira AI Co-Founder",
    desc: "Transfer your entire startup context to Mira and continue building inside Telegram, available around the clock.",
  },
  {
    color: "var(--primary)",
    title: "TON Wallet Integration",
    desc: "Native TON Connect authentication. Wallet-gated access with balance display and on-chain context awareness.",
  },
];

const steps = [
  {
    n: "01",
    title: "Describe Your Startup",
    desc: "Input your startup name, industry, description, and target users. AI analysis begins immediately.",
  },
  {
    n: "02",
    title: "Generate Launch Plan",
    desc: "Receive validation scores, tokenomics, whitepaper draft, and branding assets within 60 seconds.",
  },
  {
    n: "03",
    title: "Optimize With STON.fi",
    desc: "Connect to STON.fi intelligence for pool recommendations and launch liquidity strategy.",
  },
  {
    n: "04",
    title: "Hand Off to Mira AI",
    desc: "Transfer your full startup context to Mira for continued strategy execution in Telegram.",
  },
];

const stats = [
  { val: "7", label: "AI Modules" },
  { val: "TON", label: "Native Chain" },
  { val: "STON.fi", label: "DEX Integration" },
  { val: "<60s", label: "Full Launch Plan" },
];

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div>
      {/* Hero */}
      <div
        style={{
          padding: "72px 48px 56px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          className="grid-bg"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            height: 360,
            background:
              "radial-gradient(ellipse at center, rgba(0,152,234,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 28,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Image
            src="/logo.png"
            alt="LaunchPilot AI"
            width={88}
            height={88}
            style={{ objectFit: "contain" }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "5px 14px",
            borderRadius: 100,
            border: "1px solid rgba(0,152,234,0.2)",
            background: "rgba(0,152,234,0.06)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: 24,
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--primary)",
              display: "inline-block",
            }}
          />
          AI-Powered Venture Studio on TON
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{
            fontSize: 54,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: "-2.5px",
            marginBottom: 20,
            position: "relative",
            zIndex: 1,
            color: "var(--text)",
          }}
        >
          Turn Any Idea Into a{" "}
          <span style={{ color: "var(--primary)" }}>Launch-Ready</span>
          <br />
          TON Startup
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: 17,
            fontWeight: 400,
            color: "var(--sub)",
            lineHeight: 1.65,
            maxWidth: 520,
            margin: "0 auto 36px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Generate startup validation, tokenomics, whitepapers, liquidity
          plans, and AI co-founder guidance in minutes.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <button
            onClick={onStart}
            style={{
              padding: "13px 28px",
              borderRadius: 11,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              fontFamily: "var(--font-hubot)",
              letterSpacing: "-0.2px",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
          >
            Start Building
          </button>
          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "13px 28px",
              borderRadius: 11,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              background: "var(--bg)",
              color: "var(--text)",
              border: "1px solid var(--border-2)",
              fontFamily: "var(--font-hubot)",
              letterSpacing: "-0.2px",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--primary)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--primary)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--border-2)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
            }}
          >
            See How It Works
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 44,
            marginTop: 52,
            paddingTop: 36,
            borderTop: "1px solid var(--border)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: "-0.8px",
                  color: "var(--text)",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  marginTop: 3,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Divider */}
      <div
        style={{ height: 1, background: "var(--border)", margin: "0 48px" }}
      />

      {/* Features */}
      <div id="features" style={{ padding: "56px 48px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: 10,
          }}
        >
          Platform Capabilities
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "-1.2px",
            marginBottom: 10,
            color: "var(--text)",
          }}
        >
          Every tool to launch on TON
        </div>
        <div
          style={{
            fontSize: 15,
            color: "var(--sub)",
            marginBottom: 32,
            maxWidth: 460,
          }}
        >
          A complete AI-powered venture studio purpose-built for the TON
          ecosystem.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "var(--bg)",
                padding: 26,
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "var(--bg-2)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "var(--bg)")
              }
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: f.color,
                  marginBottom: 16,
                }}
              />
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 7,
                  letterSpacing: "-0.2px",
                  color: "var(--text)",
                }}
              >
                {f.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--sub)",
                  lineHeight: 1.65,
                }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{ height: 1, background: "var(--border)", margin: "0 48px" }}
      />

      {/* How it works */}
      <div style={{ padding: "56px 48px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: 10,
          }}
        >
          Workflow
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "-1.2px",
            marginBottom: 6,
            color: "var(--text)",
          }}
        >
          From idea to launch in four steps
        </div>

        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 14,
            overflow: "hidden",
            marginTop: 24,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  padding: "26px 22px",
                  position: "relative",
                  borderRight:
                    i < steps.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    marginBottom: 10,
                  }}
                >
                  Step {s.n}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "-0.3px",
                    marginBottom: 7,
                    color: "var(--text)",
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.6 }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          margin: "0 48px 48px",
          background:
            "linear-gradient(160deg, #060A12, #0D1220 60%, #100B1F)",
          borderRadius: 16,
          padding: "44px 36px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: "-1px",
            color: "#fff",
            marginBottom: 10,
          }}
        >
          Ready to build your TON startup?
        </div>
        <div
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.55)",
            marginBottom: 26,
          }}
        >
          Connect your TON wallet and generate your full launch plan in under
          60 seconds.
        </div>
        <button
          onClick={onStart}
          style={{
            padding: "13px 28px",
            borderRadius: 11,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            background: "var(--primary)",
            color: "#fff",
            border: "none",
            fontFamily: "var(--font-hubot)",
          }}
        >
          Connect Wallet and Start Building
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "18px 48px 28px",
          color: "var(--muted)",
          fontSize: 11,
          borderTop: "1px solid var(--border)",
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        LaunchPilot AI &nbsp;·&nbsp; Built on TON &nbsp;·&nbsp; Powered by
        STON.fi
      </div>
    </div>
  );
}
