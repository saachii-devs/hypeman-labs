"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import {
  readContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | {
      status: "error";
      message: string;
      fields?: ContactErrors;
      /* what was typed, handed back so the form can refill itself (React resets forms after an action) */
      values: ContactValues;
    };

/* Saves one "Write to us" message. Input is untrusted, so everything is re-validated here. */
export async function sendMessage(
  _prev: ContactState,
  form: FormData,
): Promise<ContactState> {
  // honeypot: real people never see this field, bots fill it in
  const company = form.get("company");
  if (typeof company === "string" && company.trim()) return { status: "sent" };

  const values = readContact(form);
  const { name, email, phone, message, services, budget } = values;
  const fields = validateContact(values);
  if (Object.keys(fields).length) {
    return {
      status: "error",
      message: "Fix the bits in red and try again.",
      fields,
      values,
    };
  }

  try {
    const { error } = await createAdminClient()
      .from("contact_messages")
      .insert({ name, email, phone: phone || null, services, budget, message });
    if (error) throw error;
  } catch (err) {
    console.error("contact form insert failed", err);
    return {
      status: "error",
      message: "That didn't send. Try again, or email us directly.",
      values,
    };
  }

  return { status: "sent" };
}
