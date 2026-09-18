/* Contact details and form options, shared by the CTA, the form and the server action. */
export const EMAIL = "letscook@hypeman.in";
export const PHONE = "+91 8959174612";
export const PHONE_HREF = "tel:+918959174612";

export const SERVICES = [
  "Branding",
  "Logo",
  "Website",
  "App",
  "AI & automation",
  "SEO",
  "Card & print",
] as const;

export const BUDGETS = [
  "Under ₹25k",
  "₹25k to ₹75k",
  "₹75k to ₹2L",
  "₹2L and up",
  "Not sure yet",
] as const;

export type ContactValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
  budget: string;
};
export type ContactErrors = Partial<
  Record<"name" | "email" | "services" | "budget" | "message", string>
>;

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* One set of rules for the form (instant warnings) and the server action (the real check). */
export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!v.name) errors.name = "We need your name.";
  if (!v.email) errors.email = "We need your email to reply.";
  else if (!EMAIL_SHAPE.test(v.email)) errors.email = "That email looks off.";
  if (!v.services.length) errors.services = "Pick at least one.";
  if (!v.budget) errors.budget = "Pick a budget, a rough one is fine.";
  if (!v.message) errors.message = "Tell us what you have in mind.";
  else if (v.message.length < 10)
    errors.message = "Give us a little more to go on.";
  return errors;
}

/* Reads and trims the form the same way on both sides. */
export function readContact(form: FormData): ContactValues {
  const text = (key: string, max: number) => {
    const v = form.get(key);
    return (typeof v === "string" ? v : "").trim().slice(0, max);
  };
  const allowed = new Set<string>(SERVICES);
  const budget = text("budget", 40);
  return {
    name: text("name", 120),
    email: text("email", 254),
    phone: text("phone", 40),
    message: text("message", 4000),
    budget: (BUDGETS as readonly string[]).includes(budget) ? budget : "",
    services: form
      .getAll("services")
      .filter((s): s is string => typeof s === "string" && allowed.has(s)),
  };
}
