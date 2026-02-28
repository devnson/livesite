"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const studies = [
  {
    slug: "securitypal-case",
    client: "SecurityPal",
    subject: "Positioning Film",
    industry: "Security",
    type: "Positioning Film",
    headline: "Explaining a complex security assurance platform in under 90 seconds.",
    outcome: "Positioning film → website + sales",
    thumb: "https://img.youtube.com/vi/azDJfHvwpEY/maxresdefault.jpg",
    color: "#101418",
    year: "2024",
  },
  {
    slug: "securitypal-case",
    client: "SecurityPal",
    subject: "2025 Year in Review",
    industry: "Security",
    type: "Brand Film",
    headline: "Capturing a full year of momentum in a single brand film.",
    outcome: "Year in review → brand + team",
    thumb: "https://img.youtube.com/vi/yTIf7xgYBtE/maxresdefault.jpg",
    color: "#0d1218",
    year: "2025",
  },
  {
    slug: "docunlock-case",
    client: "DocUnlock",
    subject: "Feature Launch",
    industry: "TradeOps",
    type: "Explainer",
    headline: "Making customs automation immediately legible for brokers and freight-forwarders.",
    outcome: "Feature walkthrough → landing + sales enablement",
    thumb: "https://img.youtube.com/vi/0WjL6oWzHUg/maxresdefault.jpg",
    color: "#0d1018",
    year: "2024",
  },
  {
    slug: "aleph-case",
    client: "Aleph",
    subject: "Series B Announcement",
    industry: "Fintech",
    type: "Launch Film",
    headline: "Authority-first funding announcement built for investors, press, and future hires.",
    outcome: "Series B film → press + hiring + investors",
    thumb: "https://img.youtube.com/vi/7sbP3rOhPec/maxresdefault.jpg",
    color: "#0d1018",
    year: "2025",
  },
];

const ALL_FILTERS = ["All", "Security", "Fintech", "TradeOps"];

export default function CaseStudiesPage() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const [cols, setCols] = useState<number>(2);

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = active === "All" ? studies : studies.filter((s) => s.industry === active);

  useEffect(() => {
    const calc = () => setCols(window.innerWidth <= 640 ? 1 : 2);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    headerRef.current?.querySelectorAll(".h-el").forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out" });
    });
  }, []);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".cs-card");
    items?.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.55,
        delay: (i % Math.max(1, cols)) * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });
  }, [active, cols]);

  const isMobile = cols === 1;

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-dm), system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 28px",
        height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,10,10,0.88)",
        backdropFilter: "blur(12px)",
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="18" height="18" viewBox="0 0 406 335" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M71.211 258.453L71.211 163.678L71.211 87.162C71.211 74.4614 83.7004 67.488 92.7003 72.6307L152.706 107.171L152.706 265.423L130.571 269.742L130.572 276.101L152.706 271.472L162.723 269.375L274.349 246.21V335.3L152.393 334.675C101.22 334.675 71.211 290.544 71.211 258.453Z" fill="rgba(255,255,255,0.75)" />
            <path d="M213.42 193.732L161.703 223.687L161.821 163.659L165.881 161.265C167.856 163.644 169.986 165.935 172.271 168.125C184.107 179.473 198.472 186.554 213.462 189.409L213.42 193.732Z" fill="rgba(255,255,255,0.75)" />
          </svg>
          <span style={{ fontSize: "13px", fontWeight: 800, color: "rgba(255,255,255,0.75)", letterSpacing: "-0.01em" }}>Tanosei</span>
          <span style={{ fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.25)", letterSpacing: "0.02em" }}>Studio</span>
        </Link>

        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "12.5px", color: "rgba(255,255,255,0.38)",
            textDecoration: "none", fontWeight: 500,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to home
        </Link>
      </nav>

      <div style={{ padding: "100px 28px 140px", maxWidth: "1100px", margin: "0 auto" }}>

        {/* HEADER */}
        <div ref={headerRef} style={{ marginBottom: "64px" }}>
          <p className="h-el" style={{ opacity: 0, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontWeight: 500, marginBottom: "20px" }}>
            Case Studies
          </p>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", marginBottom: "40px" }}>
            <h1 className="h-el" style={{ opacity: 0, fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "clamp(36px, 6vw, 72px)", letterSpacing: "-0.04em", lineHeight: 1.0, margin: 0 }}>
              <span style={{ fontWeight: 300 }}>The brief, the build,</span>
              <br />
              and the outcome.
            </h1>

            <p className="h-el" style={{ opacity: 0, fontSize: "14px", color: "rgba(255,255,255,0.28)", margin: 0, textAlign: "right", lineHeight: 1.7, maxWidth: "240px" }}>
              Behind every project — the strategy, the creative, and what shipped.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="h-el" style={{ opacity: 0, display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {ALL_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "999px",
                  border: active === f ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  background: active === f ? "rgba(255,255,255,0.08)" : "transparent",
                  color: active === f ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.32)",
                  fontSize: "12.5px",
                  fontWeight: active === f ? 600 : 400,
                  fontFamily: "var(--font-dm)",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => {
                  if (active !== f) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== f) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.32)";
                  }
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: isMobile ? "12px" : "2px",
          }}
        >
          {filtered.map((s, i) => {
            const isHov = hovered === `${s.slug}-${i}`;
            const col = i % cols;
            const totalRows = Math.ceil(filtered.length / Math.max(1, cols));
            const isLastRow = Math.floor(i / Math.max(1, cols)) === totalRows - 1;

            let radius = "0";
            if (i === 0) radius = "14px 0 0 0";
            else if (cols > 1 && i === cols - 1) radius = "0 14px 0 0";
            else if (isLastRow && col === 0 && cols > 1) radius = "0 0 0 14px";
            else if (isLastRow && col === cols - 1) radius = "0 0 14px 0";
            else if (cols === 1 && i === filtered.length - 1) radius = "0 0 14px 14px";

            return (
              <Link
                key={`${s.slug}-${i}`}
                href={`/case-studies/${s.slug}`}
                className="cs-card"
                style={{
                  opacity: 0,
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: radius,
                  overflow: "hidden",
                  borderRight: col < cols - 1 ? "none" : "1px solid rgba(255,255,255,0.07)",
                  borderBottom: isLastRow ? "1px solid rgba(255,255,255,0.07)" : "none",
                  background: isHov ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.01)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={() => setHovered(`${s.slug}-${i}`)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Thumbnail */}
                <div style={{
                  width: "100%",
                  aspectRatio: isMobile ? "16 / 9" : "16 / 8",
                  background: s.color,
                  position: "relative",
                  overflow: "hidden",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <img
                    src={s.thumb}
                    alt={s.client}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: isHov ? 0.82 : 0.62,
                      transform: isHov ? "scale(1.03)" : "scale(1)",
                      transition: "opacity 0.35s ease, transform 0.5s ease",
                      display: "block",
                    }}
                    onError={(e) => {
                      // fallback to hqdefault if maxresdefault unavailable
                      const el = e.currentTarget as HTMLImageElement;
                      if (el.src.includes("maxresdefault")) {
                        el.src = el.src.replace("maxresdefault", "hqdefault");
                      }
                    }}
                  />

                  {/* Tags overlay */}
                  {!isMobile && (
                    <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", gap: "6px" }}>
                      {[s.industry, s.type].map((tag) => (
                        <span key={tag} style={{ fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <span style={{ position: "absolute", top: "14px", right: "14px", fontSize: "10px", color: "rgba(255,255,255,0.35)", fontWeight: 500, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", padding: "2px 7px", borderRadius: "4px" }}>{s.year}</span>

                  {/* Play icon hint */}
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: isHov ? 1 : 0,
                    transition: "opacity 0.25s",
                  }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="13" height="15" viewBox="0 0 14 16" fill="none">
                        <path d="M0 0L14 8 0 16z" fill="rgba(255,255,255,0.9)" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: isMobile ? "20px 18px 22px" : "24px 28px 28px" }}>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>
                    {s.client} — {s.subject}
                  </p>

                  {isMobile && (
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                      {[s.industry, s.type].map((tag) => (
                        <span key={tag} style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", padding: "6px 10px", borderRadius: "999px" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: isMobile ? "18px" : "17px", letterSpacing: "-0.02em", lineHeight: isMobile ? 1.5 : 1.45, margin: "0 0 14px", color: isHov ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.68)", transition: "color 0.2s" }}>
                    {s.headline}
                  </h2>

                  <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: "12px" }}>
                    <p style={{ fontSize: isMobile ? "13px" : "12px", color: "rgba(255,255,255,0.25)", margin: 0, lineHeight: 1.55 }}>{s.outcome}</p>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.42)", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", opacity: isMobile ? 1 : isHov ? 1 : 0, transition: "opacity 0.2s", marginTop: isMobile ? "2px" : 0 }}>
                      Read case study
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div style={{ marginTop: "80px", paddingTop: "48px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.02em", margin: "0 0 6px", fontFamily: "var(--font-dm)" }}>Want results like these?</p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.28)", margin: 0 }}>Book a call. We'll scope the right format in 30 minutes.</p>
          </div>
          <a
            href="https://cal.com/tanoseihito/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "14px", padding: "12px 12px 12px 22px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", textDecoration: "none", transition: "all 0.25s ease", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
          >
            <span style={{ fontFamily: "var(--font-dm)", fontSize: "13.5px", fontWeight: 700, color: "rgba(255,255,255,0.65)", whiteSpace: "nowrap" }}>Book a Clarity Call</span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.78)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

      </div>
    </div>
  );
}