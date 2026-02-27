"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Thesis() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".thesis-line");
    if (!els) return;
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "120px 28px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: "1160px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>

        {/* LEFT: THESIS STATEMENT */}
        <div>
          <h2
            className="thesis-line"
            style={{
              fontFamily: "var(--font-dm)",
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 60px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              margin: "0 0 32px 0",
              color: "#fff",
              opacity: 0,
            }}
          >
            <span style={{ fontWeight: 300 }}>Complexity is a</span>{" "}
            revenue bottleneck.
          </h2>
          {/* was 0.45 — bumped to 0.72 */}
          <p
            className="thesis-line"
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.8,
              maxWidth: "400px",
              opacity: 0,
            }}
          >
            When buyers can't understand your product quickly, every part of your go-to-market works harder than it should.
          </p>
        </div>

        {/* RIGHT: CONSEQUENCE LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            { problem: "Demos carry too much weight.", fix: "A clear video does the first 60 seconds of every call." },
            { problem: "Sales cycles stretch.", fix: "Buyers who understand your product close faster." },
            { problem: "Positioning weakens under pressure.", fix: "A locked narrative holds across every channel." },
            { problem: "Assets get made once and abandoned.", fix: "A motion system compounds across every launch." },
          ].map((item, i) => (
            <div
              key={i}
              className="thesis-line"
              style={{
                padding: "24px 0",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                opacity: 0,
              }}
            >
              {/* was 0.35 — bumped to 0.52 so it's readable as "problem" text */}
              <p style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.52)",
                marginBottom: "6px",
                lineHeight: 1.5,
                textDecoration: "line-through",
                textDecorationColor: "rgba(255,255,255,0.22)",
              }}>
                {item.problem}
              </p>
              {/* was 0.7 — bumped to 0.88 */}
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.88)", lineHeight: 1.6, margin: 0 }}>
                {item.fix}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}