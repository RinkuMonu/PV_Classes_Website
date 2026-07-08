// No SDK package needed — Groq exposes an OpenAI-compatible REST endpoint,
// so we just use fetch() directly. Set GROQ_API_KEY in your .env.local.

const COMPANY_NAME = "PV Classes";
const COMPANY_EMAIL = "info@pvclasses.in";
const COMPANY_PHONE = "+91-XXXXXXXXXX";

// Pick any current Groq-hosted model. llama-3.3-70b-versatile is a solid
// general-purpose choice; swap if you prefer a different one.
const GROQ_MODEL = "llama-3.3-70b-versatile";

function buildSystemPrompt(knowledge) {
  const knowledgeText = (knowledge || [])
    .map((k) => `- ${k.answer}`)
    .join("\n");

  return `You are Prachi, the friendly admissions assistant for ${COMPANY_NAME}, a coaching institute offering school Foundation courses (8th-10th) and JEE/NEET preparation (11th-12th & droppers) in Physics, Chemistry, Maths, and Biology, both online and offline.

Answer questions briefly, warmly, and helpfully — like a knowledgeable admissions counsellor texting a prospective student or parent. Keep replies under ~80 words unless more detail is clearly needed.

Use this information about ${COMPANY_NAME} as your source of truth:
${knowledgeText}

If you don't know something specific (exact fees, exact addresses, exact schedules), say so honestly and direct them to email ${COMPANY_EMAIL} or call ${COMPANY_PHONE}, or offer to have a counsellor call them.

Never make up exact prices, dates, or guarantees of results/ranks. Do not discuss topics unrelated to ${COMPANY_NAME}'s courses and admissions — politely redirect back to how you can help with their studies/admission instead.`;
}

export async function POST(req) {
  try {
    const { question, lead, knowledge } = await req.json();

    if (!question || typeof question !== "string") {
      return Response.json({ error: "Missing question" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set in environment variables");
      return Response.json(
        { error: "Server not configured", reply: null },
        { status: 500 }
      );
    }

    const leadContext = lead?.name
      ? `\n\nContext about this visitor: name=${lead.name || "?"}, class=${lead.standard || "?"}, subject interest=${lead.subject || "?"}, mode=${lead.mode || "?"}.`
      : "";

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 400,
        messages: [
          { role: "system", content: buildSystemPrompt(knowledge) + leadContext },
          { role: "user", content: question },
        ],
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errText);
      return Response.json(
        { error: "AI service unavailable", reply: null },
        { status: 502 }
      );
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content || "";

    return Response.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Failed to get a response", reply: null },
      { status: 500 }
    );
  }
}