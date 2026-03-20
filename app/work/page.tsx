"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  // ── REAL WORK ──────────────────────────────────────────────
  //         latestOrder = position in Latest tab (1 = newest)
  //         bestOrder   = position in Best tab (99 = excluded)
  { id: 18, latestOrder: 1,  bestOrder: 99, client: "Tanosei Studio", title: "The Geometric Rebirth",    tags: ["Brand Identity"],      type: "Brand Film",     deliverable: "Rebrand film → identity system launch",  color: "#0a0a0a", videoId: "c1AJKi7gANA", isLatest: true,  isSpec: false, isBest: false, caseUrl: "/journal/rebrand",          showCase: true,  modal: { label: "Brand Film",     title: "The Geometric Rebirth — Tanosei Studio",  desc: "A brand film introducing the new Tanosei identity system — built from first principles using circle, triangle, and square. A clearer expression of how Tanosei thinks, operates, and builds.",             stats: [{ n: "2025",          l: "Year"     }, { n: "Brand Film",       l: "Format"     }, { n: "Identity Launch", l: "Type" }] } },
  { id: 13, latestOrder: 3,  bestOrder: 1,  client: "SecurityPal", title: "Analytics Launch",          tags: ["Security", "SaaS"],    type: "Feature Launch", deliverable: "Feature launch → product + social",       color: "#101418", videoId: "qw6B9nfV_kU", isLatest: false, isSpec: false, isBest: true,  caseUrl: "/case-studies/securitypal-case",    showCase: true,  modal: { label: "Feature Launch", title: "SecurityPal — Analytics Launch",          desc: "Feature launch film for SecurityPal AI's new Analytics dashboard — surfacing SLA adherence, time saved, and revenue accelerated. Built to help customers show impact internally and drive team-wide adoption.", stats: [{ n: "Feature Launch", l: "Format" }, { n: "Product + Social", l: "Placement" }, { n: "Team Adoption",   l: "Goal" }] } },
  { id: 1,  latestOrder: 6,  bestOrder: 2,  client: "SecurityPal", title: "Vision",                    tags: ["Security", "SaaS"],    type: "Brand Film",     deliverable: "Brand film → vision + sales",             color: "#101418", videoId: "azDJfHvwpEY", isLatest: false, isSpec: false, isBest: true,  caseUrl: "/case-studies/securitypal-case",    showCase: true,  modal: { label: "Brand Film",     title: "SecurityPal — Vision",                   desc: "A brand film capturing SecurityPal's vision — collapsing 20 minutes of sales explanation into a single buyer-clear asset. Built for decks, homepage, and enterprise outreach.",                            stats: [{ n: "14 days",       l: "Delivery" }, { n: "90s",              l: "Runtime"    }, { n: "Enterprise",      l: "Pipeline" }] } },
  { id: 2,  latestOrder: 4,  bestOrder: 3,  client: "SecurityPal", title: "2025 Year in Review",       tags: ["Security", "SaaS"],    type: "Brand Film",     deliverable: "Year in review → brand + team",           color: "#0d1218", videoId: "yTIf7xgYBtE", isLatest: false, isSpec: false, isBest: true,  caseUrl: "/case-studies/securitypal-review",  showCase: true,  modal: { label: "Brand Film",     title: "SecurityPal — 2025 Year in Review",      desc: "A brand retrospective capturing SecurityPal's 2025 milestones. Built to resonate with team, clients, and the broader security community.",                                                                 stats: [{ n: "Year in Review", l: "Format" }, { n: "Brand + Team",     l: "Placement"  }, { n: "Community",       l: "Audience" }] } },
  { id: 3,  latestOrder: 5,  bestOrder: 5,  client: "SecurityPal", title: "2025 Year in Review Shorts", tags: ["Security", "SaaS"],   type: "Short",          deliverable: "Short-form → social + brand",             color: "#0d1318", videoId: "dx_cVOzQsw8", isLatest: false, isSpec: false, isBest: true,  caseUrl: "/case-studies/securitypal-shorts",  showCase: true,  modal: { label: "Short",          title: "SecurityPal — 2025 Year in Review Shorts", desc: "Short-form cuts from the 2025 Year in Review, built for social distribution and brand storytelling.",                                                                                                      stats: [{ n: "Short",         l: "Format" }, { n: "Social",           l: "Distribution"}, { n: "Outbound",        l: "Also used" }] } },
  { id: 4,  latestOrder: 9,  bestOrder: 8,  client: "Aleph",       title: "Funding Film",              tags: ["Fintech", "SaaS"],     type: "Launch Film",    deliverable: "Launch film → Series B announcement",    color: "#0d1018", videoId: "7sbP3rOhPec", isLatest: false, isSpec: false, isBest: true,  caseUrl: "/case-studies/aleph-case",          showCase: true,  modal: { label: "Launch Film",    title: "Aleph — Funding Announcement Film",       desc: "Authority-first announcement video delivered on a fast track. Built to land with investors, press, and future hires simultaneously.",                                                                     stats: [{ n: "7 days",        l: "Fast-track"}, { n: "Hero + cutdowns",  l: "Package"    }, { n: "Press + hiring",  l: "Used in" }] } },
  { id: 5,  latestOrder: 7,  bestOrder: 7,  client: "DocUnlock",   title: "How It Works",              tags: ["AI", "TradeOps"],      type: "Explainer",      deliverable: "Explainer → how DocUnlock works",        color: "#0d1018", gif: "https://framerusercontent.com/images/yNs8rP2D4soCiX7eNIR9FJp3zI.gif", videoId: "0WjL6oWzHUg", isLatest: false, isSpec: false, isBest: true, caseUrl: "/case-studies/docunlock-case", showCase: true, modal: { label: "Case Study",    title: "DocUnlock — How It Works",               desc: "A clear walkthrough of how DocUnlock automates customs documentation. Built to make a complex compliance workflow instantly legible to skeptical buyers.",                                                  stats: [{ n: "14 days",       l: "Delivery" }, { n: "Hero + cutdowns",  l: "Package"    }, { n: "Landing + sales", l: "Used in" }] } },
  { id: 6,  latestOrder: 13, bestOrder: 99, client: "Thera",       title: "Time Tracking",             tags: ["Fintech", "HR Tech"],  type: "Launch Video",   deliverable: "Launch video → product + sales",         color: "#0f1210", videoId: "9HL6ZAzvzRo", isLatest: false, isSpec: false, isBest: false, caseUrl: "",                           showCase: false, modal: { label: "Launch Video",   title: "Thera — Time Tracking",                  desc: "Launch video for Thera's time tracking feature. Built to make a nuanced payroll capability immediately clear to buyers.",                                                                                 stats: [{ n: "90s",           l: "Runtime"  }, { n: "Outbound",         l: "Distribution"}, { n: "Sales",           l: "Used in" }] } },
  { id: 7,  latestOrder: 14, bestOrder: 9,  client: "Thera",       title: "For Startups",              tags: ["Fintech", "HR Tech"],  type: "Launch Video",   deliverable: "Launch video → sales + social",          color: "#0f1210", videoId: "kT00CUHWrBU", isLatest: false, isSpec: false, isBest: true,  caseUrl: "",                           showCase: false, modal: { label: "Launch Video",   title: "Thera — For Startups",                   desc: "Launch video positioning Thera as the payroll and compliance layer for startup teams. Built for sales and social distribution.",                                                                           stats: [{ n: "90s",           l: "Runtime"  }, { n: "Series",           l: "Format"     }, { n: "Outbound",        l: "Distribution" }] } },
  { id: 8,  latestOrder: 11, bestOrder: 99, client: "Polymet",     title: "Product Revamp",            tags: ["AI", "DevTools"],      type: "Launch Video",   deliverable: "Launch video → product revamp + web",    color: "#0d100d", videoId: "aEPXSjIqeBc", isLatest: false, isSpec: false, isBest: false, caseUrl: "",                           showCase: false, modal: { label: "Launch Video",   title: "Polymet — Product Revamp",               desc: "Launch video for Polymet's product revamp. Built to reintroduce the product with clarity and visual energy.",                                                                                             stats: [{ n: "Launch Film",   l: "Format"   }, { n: "Web + Social",     l: "Placement"  }, { n: "Product-led",     l: "Approach" }] } },
  { id: 9,  latestOrder: 12, bestOrder: 99, client: "Orchids",     title: "Editor",                    tags: ["AI", "DevTools"],      type: "Launch Video",   deliverable: "Launch video → product + web",           color: "#12100d", videoId: "W0ZV1xQuxlE", isLatest: false, isSpec: false, isBest: false, caseUrl: "",                           showCase: false, modal: { label: "Launch Video",   title: "Orchids — Editor",                       desc: "Launch video for Orchids' AI-powered editor. Built to make the product's core value tangible for developers and early adopters.",                                                                          stats: [{ n: "Brand",         l: "Format"   }, { n: "Web + Social",     l: "Placement"  }, { n: "Emotion-led",     l: "Approach" }] } },
  { id: 10, latestOrder: 15, bestOrder: 99, client: "reAlpha",     title: "Launch in Various States",  tags: ["AI", "RealTech"],      type: "Launch Video",   deliverable: "Launch video → expansion + growth",      color: "#0d1410", videoId: "owlpeuLqyA0", isLatest: false, isSpec: false, isBest: false, caseUrl: "",                           showCase: false, modal: { label: "Launch Video",   title: "reAlpha — Launch in Various States",      desc: "Launch video announcing reAlpha's expansion into new US markets. Built to communicate momentum to buyers and partners.",                                                                                  stats: [{ n: "Demo",          l: "Format"   }, { n: "Investor",         l: "Primary use"}, { n: "Outbound",        l: "Also used" }] } },
  { id: 11, latestOrder: 16, bestOrder: 99, client: "reAlpha",     title: "Feature Walkthrough",       tags: ["AI", "RealTech"],      type: "Explainer",      deliverable: "Feature clarity → landing + sales",      color: "#0f1410", videoId: "SIjttWc0HnU", isLatest: false, isSpec: false, isBest: false, caseUrl: "",                           showCase: false, modal: { label: "Explainer",      title: "reAlpha — Feature Walkthrough",           desc: "A clean feature walkthrough built to make an AI real estate product immediately legible to buyers. Designed for landing page and sales reuse.",                                                            stats: [{ n: "Explainer",     l: "Format"   }, { n: "Landing",          l: "Placement"  }, { n: "Sales",           l: "Also used" }] } },
  { id: 14, latestOrder: 8,  bestOrder: 6,  client: "Niural AI",   title: "Canada Launch",             tags: ["AI", "HR Tech"],       type: "Launch Video",   deliverable: "Launch video → Canada market expansion", color: "#0d0f18", videoId: "qC7YyUs9YNA", isLatest: false, isSpec: false, isBest: true,  caseUrl: "",                           showCase: false, modal: { label: "Launch Video",   title: "Niural AI — Canada Launch",              desc: "Launch video for Niural AI's expansion into the Canadian market. Built to communicate compliance-first payroll to a new audience fast.",                                                                   stats: [{ n: "Product",       l: "Format"   }, { n: "Landing",          l: "Placement"  }, { n: "Sales",           l: "Also used" }] } },
  { id: 16, latestOrder: 18, bestOrder: 99, client: "reAlpha",     title: "Content Video",             tags: ["AI", "RealTech"],      type: "Content Video",  deliverable: "Content video → social + brand",         color: "#0d0d0d", videoId: "xRGp8VLp8Us", isLatest: false, isSpec: false, isBest: false, caseUrl: "",                           showCase: false, modal: { label: "Content Video",  title: "reAlpha — Content Video",                desc: "A content-led video for reAlpha's AI real estate platform. Built to communicate the product's value in an approachable, social-native format.",                                                            stats: [{ n: "Content",       l: "Format"   }, { n: "Social",           l: "Placement"  }, { n: "Story-led",       l: "Approach" }] } },
  { id: 12, latestOrder: 17, bestOrder: 99, client: "Openmart",    title: "Brand Video",               tags: ["AI", "LeadGen"],       type: "Brand Film",     deliverable: "Brand clarity → landing + outbound",     color: "#130d18", videoId: "kfTweR2Q6fg", isLatest: false, isSpec: false, isBest: false, caseUrl: "",                           showCase: false, modal: { label: "Brand Film",     title: "Openmart — Brand Video",                 desc: "Brand clarity film for a B2B lead generation platform. Built to make a complex product feel immediately legible to buyers.",                                                                              stats: [{ n: "Brand",         l: "Format"   }, { n: "Landing",          l: "Placement"  }, { n: "Outbound",        l: "Also used" }] } },

  // ── SPEC WORK ──────────────────────────────────────────────
  { id: 15, latestOrder: 10, bestOrder: 99, client: "Wisprflow",   title: "Spec Animation",            tags: ["AI", "DevTools"],      type: "Spec Film",      deliverable: "Spec animation → concept + portfolio",   color: "#0a0d14", videoId: "cGqUjnGyqs0", isLatest: false, isSpec: true,  isBest: false, caseUrl: "",                           showCase: false, modal: { label: "Spec Film",      title: "Wisprflow — Spec Animation",             desc: "A spec animation exploring how Wisprflow's voice-to-text AI could be brought to life visually. Built as a concept piece demonstrating motion-led product storytelling.",                                   stats: [{ n: "Spec",          l: "Format"   }, { n: "Concept",          l: "Type"       }, { n: "Motion-led",      l: "Approach" }] } },
  { id: 17, latestOrder: 2,  bestOrder: 4,  client: "Healthex",    title: "Spec Film",                 tags: ["AI", "Med Tech"],      type: "Spec Film",      deliverable: "Spec film → concept + portfolio",        color: "#0a0f0d", videoId: "3ytRxgcuqKw", isLatest: false, isSpec: true,  isBest: true,  caseUrl: "",                           showCase: false, modal: { label: "Spec Film",      title: "Healthex — Spec Film",                   desc: "A spec film for Healthex exploring how AI-powered health benefits could be communicated with calm clarity. Built as a motion-led concept piece.",                                                          stats: [{ n: "Spec",          l: "Format"   }, { n: "Concept",          l: "Type"       }, { n: "Motion-led",      l: "Approach" }] } },
];

const TAG_ORDER = ["Latest", "Best", "All", "SaaS", "AI", "Fintech", "Security", "HR Tech", "RealTech", "TradeOps", "LeadGen", "DevTools", "Spec"];
const allTagsInUse = new Set(projects.flatMap(p => p.tags));
const ALL_TAGS = TAG_ORDER.filter(t => ["Latest", "Best", "All", "Spec"].includes(t) || allTagsInUse.has(t));
type Project = typeof projects[0];

// Default filter on page load = "Best"
export default function RecentWork() {
  const [active, setActive]   = useState("Latest");
  const [hovered, setHovered] = useState<number | null>(null);
  const [modal, setModal]     = useState<Project | null>(null);
  const [cols, setCols]       = useState(3);

  const gridRef   = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const modalRef  = useRef<HTMLDivElement>(null);

  const filtered = (() => {
    if (active === "Latest") return [...projects].sort((a, b) => (a.latestOrder ?? 99) - (b.latestOrder ?? 99));
    if (active === "Best")   return [...projects].filter(p => p.isBest).sort((a, b) => (a.bestOrder ?? 99) - (b.bestOrder ?? 99));
    if (active === "Spec")   return projects.filter(p => p.isSpec);
    if (active === "All")    return projects;
    return projects.filter(p => p.tags.includes(active));
  })();

  useEffect(() => {
    const calc = () => { const w = window.innerWidth; if (w <= 520) setCols(1); else if (w <= 900) setCols(2); else setCols(3); };
    calc(); window.addEventListener("resize", calc); return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    headerRef.current?.querySelectorAll(".h-el").forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out" });
    });
  }, []);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".work-card");
    cards?.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.5, delay: (i % Math.max(1, cols)) * 0.07, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
    });
  }, [active, cols]);

  useEffect(() => {
    if (modal && modalRef.current) {
      gsap.fromTo(modalRef.current, { y: 32, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.38, ease: "power3.out" });
    }
  }, [modal]);

  useEffect(() => { document.body.style.overflow = modal ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [modal]);

  // (scroll observer removed — page defaults to Latest on load)

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,10,10,0.88)", backdropFilter: "blur(12px)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="18" height="18" viewBox="0 0 406 335" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M71.211 258.453L71.211 163.678L71.211 87.162C71.211 74.4614 83.7004 67.488 92.7003 72.6307L152.706 107.171L152.706 265.423L130.571 269.742L130.572 276.101L152.706 271.472L162.723 269.375L274.349 246.21V335.3L152.393 334.675C101.22 334.675 71.211 290.544 71.211 258.453Z" fill="rgba(255,255,255,0.75)"/>
            <path d="M213.42 193.732L161.703 223.687L161.821 163.659L165.881 161.265C167.856 163.644 169.986 165.935 172.271 168.125C184.107 179.473 198.472 186.554 213.462 189.409L213.42 193.732Z" fill="rgba(255,255,255,0.75)"/>
          </svg>
          <span style={{ fontFamily: "var(--font-dm)", fontSize: "13px", fontWeight: 800, color: "rgba(255,255,255,0.75)", letterSpacing: "-0.02em" }}>Tanosei</span>
          <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.25)" }}>Studio</span>
        </Link>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-bricolage)", fontSize: "12.5px", fontWeight: 300, color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to home
        </Link>
      </nav>

      <section id="recent-work" style={{ paddingTop: "60px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ padding: "100px 28px 120px", maxWidth: "1160px", margin: "0 auto" }}>

          {/* HEADER */}
          <div ref={headerRef} style={{ marginBottom: "56px" }}>
            <p className="h-el" style={{ opacity: 0, fontFamily: "var(--font-bricolage)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontWeight: 300, marginBottom: "20px" }}>Recent Work</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", marginBottom: "36px" }}>
              <h2 className="h-el" style={{ opacity: 0, fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.04em", lineHeight: 1.0, margin: 0 }}>
                <span style={{ fontWeight: 300 }}>Every frame built to</span><br />
                make buyers confident.
              </h2>
              <p className="h-el" style={{ opacity: 0, fontFamily: "var(--font-bricolage)", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.28)", margin: 0, textAlign: "right", lineHeight: 1.7 }}>
                Trusted by founders<br />and GTM teams
              </p>
            </div>

            {/* FILTER TABS */}
            <div className="h-el" style={{ opacity: 0, display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {ALL_TAGS.map(tag => {
                const isActive = active === tag;
                const isBest = tag === "Best";
                const isSpec = tag === "Spec";
                const isLatest = tag === "Latest";
                const isSpecial = isBest || isSpec || isLatest;

                // Best gets a slightly warmer/brighter treatment
                const borderColor = isActive
                  ? "rgba(255,255,255,0.35)"
                  : isBest ? "rgba(255,255,255,0.18)"
                  : isSpec ? "rgba(255,255,255,0.12)"
                  : isLatest ? "rgba(255,255,255,0.14)"
                  : "rgba(255,255,255,0.08)";
                const bgColor = isActive
                  ? isBest ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.08)"
                  : isBest ? "rgba(255,255,255,0.05)"
                  : isSpec ? "rgba(255,255,255,0.03)"
                  : isLatest ? "rgba(255,255,255,0.04)"
                  : "transparent";
                const textColor = isActive
                  ? "rgba(255,255,255,0.88)"
                  : isBest ? "rgba(255,255,255,0.60)"
                  : isSpec ? "rgba(255,255,255,0.45)"
                  : isLatest ? "rgba(255,255,255,0.50)"
                  : "rgba(255,255,255,0.32)";

                return (
                  <button key={tag} onClick={() => setActive(tag)} style={{
                    fontFamily: "var(--font-bricolage)", padding: "7px 16px", borderRadius: "999px",
                    border: `1px solid ${borderColor}`,
                    background: bgColor,
                    color: textColor,
                    fontSize: "12.5px", fontWeight: isActive ? 500 : 300,
                    cursor: "pointer", transition: "all 0.18s ease", letterSpacing: "0.01em",
                  }}
                  onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.70)"; } }}
                  onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.borderColor = borderColor; (e.currentTarget as HTMLButtonElement).style.color = textColor; } }}>
                    {isBest ? "✦ Best" : isSpec ? "Spec" : tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SPEC BANNER — shown only in Spec tab */}
          {active === "Spec" && (
            <div style={{ marginBottom: "32px", padding: "14px 20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Spec work</span>
              <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.12)" }} />
              <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>These are concept films — built to explore a visual direction or narrative approach, not tied to a client brief.</p>
            </div>
          )}

          {/* GRID */}
          <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: cols === 1 ? "12px" : "2px" }}>
            {filtered.map((p, i) => {
              const isHovered = hovered === p.id, col = i % cols;
              const totalRows = Math.ceil(filtered.length / Math.max(1, cols));
              const isLastRow = Math.floor(i / Math.max(1, cols)) === totalRows - 1;
              let radius = "0";
              if (i === 0) radius = "14px 0 0 0";
              else if (cols > 1 && i === cols - 1) radius = "0 14px 0 0";
              else if (isLastRow && col === 0 && cols > 1) radius = "0 0 0 14px";
              else if (isLastRow && col === cols - 1) radius = "0 0 14px 0";
              else if (cols === 1 && i === filtered.length - 1) radius = "0 0 14px 14px";

              return (
                <div key={p.id} className="work-card" onClick={() => setModal(p)}
                  style={{ opacity: 0, cursor: "pointer", border: "1px solid rgba(255,255,255,0.07)", borderRadius: radius, overflow: "hidden", borderRight: col < cols - 1 ? "none" : "1px solid rgba(255,255,255,0.07)", borderBottom: isLastRow ? "1px solid rgba(255,255,255,0.07)" : "none", background: "rgba(255,255,255,0.01)", position: "relative" }}
                  onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>

                  {/* LATEST BADGE */}
                  {p.isLatest && (
                    <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 10, fontFamily: "var(--font-bricolage)", fontSize: "9px", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", padding: "3px 9px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)" }}>Latest</div>
                  )}
                  {/* SPEC BADGE */}
                  {p.isSpec && (
                    <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 10, fontFamily: "var(--font-bricolage)", fontSize: "9px", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", padding: "3px 9px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)" }}>Spec</div>
                  )}

                  {/* THUMBNAIL */}
                  <div style={{ width: "100%", aspectRatio: "16 / 9", background: p.color, position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {"gif" in p && p.gif ? (
                      <img src={p.gif} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isHovered ? 0.85 : 0.65, transition: "opacity 0.3s" }} />
                    ) : (
                      <img src={`https://img.youtube.com/vi/${p.videoId}/hqdefault.jpg`} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isHovered ? 0.8 : 0.6, transition: "opacity 0.3s" }} />
                    )}
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: isHovered ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.22s, transform 0.22s", transform: isHovered ? "scale(1.08)" : "scale(1)" }}>
                        <svg width="13" height="15" viewBox="0 0 14 16" fill="none"><path d="M0 0L14 8 0 16z" fill="rgba(255,255,255,0.85)"/></svg>
                      </div>
                    </div>
                    {cols > 1 && (
                      <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {p.tags.map(tag => (
                          <span key={tag} style={{ fontFamily: "var(--font-bricolage)", fontSize: "9.5px", fontWeight: 300, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.08)" }}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div style={{ padding: cols === 1 ? "18px 18px 22px" : "20px 22px 24px" }}>
                    <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", color: "rgba(255,255,255,0.22)", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.type}</span>
                    <h3 style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: cols === 1 ? "16px" : "15px", letterSpacing: "-0.02em", margin: "6px 0 4px", color: isHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)", transition: "color 0.2s" }}>{p.client} — {p.title}</h3>
                    <p style={{ fontFamily: "var(--font-bricolage)", fontSize: cols === 1 ? "13px" : "12px", fontWeight: 300, color: "rgba(255,255,255,0.28)", margin: 0, lineHeight: 1.55 }}>{p.deliverable}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM CTA */}
          <div style={{ marginTop: "80px", paddingTop: "48px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <p style={{ fontFamily: "var(--font-dm)", fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.04em", margin: "0 0 6px" }}>Seen enough?</p>
              <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.28)", margin: 0 }}>Let's talk about your next launch.</p>
            </div>
            <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "14px", padding: "12px 12px 12px 22px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", textDecoration: "none", transition: "all 0.25s ease", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
              <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "13.5px", fontWeight: 500, color: "rgba(255,255,255,0.65)", whiteSpace: "nowrap" }}>Book a Clarity Call</span>
              <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.78)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </a>
          </div>
        </div>

        {/* MODAL */}
        {modal && (
          <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <div ref={modalRef} onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: "620px", background: "#111", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", opacity: 0 }}>
              <div style={{ aspectRatio: "16/9", position: "relative", background: "#000" }}>
                {modal.videoId ? (
                  <iframe src={`https://www.youtube.com/embed/${modal.videoId}?autoplay=0&modestbranding=1&rel=0`} style={{ width: "100%", height: "100%", border: "none", display: "block" }} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.2)", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Video coming soon</p>
                  </div>
                )}
              </div>
              <div style={{ padding: "28px 28px 24px" }}>
                <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>{modal.modal.label}</p>
                <h3 style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "clamp(17px, 2.5vw, 21px)", letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 0 12px", color: "#fff" }}>{modal.modal.title}</h3>
                <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13.5px", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 24px" }}>{modal.modal.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(255,255,255,0.07)", borderLeft: "1px solid rgba(255,255,255,0.07)", marginBottom: "24px" }}>
                  {modal.modal.stats.map(s => (
                    <div key={s.l} style={{ padding: "14px 16px", borderRight: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
                      <p style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", margin: "0 0 3px", color: "rgba(255,255,255,0.85)" }}>{s.n}</p>
                      <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>{s.l}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: modal.showCase ? "space-between" : "flex-end", gap: "12px" }}>
                  {modal.showCase && modal.caseUrl && (
                    <Link href={modal.caseUrl} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 22px", borderRadius: "8px", background: "#fff", fontFamily: "var(--font-bricolage)", color: "#000", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
                      View full case study →
                    </Link>
                  )}
                  <button onClick={() => setModal(null)}
                    style={{ fontFamily: "var(--font-bricolage)", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", borderRadius: "8px", padding: "10px 20px", fontSize: "13px", fontWeight: 300, cursor: "pointer" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}>
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