import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const toEmail = process.env.SCORE_TO_EMAIL || "pondicherry0712@gmail.com";

  if (!gmailUser || !gmailPass) {
    return new Response("Missing email configuration.", { status: 500 });
  }

  let body: { score: number; total: number; verdict?: string } | null = null;
  try {
    body = await req.json();
  } catch {
    // ignore
  }

  if (!body || typeof body.score !== "number" || typeof body.total !== "number") {
    return new Response("Invalid payload.", { status: 400 });
  }

  const subject = `Heretic Quiz Score: ${body.score}/${body.total}`;
  const verdictLine = body.verdict ? `Verdict: ${body.verdict}` : "Verdict: N/A";
  const text = `Score: ${body.score}/${body.total}\n${verdictLine}`;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2>Heretic Quiz Score</h2>
      <p><strong>Score:</strong> ${body.score}/${body.total}</p>
      <p><strong>Verdict:</strong> ${body.verdict || "N/A"}</p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  try {
    await transporter.sendMail({
      from: gmailUser,
      to: toEmail,
      subject,
      text,
      html,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email send failed.";
    return new Response(message, { status: 502 });
  }

  return new Response("OK", { status: 200 });
}
