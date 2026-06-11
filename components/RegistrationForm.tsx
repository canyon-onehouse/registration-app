"use client";

import { useEffect, useRef, useState } from "react";
import { useRegistration } from "./RegistrationContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Formspree form IDs are public by design (they ship in the page source),
// so the live form's ID is the baked-in default; the env var overrides it
// (e.g. to point staging at a different form).
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${
  process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "mykadjwp"
}`;

type FieldName = "name" | "email" | "phone" | "affiliation" | "privacy";
const FIELD_ORDER: FieldName[] = [
  "name",
  "email",
  "phone",
  "affiliation",
  "privacy",
];

type Errors = Partial<Record<FieldName, boolean>>;
type Status = "idle" | "submitting" | "success" | "error";

export default function RegistrationForm() {
  const { setSubmitted } = useRegistration();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("friend");

  const successRef = useRef<HTMLDivElement>(null);

  const clearError = (name: FieldName) =>
    setErrors((prev) => (prev[name] ? { ...prev, [name]: false } : prev));

  useEffect(() => {
    if (status === "success" && successRef.current) {
      const top =
        successRef.current.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Errors = {
      name: !String(data.get("name") ?? "").trim(),
      email: !EMAIL_RE.test(String(data.get("email") ?? "").trim()),
      phone: !String(data.get("phone") ?? "").trim(),
      affiliation: !String(data.get("affiliation") ?? "").trim(),
      privacy: !data.get("privacy"),
    };
    setErrors(next);

    const firstBad = FIELD_ORDER.find((name) => next[name]);
    if (firstBad) {
      // Wait a frame so the error text is painted before measuring.
      requestAnimationFrame(() => {
        const el = form.querySelector(`[data-field="${firstBad}"]`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      const name = String(data.get("name") ?? "").trim();
      setFirstName(name.split(/\s+/)[0] || "friend");
      setStatus("success");
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  }

  const inputClass = (name: FieldName) =>
    `rf__input${errors[name] ? " is-error" : ""}`;
  const errClass = (name: FieldName) =>
    `rf__err${errors[name] ? " show" : ""}`;

  if (status === "success") {
    return (
      <form className="rf is-submitted" noValidate>
        <div className="rf__success show" ref={successRef}>
          <div className="rf__success-mark"></div>
          <span className="eyebrow">You&rsquo;re On The Tee</span>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 28,
              margin: 0,
            }}
          >
            Thank you, <span data-success-name>{firstName}</span>.
          </h3>
          <p style={{ maxWidth: 440 }}>
            I&rsquo;ve got your registration, and I couldn&rsquo;t be more glad you&rsquo;re
            joining us. We&rsquo;ll be in touch with your team placement before June
            26. See you at Canebrake.
          </p>
          <p
            style={{
              fontFamily: "var(--font-marquee)",
              fontStyle: "italic",
              fontSize: 22,
              color: "var(--color-green-700)",
              margin: 0,
            }}
          >
            — Bo
          </p>
        </div>
      </form>
    );
  }

  return (
    <form className="rf" noValidate onSubmit={handleSubmit}>
      <div className="rf__body">
        <input
          type="hidden"
          name="_subject"
          value="New guest registration — Huntsville Hope Classic"
        />
        {/* Honeypot: humans never see it; bots that fill it are discarded by Formspree */}
        <input
          type="text"
          name="_gotcha"
          className="rf__gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <div className="rf__row">
          <div className="rf__field" data-field="name">
            <label className="rf__label" htmlFor="b-name">
              Full Name
            </label>
            <input
              className={inputClass("name")}
              id="b-name"
              name="name"
              type="text"
              placeholder="First and last name"
              autoComplete="name"
              onInput={() => clearError("name")}
            />
            <span className={errClass("name")}>Please enter your name.</span>
          </div>
          <div className="rf__field" data-field="email">
            <label className="rf__label" htmlFor="b-email">
              Email
            </label>
            <input
              className={inputClass("email")}
              id="b-email"
              name="email"
              type="email"
              inputMode="email"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="you@email.com"
              autoComplete="email"
              onInput={() => clearError("email")}
            />
            <span className={errClass("email")}>
              Please enter a valid email.
            </span>
          </div>
        </div>
        <div className="rf__row">
          <div className="rf__field" data-field="phone">
            <label className="rf__label" htmlFor="b-phone">
              Mobile Phone
            </label>
            <input
              className={inputClass("phone")}
              id="b-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="(256) 555-0142"
              autoComplete="tel"
              onInput={() => clearError("phone")}
            />
            <span className={errClass("phone")}>
              Please enter a phone number.
            </span>
          </div>
          <div className="rf__field" data-field="affiliation">
            <label className="rf__label" htmlFor="b-aff">
              Affiliation
            </label>
            <select
              className={`rf__select${errors.affiliation ? " is-error" : ""}`}
              id="b-aff"
              name="affiliation"
              defaultValue=""
              onChange={() => clearError("affiliation")}
            >
              <option value="" disabled>
                Select one
              </option>
              <option>NFL Alumni Association</option>
              <option>NFL Players Association (NFLPA)</option>
              <option>Former NFL Player</option>
              <option>Coach / Staff / Front Office</option>
              <option>Other</option>
            </select>
            <span className={errClass("affiliation")}>
              Please select your affiliation.
            </span>
          </div>
        </div>
        <div className="rf__field">
          <label className="rf__label" htmlFor="b-team">
            Team(s) &amp; Era <span className="opt">— optional</span>
          </label>
          <input
            className="rf__input"
            id="b-team"
            name="team"
            type="text"
            placeholder="e.g. San Diego Chargers, 1974–1979"
          />
        </div>

        <div className="rf__privacy" data-field="privacy">
          <div className="rf__privacy-head">
            <span className="eyebrow">Recognition &amp; Privacy</span>
          </div>
          <p className="rf__privacy-note">
            No one is required to be publicly mentioned. You&rsquo;re welcome to
            join and stay completely anonymous — just tell us your preference
            and we&rsquo;ll honor it.
          </p>
          <div className="rf__choices">
            <label className="rf__choice">
              <input
                type="radio"
                name="privacy"
                value="recognize"
                onChange={() => clearError("privacy")}
              />
              <span className="rf__radio"></span>
              <span className="rf__choice-txt">
                <span className="rf__choice-title">Happy to be recognized</span>
                <span className="rf__choice-sub">
                  You may list my name and use my likeness in event materials.
                </span>
              </span>
            </label>
            <label className="rf__choice">
              <input
                type="radio"
                name="privacy"
                value="anonymous"
                onChange={() => clearError("privacy")}
              />
              <span className="rf__radio"></span>
              <span className="rf__choice-txt">
                <span className="rf__choice-title">
                  Please keep me anonymous
                </span>
                <span className="rf__choice-sub">
                  I&rsquo;d like to attend without any public mention. Don&rsquo;t list
                  my name.
                </span>
              </span>
            </label>
          </div>
          <span className={errClass("privacy")}>
            Please choose a preference.
          </span>
        </div>

        <div className="rf__field">
          <label className="rf__label" htmlFor="b-notes">
            A note for Bo <span className="opt">— optional</span>
          </label>
          <textarea
            className="rf__textarea"
            id="b-notes"
            name="notes"
            placeholder="Dietary needs, a guest you're bringing, club rentals, or just say hello."
          ></textarea>
        </div>

        <button
          className="hh-btn hh-btn--gold rf__submit"
          type="submit"
          disabled={status === "submitting"}
        >
          <span>
            {status === "submitting" ? "Sending…" : "Confirm My Guest Spot"}
          </span>
        </button>
        {status === "error" && (
          <p className="rf__submit-err show" role="alert">
            Something went wrong and your registration didn&rsquo;t send. Please
            try again, or email{" "}
            <a href="mailto:bo@onehouseproject.com">bo@onehouseproject.com</a>{" "}
            and we&rsquo;ll get you on the list.
          </p>
        )}
        <p className="rf__fineprint">
          Free to register · Please reply by June 26, 2026 · Questions?{" "}
          <a className="linklike" href="mailto:bo@onehouseproject.com">
            bo@onehouseproject.com
          </a>
        </p>
      </div>
    </form>
  );
}
