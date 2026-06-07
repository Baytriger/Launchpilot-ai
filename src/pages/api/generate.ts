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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
  }

  const prompt = `
You are an expert startup analyst and venture capital advisor specializing in TON blockchain and DeFi ecosystems. 
Analyze this startup idea and return a comprehensive JSON report.

STARTUP DETAILS:
- Name: ${startup.name}
- Industry: ${startup.industry}
- Description: ${startup.description}
- Target Users: ${startup.targetUsers}
- Token Symbol: ${startup.tokenSymbol}

Return ONLY valid JSON (no markdown, no explanation) with this exact structure:

{
  "validation": {
    "overallScore": <integer 0-100>,
    "marketScore": <integer 0-100>,
    "investorScore": <integer 0-100>,
    "marketOpportunity": [<4 specific bullet strings about this exact startup's market>],
    "competition": [<4 specific bullet strings about competitive landscape>],
    "revenue": [<4 specific revenue stream bullets for this startup>],
    "risks": [<4 specific risk bullets>],
    "investorQuestions": [<3 tough investor questions with answers specific to this startup>]
  },
  "tokenomics": {
    "totalSupply": <number>,
    "launchPrice": <number in USD>,
    "initialMc": <string e.g. "$2.4M">,
    "fdv": <string e.g. "$12M">,
    "distribution": [
      { "label": "Community & Ecosystem", "pct": <number>, "color": "#0098EA" },
      { "label": "Team & Advisors", "pct": <number>, "color": "#7C3AED" },
      { "label": "Treasury", "pct": <number>, "color": "#22C55E" },
      { "label": "Public Sale", "pct": <number>, "color": "#F59E0B" }
    ],
    "utility": [<5 specific token utility bullet strings>],
    "vesting": [<4 vesting schedule bullet strings>]
  },
  "branding": {
    "names": [<4 alternative name suggestions with explanation>],
    "taglines": [<4 tagline options>],
    "positioning": [<4 brand positioning statements>],
    "visualConcepts": [<2 logo/visual identity concept descriptions>]
  },
  "whitepaper": {
    "executiveSummary": "<2-3 sentence executive summary specific to this startup>",
    "problemStatement": "<2-3 sentence problem statement>",
    "solution": "<2-3 sentence solution description>",
    "roadmapOverview": "<2-3 sentence roadmap overview>"
  },
  "roadmap": {
    "month1": [<5 specific milestone strings>],
    "month3": [<5 specific milestone strings>],
    "month6": [<5 specific milestone strings>],
    "month12": [<5 specific milestone strings>]
  },
  "liquidity": {
    "totalBudget": "<estimated total liquidity budget string>",
    "allocation": [
      { "label": "<pool name>", "pct": <number>, "usd": "<dollar amount>" },
      { "label": "<pool name>", "pct": <number>, "usd": "<dollar amount>" },
      { "label": "Protocol-Owned Liquidity", "pct": <number>, "usd": "<dollar amount>" },
      { "label": "Emergency Reserve", "pct": <number>, "usd": "<dollar amount>" }
    ],
    "strategy": [<6 specific launch strategy bullet strings>]
  },
  "readiness": {
    "overall": <integer 0-100>,
    "business": <integer 0-100>,
    "tokenomics": <integer 0-100>,
    "liquidity": <integer 0-100>,
    "community": <integer 0-100>,
    "businessNote": "<one sentence note on business score>",
    "tokenomicsNote": "<one sentence note on tokenomics score>",
    "liquidityNote": "<one sentence note on liquidity score>",
    "communityNote": "<one sentence note on community score>",
    "verdict": "<2-3 sentence overall verdict and top recommendation>"
  },
  "miraPrompt": "<A detailed briefing prompt for Mira AI co-founder. Start with: 'Hi Mira, I am the founder of [startup name]. Here is my startup context: ...' Include the startup description, scores, tokenomics summary, and ask Mira to help with the next steps as co-founder.>"
}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini error:", err);
      return res.status(500).json({ error: "Gemini API failed", details: err });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({ error: "Empty response from Gemini" });
    }

    // Strip markdown code fences if present
    const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      console.error("JSON parse error. Raw:", clean.slice(0, 500));
      return res.status(500).json({ error: "Failed to parse Gemini response" });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Generate error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
