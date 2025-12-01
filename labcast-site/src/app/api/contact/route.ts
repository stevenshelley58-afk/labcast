import { NextResponse } from "next/server";

const endpoint = process.env.FORMSPREE_ENDPOINT;

export async function POST(request: Request) {
  const data = await request.formData();
  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const website = data.get("website")?.toString().trim();
  const message = data.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!endpoint) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        website,
        message,
        source: "labcast.com.au",
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(body || "Upstream form endpoint failed.");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send your message right now.",
      },
      { status: 500 }
    );
  }
}
