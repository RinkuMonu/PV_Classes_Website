import { NextResponse } from "next/server";

const CLAUDE_MODEL = "claude-sonnet-4-6";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT_ASK = `You are a strict but encouraging interview panel member conducting a mock interview for the post of: {POST}, for an Indian government teaching recruitment exam. This is being run by PV Classes, an exam-prep coaching platform.

Ask realistic interview questions a real panel would ask for this post — covering subject knowledge, pedagogy, classroom scenarios, and general awareness relevant to the role. Vary the question types across the interview (don't repeat similar questions).

Respond ONLY with a raw JSON object, no markdown wrappers, no preamble, in this exact shape:
{"question": "the next interview question, one question only, concise"}`;

const SYSTEM_PROMPT_EVAL = `You are a strict but encouraging interview panel member evaluating a candidate's spoken answer during a mock interview for the post of: {POST}.

Score the answer from 0-10 based on relevance, correctness, clarity and confidence. Give short, specific, constructive feedback (max 2 sentences) in a warm but honest tone, as if speaking directly to the candidate. Then ask the next interview question (different topic/angle from previous questions), unless told this is the final question — in that case set next_question to null.

Respond ONLY with a raw JSON object, no markdown wrappers, no preamble, in this exact shape:
{"score": 7, "feedback": "short specific feedback here", "next_question": "next question here or null"}`;

const SYSTEM_PROMPT_REPORT = `You are an interview coach at PV Classes summarizing a completed mock interview for the post of: {POST}.

Based on the full question/answer/score history provided, write a final report.

Respond ONLY with a raw JSON object, no markdown wrappers, no preamble, in this exact shape:
{"overall_score": 7, "strengths": ["point 1", "point 2"], "improvements": ["point 1", "point 2"]}`;

function historyAsText(history) {
  return (history || [])
    .map(
      (h, i) =>
        `Q${i + 1}: ${h.question}\nCandidate's answer: ${h.answer}\nScore given: ${h.score}/10`
    )
    .join("\n\n");
}

async function callClaude(system, userPrompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Anthropic API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  // Robust cleaning regex to safely extract pure JSON even if markdown ticks are generated
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("AI did not return a valid JSON format response.");
  }
  
  return JSON.parse(match[0]);
}

export async function POST(req) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Server is missing ANTHROPIC_API_KEY. Add it to your .env.local file." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body request." }, { status: 400 });
  }

  const { action, post } = body || {};
  if (!post) {
    return NextResponse.json({ error: "Missing selected teaching post target." }, { status: 400 });
  }

  try {
    if (action === "ask") {
      const sys = SYSTEM_PROMPT_ASK.replace("{POST}", post);
      const result = await callClaude(sys, "Ask the first interview question.");
      return NextResponse.json(result);
    }

    if (action === "eval") {
      const { history, currentQuestion, answer, isLast } = body;
      const sys = SYSTEM_PROMPT_EVAL.replace("{POST}", post);
      const prompt =
        `Interview history so far:\n${historyAsText(history)}\n\n` +
        `Current question: ${currentQuestion}\nCandidate's answer: ${answer}\n\n` +
        (isLast
          ? "This is the FINAL question — set next_question to null."
          : "Ask a new next question on a different topic/angle.");
      const result = await callClaude(sys, prompt);
      return NextResponse.json(result);
    }

    if (action === "report") {
      const { history } = body;
      const sys = SYSTEM_PROMPT_REPORT.replace("{POST}", post);
      const prompt = `Full interview history:\n${historyAsText(history)}`;
      const result = await callClaude(sys, prompt);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (err) {
    console.error("Mock interview API route error:", err);
    return NextResponse.json(
      { error: err.message || "Couldn't reach the AI model. Please check your credentials and try again." },
      { status: 502 }
    );
  }
}