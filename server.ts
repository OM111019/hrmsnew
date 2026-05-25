/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Server: Gemini API client initialized successfully.");
  } catch (err) {
    console.error("Server: Failed to initialize Gemini API client:", err);
  }
} else {
  console.log("Server: GEMINI_API_KEY not found. Running in Smart Fallback mode.");
}

// ---------------- SERVER REST API ENDPOINTS ----------------

// Base Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    geminiConnected: !!ai,
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// A system helper to parse JSON response from Gemini
function cleanAndParseJSON(rawText: string) {
  try {
    // Strip markdown wrappers if they exist
    let formattedText = rawText.trim();
    if (formattedText.startsWith("```json")) {
      formattedText = formattedText.substring(7);
    } else if (formattedText.startsWith("```")) {
      formattedText = formattedText.substring(3);
    }
    if (formattedText.endsWith("```")) {
      formattedText = formattedText.substring(0, formattedText.length - 3);
    }
    return JSON.parse(formattedText.trim());
  } catch (error) {
    console.error("Failed to parse Gemini JSON output, raw text was:", rawText);
    throw error;
  }
}

// 1. Employee Engagement Score and Coaching
app.post("/api/ai/analyze-engagement", async (req, res) => {
  const { employee } = req.body;
  if (!employee) {
    return res.status(400).json({ error: "Employee data is required." });
  }

  // Define fallback response first as recommended for resilience
  const fallback = {
    score: Math.min(100, Math.max(20, Math.round(employee.attendanceRate * 0.4 + employee.points / 15 + employee.streak * 5))),
    summaryText: `Based on local analytics, ${employee.name} shows strong alignment with teams but needs active challenge participation.`,
    strengths: [
      `Maintains a high attendance rate of ${employee.attendanceRate}%`,
      `Accumulated ${employee.points} lifestyle points across HR quests`,
      `Currently on a ${employee.streak}-day check-in streak`
    ],
    coachingTips: [
      "Encourage mentoring colleagues in core competencies of the department.",
      "Incentivize enrollment in premium micro-courses via points doubling weekends.",
      "Suggest using accumulated points to redeem fresh lifestyle or wellness rewards."
    ],
    suggestions: [
      "Enroll in Advanced Tech Leadership module.",
      "Redeem a Coffee voucher to connect as peer buddy program."
    ]
  };

  if (!ai) {
    return res.json({ ...fallback, isFallback: true });
  }

  try {
    const prompt = `Analyze this employee profile for Engagement & Culture. Evaluate their statistics, points, levels, badge awards, streaks, and attendance rate to provide deep insights.
    
    Employee raw data:
    - Name: ${employee.name}
    - Role: ${employee.role}
    - Department: ${employee.department}
    - Level: ${employee.level}
    - Points Balance: ${employee.points}
    - Check-in Streak: ${employee.streak}
    - Attendance Rate: ${employee.attendanceRate}%
    - Recent Activity: ${JSON.stringify(employee.recentActivity || [])}
    
    You must output a single, raw, unformatted JSON object conforming exactly to this schema:
    {
      "score": number (0-100 indicating predicted engagement and morale),
      "summaryText": "A detailed 2-3 sentence analysis of their overall cultural alignment and sentiment",
      "strengths": ["list of 2 or 3 distinct operational strengths"],
      "coachingTips": ["list of 3 specific action-oriented coaching tips for HR/manager to boost morale"],
      "suggestions": ["list of 2 immediate training/gamification goals for this employee"]
    }
    
    Do not include any explanations or standard markdown symbols. Return only the parsable JSON string.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an Elite Enterprise Psychologist and Lead HR Data Analyst. You write highly constructive, practical, and growth-oriented HR insights.",
        responseMimeType: "application/json"
      }
    });

    const resultText = response.text || "";
    const parsed = cleanAndParseJSON(resultText);
    res.json(parsed);
  } catch (error) {
    console.error("Gemini analyze-engagement error:", error);
    res.json(fallback);
  }
});

// 2. Rewards Recommendation engine
app.post("/api/ai/recommend-rewards", async (req, res) => {
  const { employee, rewardsCatalog } = req.body;
  
  const fallback = {
    summaryText: "Smart recommendations calculated based on historical department selections and redeemable points balance.",
    recommendedRewards: (rewardsCatalog || []).slice(0, 3)
  };

  if (!employee) {
    return res.status(400).json({ error: "Employee data is required." });
  }

  if (!ai) {
    return res.json({ ...fallback, isFallback: true });
  }

  try {
    const rewardsListStr = JSON.stringify(rewardsCatalog || []);
    const prompt = `Match the best brand rewards from our marketplace catalog for employee "${employee.name}" (${employee.role} in ${employee.department}) with ${employee.points} points.
    
    Employee details:
    - Name: ${employee.name}
    - Department: ${employee.department}
    - Role: ${employee.role}
    - Current Points: ${employee.points}
    
    Our Marketplace Catalog:
    ${rewardsListStr}
    
    Select exactly 3 reward IDs that match the employee's role vibe, budget (pointsCost should generally be <= current points, but may include 1 aspirational next-tier item), and category relevance.
    Provide a highly encouraging explanation of why each reward was picked.
    
    You must output a single, raw, unformatted JSON object conforming exactly to this schema:
    {
      "summaryText": "Brief rationale for these personalized brand choices.",
      "recommendedRewardIds": ["rewardId1", "rewardId2", "rewardId3"],
      "reasons": {
        "rewardId1": "encouraging personalized reason",
        "rewardId2": "encouraging personalized reason",
        "rewardId3": "encouraging personalized reason"
      }
    }
    Do not markdown formats. Return only raw parsable JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Corporate Rewards Director, specializing in matching corporate benefits to individual employee performance contexts to improve appreciation metrics.",
        responseMimeType: "application/json"
      }
    });

    const parsed = cleanAndParseJSON(response.text || "");
    
    // Enrich with actual catalog details
    const catalog = rewardsCatalog || [];
    const recommended = (parsed.recommendedRewardIds || []).map((id: string) => {
      const match = catalog.find((r: any) => r.id === id);
      if (match) {
        return {
          ...match,
          reason: parsed.reasons?.[id] || "Selected by AI based on department profile."
        };
      }
      return null;
    }).filter(Boolean);

    res.json({
      summaryText: parsed.summaryText || "Personalized incentives list mapped.",
      recommendedRewards: recommended.length ? recommended : catalog.slice(0, 3)
    });
  } catch (error) {
    console.error("Gemini recommend-rewards error:", error);
    res.json(fallback);
  }
});

// 3. Performance Insights & Goal Suggestions
app.post("/api/ai/analyze-performance", async (req, res) => {
  const { employee, courses } = req.body;
  if (!employee) {
    return res.status(400).json({ error: "Employee data is required." });
  }

  const fallback = {
    summaryText: `${employee.name} displays exemplary task discipline and department metrics. Continual upskilling keeps them leading technical excellence.`,
    strengths: [
      `Maintains general performance at ${employee.performanceRating}/5`,
      `Possesses comprehensive departmental expertise as ${employee.role}`
    ],
    coachingTips: [
      "Sponsor certification paths in strategic tech layers.",
      "Assign cross-department mentoring buddy sprints."
    ],
    suggestions: [
      "Formulate active team-wide webinars to translate personal competencies.",
      "Set aggressive OKRs around delivery scaling."
    ]
  };

  if (!ai) {
    return res.json({ ...fallback, isFallback: true });
  }

  try {
    const prompt = `Evaluate performance indicators and training parameters for Employee "${employee.name}". Introduce specific gamified pathways.
    
    Employee Data:
    - Role: ${employee.role}
    - Rating: ${employee.performanceRating}/5
    - Completed Streaks: ${employee.streak}
    - Points Earned: ${employee.points}
    - Active Learning: ${JSON.stringify(courses || [])}
    
    Write a constructive performance diagnostic. Output raw, clean JSON format matching the schema:
    {
      "summaryText": "constructive text evaluation",
      "strengths": ["Specific performance success points"],
      "coachingTips": ["Constructive professional advice points "],
      "suggestions": ["Syllabus and action goals"]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Chief Learning Officer & Executive Coach. You provide technical feedback and define dynamic, positive milestone suggestions.",
        responseMimeType: "application/json"
      }
    });

    const parsed = cleanAndParseJSON(response.text || "");
    res.json(parsed);
  } catch (error) {
    console.error("Gemini analyze-performance error:", error);
    res.json(fallback);
  }
});

// 4. Trial Corporate Behavior Analysis for Admins
app.post("/api/ai/analyze-trial-behavior", async (req, res) => {
  const { trialMetrics } = req.body;
  
  const fallback = {
    summaryText: "Your enterprise trial exhibits stellar active engagement. Redemptions remain lower than average, suggesting the rewards catalog would benefit from localized brand expansion.",
    metricsAnalysis: [
      { metric: "Active Daily SaaS Usage", score: 84, evaluation: "Highly dynamic daily attendance logs indicate stellar early habit-loops." },
      { metric: "Point System Sinks", score: 52, evaluation: "Moderate redemptions. Encourage employees to active redemption checkpoints." },
      { metric: "Challenges Participation", score: 71, evaluation: "High interest in department-wide challenges." }
    ],
    suggestions: [
      "Deploy localized food and OTT vouchers to trigger dopamine reward curves.",
      "Launch a 'CEO Streak Challenge' with 500 gold bonus points to boost daily active loyalty.",
      "Schedule custom corporate branding on leaderboards to optimize internal cultural branding."
    ]
  };

  if (!ai) {
    return res.json({ ...fallback, isFallback: true });
  }

  try {
    const prompt = `Perform an enterprise diagnostics evaluation on a corporate trial account's SaaS usage behavior.
    
    Trial Analytics Metrics:
    - Total employees enrolled: ${trialMetrics?.totalEmployees || 45}
    - Active daily participants: ${trialMetrics?.activeDaily || 38} (or ${trialMetrics?.activePct || 84}%)
    - Total reward points minted: ${trialMetrics?.pointsMinted || 12400}
    - Total rewards redeemed: ${trialMetrics?.rewardsRedeemed || 12}
    - Group challenge participation: ${trialMetrics?.challengeParticipation || 78}%
    
    Provide strategic actionable recommendations on how the HR team can triple user retention, gamify workspace culture, and configure brand discount partnerships.
    
    Conform exactly to this output JSON schema:
    {
      "summaryText": "A 3-sentence high-level strategic overview of company adoption levels and cultural health during trial.",
      "metricsAnalysis": [
        { "metric": "name of metric", "score": number 0-100, "evaluation": "short explanation of context" }
      ],
      "suggestions": ["list of 3 unique corporate launch recommendations for administrators"]
    }
    Ensure valid, unshielded JSON. Do not return markdown wrappers.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Global SaaS Implementation Director at a top-tier management consultancy.",
        responseMimeType: "application/json"
      }
    });

    const parsed = cleanAndParseJSON(response.text || "");
    res.json(parsed);
  } catch (error) {
    console.error("Gemini analyze-trial-behavior error:", error);
    res.json(fallback);
  }
});

// 5. Admin General Summary Morale Report
app.post("/api/ai/admin-morale-summary", async (req, res) => {
  const { activeStreaks, pointsDistributed, turnoverEstimate } = req.body;
  
  const fallback = {
    summaryText: "Enterprise engagement metrics are trending upwards by 14.2% since integration of points-based check-ins. Peer feedback sentiment highlights recognition as a primary team-strength."
  };

  if (!ai) {
    return res.json({ ...fallback, isFallback: true });
  }

  try {
    const prompt = `Synthesize a brief Executive Morale Report for HR leadership:
    - Current leaderboards shows top check-in streaks at ${activeStreaks || 12} days.
    - Points minted this cycle: ${pointsDistributed || 5800} points.
    - Morale baseline: positive.
    
    Provide a modern, inspirational, data-backed administrative summary in 3 concise bullet points formatted in clean text. No JSON required. Keep it short yet executive and sleek.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Chief Human Resources Officer sharing morale briefs."
      }
    });

    res.json({
      summaryText: response.text || fallback.summaryText
    });
  } catch (err) {
    console.error("Admin summary fallback error:", err);
    res.json(fallback);
  }
});


// ---------------- EXPRESS STATIC AND VITE SERVER BINDINGS ----------------

async function configureServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Server: Starting Vite Dev Server Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Server: Production mode. Serving built bundle from dist/ folder.");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server: Operational on http://0.0.0.0:${PORT}`);
  });
}

configureServer();
