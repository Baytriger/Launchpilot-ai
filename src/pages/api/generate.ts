import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { startup } = req.body;

  if (!startup?.name || !startup?.description) {
    return res.status(400).json({ error: "Missing startup data" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not configured in environment variables" });
  }

  const prompt = `You are an expert startup analyst and venture capital advisor specializing in TON blockchain and DeFi ecosystems.
Analyze this startup idea and return a comprehensive JSON report.

STARTUP DETAILS:
- Name: ${startup.name}
- Industry: ${startup.industry}
- Description: ${startup.description}
- Target Users: ${startup.targetUsers}
- Token Symbol: ${startup.tokenSymbol}

Return ONLY valid JSON with no markdown, no code fences, no explanation. Just raw JSON.

{
  "validation": {
    "overallScore": <integer 0-100>,
    "marketScore": <integer 0-100>,
    "investorScore": <integer 0-100>,
    "marketOpportunity": ["<bullet 1>", "<bullet 2>", "<bullet 3>", "<bullet 4>"],
    "competition": ["<bullet 1>", "<bullet 2>", "<bullet 3>", "<bullet 4>"],
    "revenue": ["<bullet 1>", "<bullet 2>", "<bullet 3>", "<bullet 4>"],
    "risks": ["<bullet 1>", "<bullet 2>", "<bullet 3>", "<bullet 4>"],
    "investorQuestions": ["<question and answer 1>", "<question and answer 2>", "<question and answer 3>"]
  },
  "tokenomics": {
    "totalSupply": <number>,
    "launchPrice": <number>,
    "initialMc": "<string e.g. $2.4M>",
    "fdv": "<string e.g. $12M>",
    "distribution": [
      { "label": "Community & Ecosystem", "pct": <number>, "color": "#0098EA" },
      { "label": "Team & Advisors", "pct": <number>, "color": "#7C3AED" },
      { "label": "Treasury", "pct": <number>, "color": "#22C55E" },
      { "label": "Public Sale", "pct": <number>, "color": "#F59E0B" }
    ],
    "utility": ["<bullet 1>", "<bullet 2>", "<bullet 3>", "<bullet 4>", "<bullet 5>"],
    "vesting": ["<bullet 1>", "<bullet 2>", "<bullet 3>", "<bullet 4>"]
  },
  "branding": {
    "names": ["<name — explanation>", "<name — explanation>", "<name — explanation>", "<name — explanation>"],
    "taglines": ["<tagline 1>", "<tagline 2>", "<tagline 3>", "<tagline 4>"],
    "positioning": ["<statement 1>", "<statement 2>", "<statement 3>", "<statement 4>"],
    "visualConcepts": ["<concept 1>", "<concept 2>"]
  },
  "whitepaper": {
    "executiveSummary": "<2-3 sentences>",
    "problemStatement": "<2-3 sentences>",
    "solution": "<2-3 sentences>",
    "roadmapOverview": "<2-3 sentences>"
  },
  "roadmap": {
    "month1": ["<milestone 1>", "<milestone 2>", "<milestone 3>", "<milestone 4>", "<milestone 5>"],
    "month3": ["<milestone 1>", "<milestone 2>", "<milestone 3>", "<milestone 4>", "<milestone 5>"],
    "month6": ["<milestone 1>", "<milestone 2>", "<milestone 3>", "<milestone 4>", "<milestone 5>"],
    "month12": ["<milestone 1>", "<milestone 2>", "<milestone 3>", "<milestone 4>", "<milestone 5>"]
  },
  "liquidity": {
    "totalBudget": "<e.g. $200,000>",
    "allocation": [
      { "label": "${startup.tokenSymbol} / TON Pool (STON.fi)", "pct": <number>, "usd": "<dollar amount>" },
      { "label": "${startup.tokenSymbol} / USDT Pool (STON.fi)", "pct": <number>, "usd": "<dollar amount>" },
      { "label": "Protocol-Owned Liquidity", "pct": <number>, "usd": "<dollar amount>" },
      { "label": "Emergency Reserve", "pct": <number>, "usd": "<dollar amount>" }
    ],
    "strategy": ["<bullet 1>", "<bullet 2>", "<bullet 3>", "<bullet 4>", "<bullet 5>", "<bullet 6>"]
  },
  "readiness": {
    "overall": <integer 0-100>,
    "business": <integer 0-100>,
    "tokenomics": <integer 0-100>,
    "liquidity": <integer 0-100>,
    "community": <integer 0-100>,
    "businessNote": "<one sentence>",
    "tokenomicsNote": "<one sentence>",
    "liquidityNote": "<one sentence>",
    "communityNote": "<one sentence>",
    "verdict": "<2-3 sentence overall verdict and top recommendation>"
  },
  "miraPrompt": "Hi Mira, I am the founder of ${startup.name}. Here is my full startup context: ${startup.description}. My target users are ${startup.targetUsers}. My token is ${startup.tokenSymbol}. Based on the LaunchPilot AI analysis, my overall validation score is [overallScore]/100, market score [marketScore]/100, and launch readiness [overall]/100. The top risks identified are [risks summary]. Please act as my AI co-founder and help me with the next steps to launch ${startup.name} on TON, starting with what I should prioritize this week."
}`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are an expert startup analyst. Always respond with valid JSON only. No markdown, no code fences, no explanation. Just raw JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq error:", err);
      return res.status(500).json({
        error: "Groq API failed",
        status: response.status,
        details: err,
      });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({
        error: "Empty response from Groq",
        raw: JSON.stringify(data).slice(0, 300),
      });
    }

    // Strip any markdown fences just in case
    const clean = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      console.error("JSON parse error. Raw:", clean.slice(0, 500));
      return res.status(500).json({
        error: "Failed to parse response as JSON",
        raw: clean.slice(0, 500),
      });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Generate error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
