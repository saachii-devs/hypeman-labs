"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useActionState, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import {
  BUDGETS,
  EMAIL,
  SERVICES,
  readContact,
  validateContact,
  type ContactErrors,
} from "@/lib/contact";

const POP: [number, number, number, number] = [0.2, 1.3, 0.4, 1];
const FOCUSABLE =
  "a[href], button:not([disabled]), input:not([type=hidden]):not([tabindex='-1']), textarea";

/* The "Write to us" CTA plus the form it opens. */
export function WriteToUs() {
  const [open, setOpen] = useState(false);
  /* the portal only mounts after the first click, so the server render and hydration never see it */
  const [used, setUsed] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  const show = () => {
    setUsed(true);
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        data-hover="WRITE"
        aria-haspopup="dialog"
        onClick={show}
      >
        Write to us
      </button>
      {/* portalled to <body>: the CTA's reveal transform would otherwise trap position: fixed */}
      {used &&
        createPortal(
          <AnimatePresence>
            {open && <Dialog onClose={close} />}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function Dialog({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendMessage,
    { status: "idle" },
  );
  /* warnings from the instant check on "Send it"; null once the form has passed it */
  const [local, setLocal] = useState<ContactErrors | null>(null);
  const errors = local ?? (state.status === "error" ? state.fields : undefined);

  /* stop the send and flag what's missing, without a trip to the server */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const found = validateContact(readContact(new FormData(e.currentTarget)));
    const first = (
      ["name", "email", "services", "budget", "message"] as const
    ).find((k) => found[k]);
    if (!first) return setLocal(null);
    e.preventDefault();
    setLocal(found);
    e.currentTarget.querySelector<HTMLElement>(`[name=${first}]`)?.focus();
  };
  /* once warnings are showing, clear each one as soon as it's fixed */
  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    if (local)
      setLocal(validateContact(readContact(new FormData(e.currentTarget))));
  };
  const values = state.status === "error" ? state.values : undefined;

  /* lock the page behind, focus the first field, keep Tab inside, Esc closes */
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el.querySelector<HTMLElement>("input[name=name]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const items = [...el.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <m.div
      className="wtu-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <m.div
        ref={panel}
        className="wtu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wtu-title"
        initial={
          reduce ? false : { opacity: 0, y: 40, rotate: -2, scale: 0.96 }
        }
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.45, ease: POP }}
      >
        <button
          type="button"
          className="wtu-close"
          aria-label="Close"
          data-hover="CLOSE"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        {state.status === "sent" ? (
          <div className="wtu-sent" role="status">
            <p className="wtu-kicker">message received</p>
            <h3 id="wtu-title" className="wtu-title">
              Sent. <span>Let&apos;s cook.</span>
            </h3>
            <p className="wtu-lede">
              We reply faster than your situationship. Keep an eye on your
              inbox.
            </p>
            <button
              type="button"
              className="wtu-send"
              data-hover="OK"
              onClick={onClose}
            >
              Back to the site
            </button>
          </div>
        ) : (
          <form
            action={action}
            onSubmit={onSubmit}
            onChange={onChange}
            noValidate
          >
            <p className="wtu-kicker">holla at us</p>
            <h3 id="wtu-title" className="wtu-title">
              Write <span>to us</span>
            </h3>

            <div className="wtu-row">
              <Field
                label="Your name"
                name="name"
                autoComplete="name"
                defaultValue={values?.name}
                error={errors?.name}
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={values?.email}
                error={errors?.email}
                required
              />
            </div>
            <Field
              label="Phone (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue={values?.phone}
            />

            <fieldset
              className={`wtu-chips${errors?.services ? " bad" : ""}`}
              aria-describedby={
                errors?.services ? "wtu-err-services" : undefined
              }
            >
              <legend>
                What do you need? <i aria-hidden="true">*</i>
              </legend>
              {SERVICES.map((s) => (
                <label key={s} data-hover="PICK">
                  <input
                    type="checkbox"
                    name="services"
                    value={s}
                    defaultChecked={values?.services.includes(s)}
                  />
                  <span>{s}</span>
                </label>
              ))}
              {errors?.services && (
                <em id="wtu-err-services">{errors.services}</em>
              )}
            </fieldset>

            <fieldset
              className={`wtu-chips${errors?.budget ? " bad" : ""}`}
              aria-describedby={errors?.budget ? "wtu-err-budget" : undefined}
            >
              <legend>
                Your budget <i aria-hidden="true">*</i>
              </legend>
              {BUDGETS.map((b) => (
                <label key={b} data-hover="PICK">
                  <input
                    type="radio"
                    name="budget"
                    value={b}
                    defaultChecked={values?.budget === b}
                    required
                  />
                  <span>{b}</span>
                </label>
              ))}
              {errors?.budget && <em id="wtu-err-budget">{errors.budget}</em>}
            </fieldset>

            <label className={`wtu-field${errors?.message ? " bad" : ""}`}>
              <span>
                Tell us about it <i aria-hidden="true">*</i>
              </span>
              <textarea
                name="message"
                rows={4}
                required
                defaultValue={values?.message}
                aria-invalid={errors?.message ? true : undefined}
                aria-describedby={
                  errors?.message ? "wtu-err-message" : undefined
                }
              />
              {errors?.message && (
                <em id="wtu-err-message">{errors.message}</em>
              )}
            </label>

            {/* honeypot, hidden from people and assistive tech */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="wtu-hp"
            />

            <div className="wtu-foot">
              <p role="alert">
                {errors && Object.keys(errors).length > 0 ? (
                  "Fill in the bits in red, then send again."
                ) : state.status === "error" ? (
                  <>
                    {state.message}{" "}
                    <a href={`mailto:${EMAIL}`} data-hover="MAIL">
                      {EMAIL}
                    </a>
                  </>
                ) : null}
              </p>
              <button
                type="submit"
                className="wtu-send"
                data-hover="SEND"
                disabled={pending}
              >
                {pending ? "Sending…" : "Send it"}
              </button>
            </div>
          </form>
        )}
      </m.div>
    </m.div>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
};

function Field({ label, name, error, ...input }: FieldProps) {
  return (
    <label className={`wtu-field${error ? " bad" : ""}`}>
      <span>
        {label} {input.required && <i aria-hidden="true">*</i>}
      </span>
      <input
        type="text"
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `wtu-err-${name}` : undefined}
        {...input}
      />
      {error && <em id={`wtu-err-${name}`}>{error}</em>}
    </label>
  );
}
