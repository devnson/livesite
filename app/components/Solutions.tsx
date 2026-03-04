"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    number: "01",
    title: "Sales Enablement System",
    desc: "Structured product narratives, case-driven explainers, and pre-demo assets that reduce explanation load and move buyers forward before the call begins.",
    detail: "Standardized assets for every funnel stage",
  },
  {
    number: "02",
    title: "Category Narrative",
    desc: "Vision-led films and strategic story assets that position you beyond features, defining your category, framing your advantage, and aligning your market around your thesis.",
    detail: "Positioning + script + production",
  },
  {
    number: "03",
    title: "Reusable Visual Library",
    desc: "A modular motion asset system, UI walkthroughs, icon animations, transitions, and branded elements, built once and deployed across every GTM channel.",
    detail: "Multi-channel asset pack per sprint",
  },
  {
    number: "04",
    title: "Launch Velocity",
    desc: "Feature releases, product updates, and roadmap moments turned into structured motion drops, timed to your calendar and built to amplify adoption.",
    detail: "Ships with your product roadmap",
  },
  {
    number: "05",
    title: "Motion Design System",
    desc: "A defined 2D and 3D animation language for your brand, establishing consistency across ads, decks, landing pages, and product surfaces.",
    detail: "Brand-matched, repeatable framework",
  },
  {
    number: "06",
    title: "Embedded Retainer",
    desc: "A dedicated creative pod operating inside your team, consistent output, strategic alignment, and predictable production capacity.",
    detail: "Monthly strategic engagement",
  },
];

export default function Solutions() {
  const cardsRef  = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });

    const cards = cardsRef.current?.children;
    if (!cards) return;
    Array.from(cards).forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.6, delay: (i % 3) * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" } });
    });
  }, []);

  return (
    <section id="solutions" style={{
      padding: "120px 24px",
      background: "#0d0d0d",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* HEADER */}
        <div ref={headerRef} style={{ marginBottom: "64px", opacity: 0 }}>
          {/* HEADING — DM Sans */}
          <h2 style={{
            fontFamily: "var(--font-dm)", fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "-0.04em", lineHeight: 1.05,
            margin: 0, maxWidth: "600px", color: "#fff",
          }}>
            <span style={{ fontWeight: 300 }}>Six ways we make</span>{" "}
            complexity disappear.
          </h2>
        </div>

        {/* CARDS */}
        <div ref={cardsRef} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          {solutions.map((s) => (
            <div key={s.number} className="rim-card" style={{
              background: "#080808", padding: "36px 32px",
              opacity: 0, transition: "background 0.3s, border-color 0.3s", cursor: "default",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                {/* NUMBER — Bricolage */}
                <span style={{
                  fontFamily: "var(--font-bricolage)",
                  fontSize: "11px", color: "rgba(255,255,255,0.45)",
                  fontWeight: 300, letterSpacing: "0.1em",
                }}>
                  {s.number}
                </span>
                {/* DETAIL PILL — Bricolage */}
                <span className="rim-pill" style={{
                  fontFamily: "var(--font-bricolage)",
                  fontSize: "10.5px", color: "rgba(255,255,255,0.55)",
                  fontWeight: 300,
                  padding: "3px 10px", borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.05)",
                }}>
                  {s.detail}
                </span>
              </div>

              {/* CARD TITLE — DM Sans */}
              <h3 style={{
                fontFamily: "var(--font-dm)", fontWeight: 700,
                fontSize: "17px", marginBottom: "12px",
                letterSpacing: "-0.04em", lineHeight: 1.3,
                color: "rgba(255,255,255,0.94)",
              }}>
                {s.title}
              </h3>

              {/* DESC — Bricolage */}
              <p style={{
                fontFamily: "var(--font-bricolage)",
                fontSize: "13.5px", fontWeight: 300,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.7, margin: 0,
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}