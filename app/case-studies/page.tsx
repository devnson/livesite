"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── CASE STUDY DATA ── START ──
// slug must match the filename in app/case-studies/[slug]/page.tsx
const studies = [
  {
    slug: "thera-oceans",
    client: "Thera",
    subject: "Oceans",
    industry: "Fintech",
    type: "Case Study",
    headline: "How Oceans uses Thera to pay a global team without the ops overhead.",
    outcome: "Customer story → sales cycle acceleration",
    thumb: "", // "/case-studies/thera-oceans.jpg"
    color: "#0d1210",
    year: "2024",
  },
  {
    slug: "thera-coldiq",
    client: "Thera",
    subject: "ColdIQ",
    industry: "Fintech",
    type: "Case Study",
    headline: "How ColdIQ scaled international contractor payments without finance complexity.",
    outcome: "Customer story → outbound + sales",
    thumb: "",
    color: "#0d1210",
    year: "2024",
  },
  {
    slug: "thera-workweek",
    client: "Thera",
    subject: "WorkWeek",
    industry: "HR Tech",
    type: "Case Study",
    headline: "How WorkWeek simplified global payroll as they scaled their media team.",
    outcome: "Customer story → website + sales enablement",
    thumb: "",
    color: "#0d1210",
    year: "2024",
  },
  {
    slug: "securitypal-platform",
    client: "SecurityPal",
    subject: "Platform Overview",
    industry: "Security",
    type: "Explainer",
    headline: "Explaining a complex security assurance platform in under 90 seconds.",
    outcome: "Platform explainer → website + sales",
    thumb: "",
    color: "#101418",
    year: "2024",
  },
  {
    slug: "ramp-launch",
    client: "Ramp",
    subject: "Feature Launch",
    industry: "Fintech",
    type: "Launch Film",
    headline: "Making a new Ramp feature immediately legible for finance teams.",
    outcome: "Feature launch → landing + sales enablement",
    thumb: "",
    color: "#1a1410",
    year: "2024",
  },
  {
    slug: "julius-analytics",
    client: "Julius",
    subject: "Analytics Platform",
    industry: "AI",
    type: "Explainer",
    headline: "Turning a dense AI analytics product into a clear buyer conversation.",
    outcome: "Platform clarity → sales + marketing",
    thumb: "",
    color: "#0d0d18",
    year: "2024",
  },
];
// ── CASE STUDY DATA ── END ──

const ALL_FILTERS = ["All", "Fintech", "HR Tech", "Security", "AI"];

function PremiumCTAButton() {
  const [hov, setHov] = useState(false);

  return (
    <a
      href="https://cal.com/tanoseihito/30min"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "14px",
        padding: "12px 12px 12px 22px",
        borderRadius: "999px",
        border: `1px solid ${hov ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)"}`,
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        textDecoration: "none",
        transition: "all 0.25s ease",
        boxShadow: hov ? "0 0 28px 6px rgba(255,255,255,0.07)" : "none",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm)",
          fontSize: "13.5px",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: hov ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.65)",
          transition: "color 0.25s ease",
          whiteSpace: "nowrap",
        }}
      >
        Book a Clarity Call
      </span>

      <span
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          background: hov ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.25s ease",
          color: "rgba(255,255,255,0.78)",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

export default function CaseStudiesPage() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const [cols, setCols] = useState<number>(2);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = active === "All" ? studies : studies.filter((s) => s.industry === active);

  // Responsive columns
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w <= 640) setCols(1);
      else setCols(2);
    };
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
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay: (i % Math.max(1, cols)) * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    });
  }, [active, cols]);

  const isMobile = cols === 1;

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-dm), system-ui, sans-serif" }}>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="cursor-light" id="cursorLightCS" aria-hidden="true" />

      {/* ── NAV ── START ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.82)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Tanosei</span>
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1px" }}>Studio</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {[
            { label: "Work", href: "/work" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Studio", href: "/studio" },
            { label: "Team", href: "/team" },
          ].map(({ label, href }) => {
            const navActive = label === "Case Studies";
            return (
              <Link
                key={label}
                href={href}
                style={{
                  fontSize: "13px",
                  color: navActive ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.38)",
                  textDecoration: "none",
                  borderBottom: navActive ? "1px solid rgba(255,255,255,0.25)" : "none",
                  paddingBottom: navActive ? "1px" : "0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!navActive) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)";
                }}
                onMouseLeave={(e) => {
                  if (!navActive) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.38)";
                }}
              >
                {label}
              </Link>
            );
          })}

          <a
            href="https://cal.com/tanoseihito/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12.5px",
              color: "#000",
              background: "#f2f2f2",
              padding: "8px 18px",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 600,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Book a call
          </a>
        </div>
      </nav>
      {/* ── NAV ── END ── */}

      <div style={{ padding: "140px 28px 140px", maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── HEADER ── START ── */}
        <div ref={headerRef} style={{ marginBottom: "64px" }}>
          <p className="h-el" style={{ opacity: 0, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontWeight: 500, marginBottom: "20px" }}>
            Case Studies
          </p>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", marginBottom: "40px" }}>
            <h1 className="h-el" style={{ opacity: 0, fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "clamp(36px, 6vw, 72px)", letterSpacing: "-0.04em", lineHeight: 1.0, margin: 0 }}>
              <span style={{ fontWeight: 300 }}>Real companies.</span>
              <br />
              Measurable clarity.
            </h1>

            <p className="h-el" style={{ opacity: 0, fontSize: "14px", color: "rgba(255,255,255,0.28)", margin: 0, textAlign: "right", lineHeight: 1.7, maxWidth: "240px" }}>
              Every case study shows the brief, the build, and the outcome.
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
        {/* ── HEADER ── END ── */}

        {/* ── CASE STUDY GRID ── START ── */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: isMobile ? "12px" : "2px",
          }}
        >
          {filtered.map((s, i) => {
            const isHov = hovered === s.slug;

            const col = i % cols;
            const totalRows = Math.ceil(filtered.length / Math.max(1, cols));
            const isLastRow = Math.floor(i / Math.max(1, cols)) === totalRows - 1;

            let radius = "0";
            if (i === 0) radius = "14px 0 0 0";
            else if (cols > 1 && i === cols - 1) radius = "0 14px 0 0";
            else if (isLastRow && col === 0 && cols > 1) radius = "0 0 0 14px";
            else if (isLastRow && col === cols - 1) radius = "0 0 14px 0";
            else if (cols === 1 && i === filtered.length - 1) radius = "0 0 14px 14px";

            const pad = isMobile ? "20px 18px 22px" : "24px 28px 28px";
            const hSize = isMobile ? "18px" : "17px";
            const hLine = isMobile ? 1.5 : 1.45;

            return (
              <Link
                key={s.slug}
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
                onMouseEnter={() => setHovered(s.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: isMobile ? "16 / 9" : "16 / 8",
                    background: s.color,
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {s.thumb ? (
                    <img
                      src={s.thumb}
                      alt={s.client}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: isHov ? "scale(1.03)" : "scale(1)",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  ) : (
                    <>
                      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "clamp(24px, 4vw, 48px)", color: "rgba(255,255,255,0.05)", letterSpacing: "-0.04em" }}>{s.client}</span>
                      </div>
                    </>
                  )}

                  {/* Tags overlay (hide on mobile to reduce clutter) */}
                  {!isMobile && (
                    <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", gap: "6px" }}>
                      {[s.industry, s.type].map((tag) => (
                        <span key={tag} style={{ fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.08)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Year */}
                  <span style={{ position: "absolute", top: "14px", right: "14px", fontSize: "10px", color: "rgba(255,255,255,0.22)", fontWeight: 500 }}>{s.year}</span>
                </div>

                {/* Info */}
                <div style={{ padding: pad }}>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>
                    {s.client} — {s.subject}
                  </p>

                  {/* Mobile tags row (cleaner than overlay) */}
                  {isMobile && (
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                      {[s.industry, s.type].map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.40)",
                            border: "1px solid rgba(255,255,255,0.10)",
                            background: "rgba(255,255,255,0.03)",
                            padding: "6px 10px",
                            borderRadius: "999px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2
                    style={{
                      fontFamily: "var(--font-dm)",
                      fontWeight: 700,
                      fontSize: hSize,
                      letterSpacing: "-0.02em",
                      lineHeight: hLine,
                      margin: "0 0 14px",
                      color: isHov ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.68)",
                      transition: "color 0.2s",
                    }}
                  >
                    {s.headline}
                  </h2>

                  <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: "12px" }}>
                    <p style={{ fontSize: isMobile ? "13px" : "12px", color: "rgba(255,255,255,0.25)", margin: 0, lineHeight: 1.55 }}>{s.outcome}</p>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.42)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        whiteSpace: "nowrap",
                        opacity: isMobile ? 1 : isHov ? 1 : 0,
                        transition: "opacity 0.2s",
                        marginTop: isMobile ? "2px" : 0,
                      }}
                    >
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
        {/* ── CASE STUDY GRID ── END ── */}

        {/* ── BOTTOM CTA ── START ── */}
        <div
          style={{
            marginTop: "80px",
            paddingTop: "48px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.02em", margin: "0 0 6px", fontFamily: "var(--font-dm)" }}>
              Want results like these?
            </p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.28)", margin: 0 }}>Book a call. We'll scope the right format in 30 minutes.</p>
          </div>

          <PremiumCTAButton />
        </div>
        {/* ── BOTTOM CTA ── END ── */}
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function(){
          var el=document.getElementById('cursorLightCS');
          if(!el)return;
          window.addEventListener('mousemove',function(e){
            el.style.left=e.clientX+'px';
            el.style.top=e.clientY+'px';
          },{passive:true});
        })();
      `,
        }}
      />
    </div>
  );
}