"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { problem: "Demos carry too much weight.", fix: "A clear video does the first 60 seconds of every call." },
  { problem: "Sales cycles stretch.", fix: "Buyers who understand your product close faster." },
  { problem: "Positioning weakens under pressure.", fix: "A locked narrative holds across every channel." },
  { problem: "Assets get made once and abandoned.", fix: "A motion system compounds across every launch." },
];

export default function Thesis() {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".thesis-line");
    if (!els) return;
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: isMobile ? "80px 20px" : "120px 28px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          display: "grid",
          // Stack on mobile, two columns on desktop
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "48px" : "80px",
          alignItems: "start",
        }}
      >
        {/* LEFT: THESIS STATEMENT */}
        <div>
          <h2
            className="thesis-line"
            style={{
              fontFamily: "var(--font-dm)",
              fontWeight: 800,
              fontSize: isMobile ? "clamp(32px, 9vw, 44px)" : "clamp(36px, 5vw, 60px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              margin: "0 0 24px 0",
              color: "#fff",
              opacity: 0,
            }}
          >
            <span style={{ fontWeight: 300 }}>Complexity is a</span>{" "}
            revenue bottleneck.
          </h2>

          <p
            className="thesis-line"
            style={{
              fontSize: isMobile ? "15px" : "15px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
              maxWidth: isMobile ? "100%" : "400px",
              margin: 0,
              opacity: 0,
            }}
          >
            When buyers can't understand your product quickly, every part of your go-to-market works harder than it should.
          </p>
        </div>

        {/* RIGHT: CONSEQUENCE LIST */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {items.map((item, i) => (
            <div
              key={i}
              className="thesis-line"
              style={{
                padding: "22px 0",
                borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                opacity: 0,
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.32)",
                  marginBottom: "6px",
                  lineHeight: 1.5,
                  textDecoration: "line-through",
                  textDecorationColor: "rgba(255,255,255,0.18)",
                  margin: "0 0 6px 0",
                }}
              >
                {item.problem}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.65,
                  margin: 0,
                  fontWeight: 450,
                }}
              >
                {item.fix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}