"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    client: "SecurityPal",
    title: "Positioning Film",
    tags: ["Security", "SaaS"],
    type: "Positioning Film",
    deliverable: "Positioning film → sales + website",
    color: "#101418",
    videoId: "azDJfHvwpEY",
    caseUrl: "/case-studies/securitypal-case",
    showCase: true,
    modal: {
      label: "Case Study",
      title: "SecurityPal — Positioning Film",
      desc: "A 90-second positioning film that collapsed 20 minutes of sales explanation into a single buyer-clear asset. Built for decks, homepage, and enterprise outreach.",
      stats: [
        { n: "14 days", l: "Delivery" },
        { n: "90s", l: "Runtime" },
        { n: "Enterprise", l: "Pipeline" },
      ],
    },
  },
  {
    id: 2,
    client: "SecurityPal",
    title: "2025 Year in Review",
    tags: ["Security", "SaaS"],
    type: "Brand Film",
    deliverable: "Year in review → brand + team",
    color: "#0d1218",
    videoId: "yTIf7xgYBtE",
    caseUrl: "/case-studies/securitypal-review",
    showCase: true,
    modal: {
      label: "Brand Film",
      title: "SecurityPal — 2025 Year in Review",
      desc: "A brand retrospective capturing SecurityPal's 2025 milestones. Built to resonate with team, clients, and the broader security community.",
      stats: [
        { n: "Year in Review", l: "Format" },
        { n: "Brand + Team", l: "Placement" },
        { n: "Community", l: "Audience" },
      ],
    },
  },
  {
    id: 3,
    client: "SecurityPal",
    title: "Shorts",
    tags: ["Security", "SaaS"],
    type: "Short",
    deliverable: "Short-form → social + outbound",
    color: "#0d1318",
    videoId: "dx_cVOzQsw8",
    caseUrl: "/case-studies/securitypal-shorts",
    showCase: true,
    modal: {
      label: "Short",
      title: "SecurityPal — Short",
      desc: "A punchy short-form video built for social distribution and outbound sequences. Fast, clear, built to stop the scroll.",
      stats: [
        { n: "Short", l: "Format" },
        { n: "Social", l: "Distribution" },
        { n: "Outbound", l: "Also used" },
      ],
    },
  },
  {
    id: 4,
    client: "Aleph",
    title: "Funding Film",
    tags: ["Fintech", "SaaS"],
    type: "Launch Film",
    deliverable: "Launch film → Series B announcement",
    color: "#0d1018",
    videoId: "7sbP3rOhPec",
    caseUrl: "/case-studies/aleph-case",
    showCase: true,
    modal: {
      label: "Launch Film",
      title: "Aleph — Funding Announcement Film",
      desc: "Authority-first announcement video delivered on a fast track. Built to land with investors, press, and future hires simultaneously.",
      stats: [
        { n: "7 days", l: "Fast-track" },
        { n: "Hero + cutdowns", l: "Package" },
        { n: "Press + hiring", l: "Used in" },
      ],
    },
  },
  {
    id: 5,
    client: "DocUnlock",
    title: "Feature Launch Walkthrough",
    tags: ["AI", "TradeOps"],
    type: "Explainer",
    deliverable: "Explainer → landing + sales enablement",
    color: "#0d1018",
    gif: "https://framerusercontent.com/images/yNs8rP2D4soCiX7eNIR9FJp3zI.gif",
    videoId: "0WjL6oWzHUg",
    caseUrl: "/case-studies/docunlock-case",
    showCase: true,
    modal: {
      label: "Case Study",
      title: "DocUnlock — Feature Launch Walkthrough",
      desc: "A clean, buyer-legible walkthrough designed for landing pages and sales reuse. Built around the moment of insight — the instant the feature becomes obvious.",
      stats: [
        { n: "14 days", l: "Delivery" },
        { n: "Hero + cutdowns", l: "Package" },
        { n: "Landing + sales", l: "Used in" },
      ],
    },
  },
  {
    id: 6,
    client: "Thera",
    title: "Case Study — Oceans",
    tags: ["Fintech", "HR Tech"],
    type: "Case Study",
    deliverable: "Customer case study → sales cycle",
    color: "#0f1210",
    videoId: "9HL6ZAzvzRo",
    caseUrl: "",
    showCase: false,
    modal: {
      label: "Case Study",
      title: "Thera — Customer Story (Oceans)",
      desc: "Customer case study video built for direct send in outbound. Turned a written success story into a 90-second sales asset.",
      stats: [
        { n: "90s", l: "Runtime" },
        { n: "Outbound", l: "Distribution" },
        { n: "Sales", l: "Used in" },
      ],
    },
  },
  {
    id: 7,
    client: "Thera",
    title: "Case Study — WorkWeek",
    tags: ["Fintech", "HR Tech"],
    type: "Case Study",
    deliverable: "Customer case study → sales cycle",
    color: "#0f1210",
    videoId: "kT00CUHWrBU",
    caseUrl: "",
    showCase: false,
    modal: {
      label: "Case Study",
      title: "Thera — Customer Story (WorkWeek)",
      desc: "Customer case study video built for direct send in outbound. Part of a series turning Thera's written stories into sales collateral.",
      stats: [
        { n: "90s", l: "Runtime" },
        { n: "Series", l: "Format" },
        { n: "Outbound", l: "Distribution" },
      ],
    },
  },
  {
    id: 8,
    client: "Polymet",
    title: "Product Launch",
    tags: ["AI", "DevTools"],
    type: "Launch Film",
    deliverable: "Product launch → web + social",
    color: "#0d100d",
    videoId: "aEPXSjIqeBc",
    caseUrl: "",
    showCase: false,
    modal: {
      label: "Launch Film",
      title: "Polymet — Product Launch Film",
      desc: "A product launch film built to communicate Polymet's core value clearly and compellingly. Designed for web and social distribution.",
      stats: [
        { n: "Launch Film", l: "Format" },
        { n: "Web + Social", l: "Placement" },
        { n: "Product-led", l: "Approach" },
      ],
    },
  },
  {
    id: 9,
    client: "Orchids",
    title: "Brand Film",
    tags: ["AI", "DevTools"],
    type: "Brand Film",
    deliverable: "Brand story → web + social",
    color: "#12100d",
    videoId: "W0ZV1xQuxlE",
    caseUrl: "",
    showCase: false,
    modal: {
      label: "Brand Film",
      title: "Orchids — Brand Film",
      desc: "A brand story film built to communicate identity and values with emotional clarity. Designed for web hero and social distribution.",
      stats: [
        { n: "Brand", l: "Format" },
        { n: "Web + Social", l: "Placement" },
        { n: "Emotion-led", l: "Approach" },
      ],
    },
  },
  {
    id: 10,
    client: "reAlpha",
    title: "Product Demo",
    tags: ["AI", "RealTech"],
    type: "Product Demo",
    deliverable: "Demo → investor + outbound",
    color: "#0d1410",
    videoId: "owlpeuLqyA0",
    caseUrl: "",
    showCase: false,
    modal: {
      label: "Product Demo",
      title: "reAlpha — Product Demo",
      desc: "Investor-grade product demo for an AI real estate platform. Structured for pitch decks and outbound sequences.",
      stats: [
        { n: "Demo", l: "Format" },
        { n: "Investor", l: "Primary use" },
        { n: "Outbound", l: "Also used" },
      ],
    },
  },
  {
    id: 11,
    client: "reAlpha",
    title: "Feature Walkthrough",
    tags: ["AI", "RealTech"],
    type: "Explainer",
    deliverable: "Feature clarity → landing + sales",
    color: "#0f1410",
    videoId: "SIjttWc0HnU",
    caseUrl: "",
    showCase: false,
    modal: {
      label: "Explainer",
      title: "reAlpha — Feature Walkthrough",
      desc: "A clean feature walkthrough built to make an AI real estate product immediately legible to buyers. Designed for landing page and sales reuse.",
      stats: [
        { n: "Explainer", l: "Format" },
        { n: "Landing", l: "Placement" },
        { n: "Sales", l: "Also used" },
      ],
    },
  },
  {
    id: 12,
    client: "Openmart",
    title: "Brand Video",
    tags: ["AI", "LeadGen"],
    type: "Brand Film",
    deliverable: "Brand clarity → landing + outbound",
    color: "#130d18",
    videoId: "kfTweR2Q6fg",
    caseUrl: "",
    showCase: false,
    modal: {
      label: "Brand Film",
      title: "Openmart — Brand Video",
      desc: "Brand clarity film for a B2B lead generation platform. Built to make a complex product feel immediately legible to buyers.",
      stats: [
        { n: "Brand", l: "Format" },
        { n: "Landing", l: "Placement" },
        { n: "Outbound", l: "Also used" },
      ],
    },
  },
];

const TAG_ORDER = ["All", "SaaS", "AI", "Fintech", "Security", "HR Tech", "RealTech", "TradeOps", "LeadGen", "DevTools"];
const allTagsInUse = new Set(projects.flatMap((p) => p.tags));
const ALL_TAGS = TAG_ORDER.filter((t) => t === "All" || allTagsInUse.has(t));
type Project = typeof projects[0];

export default function RecentWork() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const [modal, setModal] = useState<Project | null>(null);
  const [cols, setCols] = useState(3);

  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.tags.includes(active));

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w <= 520) setCols(1);
      else if (w <= 900) setCols(2);
      else setCols(3);
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
    const cards = gridRef.current?.querySelectorAll(".work-card");
    cards?.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.5,
        delay: (i % Math.max(1, cols)) * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });
  }, [active, cols]);

  useEffect(() => {
    if (modal && modalRef.current) {
      gsap.fromTo(modalRef.current, { y: 32, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.38, ease: "power3.out" });
    }
  }, [modal]);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

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
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="18" height="18" viewBox="0 0 406 335" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M71.211 258.453L71.211 163.678L71.211 87.162C71.211 74.4614 83.7004 67.488 92.7003 72.6307L152.706 107.171L152.706 265.423L130.571 269.742L130.572 276.101L152.706 271.472L162.723 269.375L274.349 246.21V335.3L152.393 334.675C101.22 334.675 71.211 290.544 71.211 258.453Z" fill="rgba(255,255,255,0.75)" />
            <path d="M213.42 193.732L161.703 223.687L161.821 163.659L165.881 161.265C167.856 163.644 169.986 165.935 172.271 168.125C184.107 179.473 198.472 186.554 213.462 189.409L213.42 193.732Z" fill="rgba(255,255,255,0.75)" />
          </svg>
          <span style={{ fontSize: "13px", fontWeight: 800, color: "rgba(255,255,255,0.75)", letterSpacing: "-0.01em" }}>Tanosei</span>
          <span style={{ fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.25)", letterSpacing: "0.02em" }}>Studio</span>
        </Link>

        {/* Back to home */}
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

      <section
        id="recent-work"
        style={{
          paddingTop: "60px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
      <div style={{ padding: "100px 28px 120px", maxWidth: "1160px", margin: "0 auto" }}>

        {/* HEADER */}
        <div ref={headerRef} style={{ marginBottom: "56px" }}>
          <p className="h-el" style={{ opacity: 0, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontWeight: 500, marginBottom: "20px" }}>
            Recent Work
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", marginBottom: "36px" }}>
            <h2 className="h-el" style={{ opacity: 0, fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.04em", lineHeight: 1.0, margin: 0 }}>
              <span style={{ fontWeight: 300 }}>Every frame built to</span>
              <br />
              make buyers confident.
            </h2>
            <p className="h-el" style={{ opacity: 0, fontSize: "14px", color: "rgba(255,255,255,0.28)", margin: 0, textAlign: "right", lineHeight: 1.7 }}>
              Trusted by founders<br />and GTM teams
            </p>
          </div>

          {/* Filter tabs */}
          <div className="h-el" style={{ opacity: 0, display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "999px",
                  border: active === tag ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  background: active === tag ? "rgba(255,255,255,0.08)" : "transparent",
                  color: active === tag ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.32)",
                  fontSize: "12.5px",
                  fontWeight: active === tag ? 600 : 400,
                  fontFamily: "var(--font-dm)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  if (active !== tag) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== tag) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.32)";
                  }
                }}
              >
                {tag}
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
            gap: cols === 1 ? "12px" : "2px",
          }}
        >
          {filtered.map((p, i) => {
            const isHovered = hovered === p.id;
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
              <div
                key={p.id}
                className="work-card"
                onClick={() => setModal(p)}
                style={{
                  opacity: 0,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: radius,
                  overflow: "hidden",
                  borderRight: col < cols - 1 ? "none" : "1px solid rgba(255,255,255,0.07)",
                  borderBottom: isLastRow ? "1px solid rgba(255,255,255,0.07)" : "none",
                  background: "rgba(255,255,255,0.01)",
                }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Thumbnail */}
                <div style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  background: p.color,
                  position: "relative",
                  overflow: "hidden",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  {"gif" in p && p.gif ? (
                    <img src={p.gif} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isHovered ? 0.85 : 0.65, transition: "opacity 0.3s" }} />
                  ) : (
                    <img
                      src={`https://img.youtube.com/vi/${p.videoId}/hqdefault.jpg`}
                      alt={p.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isHovered ? 0.8 : 0.6, transition: "opacity 0.3s" }}
                    />
                  )}

                  {/* Play button — always visible */}
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "50%",
                      background: isHovered ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.45)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.22s, transform 0.22s",
                      transform: isHovered ? "scale(1.08)" : "scale(1)",
                    }}>
                      <svg width="13" height="15" viewBox="0 0 14 16" fill="none">
                        <path d="M0 0L14 8 0 16z" fill="rgba(255,255,255,0.85)" />
                      </svg>
                    </div>
                  </div>

                  {/* Tags overlay */}
                  {cols > 1 && (
                    <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {p.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.08)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card info */}
                <div style={{ padding: cols === 1 ? "18px 18px 22px" : "20px 22px 24px" }}>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.type}</span>
                  <h3 style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: cols === 1 ? "16px" : "15px", letterSpacing: "-0.02em", margin: "6px 0 4px", color: isHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)", transition: "color 0.2s" }}>
                    {p.client} — {p.title}
                  </h3>
                  <p style={{ fontSize: cols === 1 ? "13px" : "12px", color: "rgba(255,255,255,0.28)", margin: 0, lineHeight: 1.55 }}>{p.deliverable}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div style={{ marginTop: "80px", paddingTop: "48px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.02em", margin: "0 0 6px", fontFamily: "var(--font-dm)" }}>Seen enough?</p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.28)", margin: 0 }}>Let's talk about your next launch.</p>
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

      {/* MODAL */}
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div ref={modalRef} onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: "620px", background: "#111", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", opacity: 0 }}>
            <div style={{ aspectRatio: "16/9", position: "relative", background: "#000" }}>
              {modal.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${modal.videoId}?autoplay=0&modestbranding=1&rel=0`}
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Video coming soon</p>
                </div>
              )}
            </div>
            <div style={{ padding: "28px 28px 24px" }}>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 8px" }}>{modal.modal.label}</p>
              <h3 style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "clamp(17px, 2.5vw, 21px)", letterSpacing: "-0.025em", lineHeight: 1.2, margin: "0 0 12px", color: "#fff" }}>{modal.modal.title}</h3>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 24px" }}>{modal.modal.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(255,255,255,0.07)", borderLeft: "1px solid rgba(255,255,255,0.07)", marginBottom: "24px" }}>
                {modal.modal.stats.map((s) => (
                  <div key={s.l} style={{ padding: "14px 16px", borderRight: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", margin: "0 0 3px", color: "rgba(255,255,255,0.85)" }}>{s.n}</p>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0, fontWeight: 600 }}>{s.l}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: modal.showCase ? "space-between" : "flex-end", gap: "12px" }}>
                {modal.showCase && modal.caseUrl && (
                  <Link
                    href={modal.caseUrl}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 22px", borderRadius: "8px", background: "#fff", color: "#000", fontSize: "13px", fontWeight: 700, textDecoration: "none", fontFamily: "var(--font-dm)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                  >
                    View full case study →
                  </Link>
                )}
                <button
                  onClick={() => setModal(null)}
                  style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", borderRadius: "8px", padding: "10px 20px", fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-dm)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
    </div>
  );
}