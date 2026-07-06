export async function POST(req) {
  try {
    const lead = await req.json();

    // For now this just logs the lead so the request succeeds instead of 404ing.
    // Replace this with whatever you actually want to do with leads, e.g.:
    //  - send an email (Resend/SendGrid)
    //  - push to a Google Sheet webhook
    //  - save to a database
    console.log("LEAD RECEIVED:", lead);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return Response.json({ error: "Failed to save lead" }, { status: 500 });
  }
}