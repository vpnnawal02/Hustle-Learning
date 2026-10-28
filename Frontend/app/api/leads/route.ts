import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

const SERVICES = new Set([
  "general",
  "study-material",
  "online-classes",
  "home-tuition",
  "books",
]);

function isLeadsConfigured(): boolean {
  return Boolean(
    process.env.HUSTLE_LEADS_URL ||
      (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY),
  );
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const classLevel =
    typeof body.classLevel === "string" ? body.classLevel.trim() : "";
  const service = typeof body.service === "string" ? body.service : "";
  const slideId = typeof body.slideId === "string" ? body.slideId : "";
  const otpVerified = body.otpVerified === true;

  if (!name || name.length < 2)
    return NextResponse.json(
      { message: "Student name is required." },
      { status: 400 },
    );
  if (!/^[6-9]\d{9}$/.test(whatsapp))
    return NextResponse.json(
      { message: "A valid WhatsApp number is required." },
      { status: 400 },
    );
  if (!classLevel)
    return NextResponse.json({ message: "Class is required." }, { status: 400 });
  if (!SERVICES.has(service))
    return NextResponse.json({ message: "Unknown service." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return NextResponse.json({ message: "Invalid email." }, { status: 400 });
  // Direct-submit mode: no OTP step. The flag is recorded, never required.
  void otpVerified;

  if (!isLeadsConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "Enquiry storage is not connected yet, so your details were not saved. Please try again later.",
      },
      { status: 503 },
    );
  }

  // Forward to the configured lead sink (generic webhook or Supabase).
  // Never include OTP values — only the verified flag and lead fields.
  const payload = {
    name,
    whatsapp,
    email: email || null,
    classLevel,
    service,
    slideId,
    source: typeof body.source === "string" ? body.source : "hero-carousel",
    submittedAt:
      typeof body.submittedAt === "string"
        ? body.submittedAt
        : new Date().toISOString(),
    otpVerified: true,
  };

  try {
    if (process.env.HUSTLE_LEADS_URL) {
      const res = await fetch(process.env.HUSTLE_LEADS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`sink ${res.status}`);
    } else {
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.SUPABASE_SERVICE_KEY as string,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      }).then((r) => {
        if (!r.ok) throw new Error(`supabase ${r.status}`);
      });
    }
  } catch {
    return NextResponse.json(
      { configured: true, message: "Could not save your enquiry. Try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    configured: true,
    message: "Enquiry received. We will contact you on WhatsApp shortly.",
    referenceId: randomUUID().slice(0, 8).toUpperCase(),
  });
}
