import type { ServiceCategory } from "./hero-slides";
import { normaliseIndianMobile } from "./validation";

export interface LeadResult {
  ok: boolean;
  configured: boolean;
  message: string;
  referenceId?: string;
}

async function readJsonSafe(res: Response): Promise<Record<string, unknown>> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export interface LeadPayload {
  name: string;
  whatsapp: string;
  email?: string;
  classLevel: string;
  service: ServiceCategory;
  slideId: string;
  source: string;
}

/** Direct submit — no OTP step. Clean integration boundary to /api/leads. */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        whatsapp: normaliseIndianMobile(payload.whatsapp),
        submittedAt: new Date().toISOString(),
        otpVerified: false,
      }),
    });
    const data = await readJsonSafe(res);
    if (res.status === 503 || data.configured === false) {
      return {
        ok: false,
        configured: false,
        message:
          typeof data.message === "string" && data.message
            ? data.message
            : "Enquiry storage is not connected yet, so your details were not saved. Please try again later.",
      };
    }
    if (!res.ok) {
      return {
        ok: false,
        configured: true,
        message:
          typeof data.message === "string" && data.message
            ? data.message
            : "Could not save your enquiry. Please try again.",
      };
    }
    return {
      ok: true,
      configured: true,
      referenceId:
        typeof data.referenceId === "string" ? data.referenceId : undefined,
      message:
        typeof data.message === "string" && data.message
          ? data.message
          : "Enquiry received. We will contact you on WhatsApp shortly.",
    };
  } catch {
    return {
      ok: false,
      configured: true,
      message: "Network error while saving your enquiry. Please try again.",
    };
  }
}
