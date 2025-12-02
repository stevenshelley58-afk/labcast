import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;
const toEmail = process.env.RESEND_TO_EMAIL;

export async function POST(req: NextRequest) {
  if (!resendApiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email service is not configured. Missing RESEND_API_KEY, RESEND_FROM_EMAIL, or RESEND_TO_EMAIL.",
      },
      { status: 500 }
    );
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const data = body as {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
    source?: string;
  };

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();
  const website = (data.website || "").trim();
  const source = (data.source || "Website contact form").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `
Source: ${source}
Website: ${website || "N/A"}

Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error sending message" },
      { status: 500 }
    );
  }
}
