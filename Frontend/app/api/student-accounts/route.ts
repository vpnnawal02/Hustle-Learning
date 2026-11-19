import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

function isLeadsConfigured(): boolean {
  return Boolean(
    process.env.HUSTLE_LEADS_URL ||
      (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY),
  );
}

const CLASSES = new Set([
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
]);

const BOARDS = new Set(["CBSE", "ICSE", "State Board", "Other"]);

/**
 * Student accounts (v1). Registration requests are validated and forwarded
 * to the configured lead sink for manual provisioning. There is no
 * credential store yet, so login / password-reset return a pending notice.
 * Passwords are NEVER stored or forwarded.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const mode = body.mode === "login" || body.mode === "forgot" ? body.mode : "register";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );

  if (mode === "login") {
    return NextResponse.json({
      ok: false,
      pending: true,
      message:
        "Student login is opening soon. Register to request your account — our team will activate it and share sign-in details on WhatsApp.",
    });
  }

  if (mode === "forgot") {
    return NextResponse.json({
      ok: false,
      pending: true,
      message:
        "Password reset will be available with student accounts at launch. If you registered this email, our team will help you on WhatsApp.",
    });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  const classLevel = typeof body.classLevel === "string" ? body.classLevel : "";
  const board = typeof body.board === "string" ? body.board : "";

  if (!name || name.length < 2)
    return NextResponse.json(
      { message: "Please enter the student's full name." },
      { status: 400 },
    );
  if (!CLASSES.has(classLevel))
    return NextResponse.json({ message: "Please select a class." }, { status: 400 });
  if (!BOARDS.has(board))
    return NextResponse.json({ message: "Please select a board." }, { status: 400 });
  if (!/^[6-9]\d{9}$/.test(whatsapp))
    return NextResponse.json(
      { message: "Enter a valid 10-digit mobile number." },
      { status: 400 },
    );

  if (!isLeadsConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "Enquiry storage is not connected yet, so your request was not saved. Please try again later.",
      },
      { status: 503 },
    );
  }

  const payload = {
    name,
    whatsapp,
    email,
    classLevel,
    service: "student-registration",
    slideId: "register",
    source: `student-registration | Board: ${board} (password set by user, not stored)`,
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
      { configured: true, message: "Could not save your request. Try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    configured: true,
    message: "Account request received.",
    referenceId: randomUUID().slice(0, 8).toUpperCase(),
  });
}
