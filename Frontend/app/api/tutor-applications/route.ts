import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

function isLeadsConfigured(): boolean {
  return Boolean(
    process.env.HUSTLE_LEADS_URL ||
      (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY),
  );
}

/**
 * Tutor applications. Accepts the registration form fields and forwards a
 * lead-shaped payload (extra detail folded into `source`) to the configured
 * sink. Document binaries are NOT stored here — file names/sizes travel in
 * `details`; the team collects the actual documents over WhatsApp during
 * verification.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const rawWhatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  const digits = rawWhatsapp.replace(/[^\d]/g, "");
  const whatsapp =
    digits.length === 12 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith("0")
        ? digits.slice(1)
        : digits;
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const details = typeof body.details === "string" ? body.details.trim() : "";

  if (!name || name.length < 2)
    return NextResponse.json({ message: "Full name is required." }, { status: 400 });
  if (!/^[6-9]\d{9}$/.test(whatsapp))
    return NextResponse.json(
      { message: "A valid mobile number is required." },
      { status: 400 },
    );
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return NextResponse.json({ message: "A valid email is required." }, { status: 400 });
  if (!details)
    return NextResponse.json(
      { message: "Registration details are missing." },
      { status: 400 },
    );

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

  const payload = {
    name,
    whatsapp,
    email,
    classLevel: "Tutor Registration",
    service: "tutor-application",
    slideId: "register",
    source: `tutor-registration | ${details}`.slice(0, 1000),
    submittedAt:
      typeof body.submittedAt === "string"
        ? body.submittedAt
        : new Date().toISOString(),
    otpVerified: false,
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
      { configured: true, message: "Could not save your registration. Try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    configured: true,
    message: "Registration received.",
    referenceId: randomUUID().slice(0, 8).toUpperCase(),
  });
}
