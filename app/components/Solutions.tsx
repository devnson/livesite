"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    number: "01",
    title: "Sales Enablement Video",
    desc: "Demo videos, case studies, and explainers that give your sales team something worth sending — and buyers something worth watching.",
    detail: "Avg. 14-day turnaround",
  },
  {
    number: "02",
    title: "Category Narrative",
    desc: "Brand films and vision videos that position you in a category of one. Not feature tours — story-first, emotion-led.",
    detail: "Script + production",
  },
  {
    number: "03",
    title: "Reusable Visual Library",
    desc: "A system of motion assets, icon animations, and UI walkthroughs you can repurpose across every channel.",
    detail: "12–20 assets per sprint",
  },
  {
    number: "04",
    title: "Launch Campaigns",
    desc: "Feature launch videos, product update content, and announcement visuals — timed to your roadmap, not ours.",
    detail: "Ships with your calendar",
  },
  {
    number: "05",
    title: "Motion Design System",
    desc: "2D and 3D animation in your brand language. Built once, used everywhere — ads, decks, social, product.",
    detail: "Brand-matched output",
  },
  {
    number: "06",
    title: "Embedded Retainer",
    desc: "A dedicated creative pod inside your team. Ongoing production capacity without the agency overhead.",
    detail: "Monthly engagement",
  },
];

export default function Solutions() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      }
    );

    const cards = cardsRef.current?.children;
    if (!cards) return;
    Array.from(cards).forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: (i % 3) * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        }
      );
    });
  }, []);

  return (
    <section
      id="solutions"
      style={{
        padding: "120px 24px",
        background: "#0d0d0d",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div ref={headerRef} style={{ marginBottom: "64px", opacity: 0 }}>
          <h2
            style={{
              fontFamily: "var(--font-dm)",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "600px",
              color: "#fff",
            }}
          >
            <span style={{ fontWeight: 300 }}>Six ways we make</span>{" "}
            complexity disappear.
          </h2>
        </div>

        {/* SOLUTION CARDS */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {solutions.map((s) => (
            <div
              key={s.number}
              className="rim-card"
              style={{
                background: "#080808",
                padding: "36px 32px",
                opacity: 0,
                transition: "background 0.3s, border-color 0.3s",
                cursor: "default",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                {/* was 0.2 — bumped to 0.45 */}
                <span
                  style={{
                    fontFamily: "var(--font-dm)",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.number}
                </span>

                {/* was 0.25 text, 0.07 border — bumped to 0.55 / 0.14 */}
                <span
                  className="rim-pill"
                  style={{
                    fontSize: "10.5px",
                    color: "rgba(255,255,255,0.55)",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  {s.detail}
                </span>
              </div>

              {/* was inheriting near-white — now explicit */}
              <h3
                style={{
                  fontFamily: "var(--font-dm)",
                  fontWeight: 700,
                  fontSize: "17px",
                  marginBottom: "12px",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  color: "rgba(255,255,255,0.94)",
                }}
              >
                {s.title}
              </h3>

              {/* was 0.45 — bumped to 0.72 */}
              <p
                style={{
                  fontSize: "13.5px",
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}