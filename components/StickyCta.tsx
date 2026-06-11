"use client";

import { useEffect, useRef, useState } from "react";
import { useRegistration } from "./RegistrationContext";

/**
 * Sticky mobile register bar, ported from the prototype's second inline
 * script: visible only while the user is between the hero and the register
 * section (and above the footer), reserving body padding so the fold never
 * hides behind it. Gone for good once the form is submitted.
 */
export default function StickyCta() {
  const { submitted } = useRegistration();
  const barRef = useRef<HTMLDivElement>(null);
  const [zones, setZones] = useState({ hero: true, reg: false, foot: false });

  const visible = !submitted && !zones.hero && !zones.reg && !zones.foot;

  useEffect(() => {
    if (submitted || !("IntersectionObserver" in window)) return;
    const hero = document.querySelector(".letter-wrap");
    const reg = document.getElementById("register");
    const foot = document.querySelector(".bfooter");
    const observer = new IntersectionObserver(
      (entries) => {
        setZones((prev) => {
          const next = { ...prev };
          entries.forEach((entry) => {
            if (entry.target === hero) next.hero = entry.isIntersecting;
            if (entry.target === reg) next.reg = entry.isIntersecting;
            if (entry.target === foot) next.foot = entry.isIntersecting;
          });
          return next;
        });
      },
      { threshold: 0 }
    );
    [hero, reg, foot].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [submitted]);

  useEffect(() => {
    document.body.style.paddingBottom =
      visible && barRef.current ? `${barRef.current.offsetHeight}px` : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  if (submitted) return null;

  return (
    <div ref={barRef} className={`mcta${visible ? " is-visible" : ""}`}>
      <div className="mcta__txt">
        <span className="mcta__lbl">Free Guest Spot</span>
        <span className="mcta__sub">Register by June 26</span>
      </div>
      <a className="hh-btn hh-btn--gold" href="#register">
        <span>Register</span>
      </a>
    </div>
  );
}
