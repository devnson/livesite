"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const entries = [
  {
    slug: "rebrand",
    date: "2025",
    category: "Brand Identity",
    title: "The Geometric Rebirth",
    excerpt: "A new identity built from first principles — circle, triangle, and square — and a clearer expression of how Tanosei thinks, operates, and builds.",
    readTime: "12 min read",
    isNew: true,
  },
  // Add future entries here
];

export default function JournalPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    headerRef.current?.querySelectorAll(".h-el").forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.09, ease: "power3.out" });
    });
    listRef.current?.querySelectorAll(".entry").forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
    });
  }, []);

  return (
    <main style={{ background: "radial-gradient(ellipse 900px 600px at 20% 10%, #141414 0%, #0a0a0a 40%, #080808 100%)", minHeight: "100vh", color: "#f0f0f0", fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "60px", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(8,8,8,0.88)", backdropFilter: "blur(12px)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/tanoseilogos/logo.png" alt="Tanosei" style={{ height: "22px", width: "auto", objectFit: "contain" }} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-bricolage)", fontSize: "12.5px", fontWeight: 300, color: "rgba(255,255,255,0.38)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </Link>
          <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.55)", letterSpacing: "0.10em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.14)", padding: "4px 10px", borderRadius: "999px" }}>Journal</span>
        </div>
      </nav>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "120px 28px 120px" }}>

        {/* HEADER */}
        <div ref={headerRef} style={{ marginBottom: "72px" }}>
          <p className="h-el" style={{ opacity: 0, fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>
            Tanosei Studio / Journal
          </p>
          <h1 className="h-el" style={{ opacity: 0, fontFamily: "var(--font-dm)", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 1.0, color: "#ffffff", margin: "0 0 20px" }}>
            Thinking out loud.
          </h1>
          <p className="h-el" style={{ opacity: 0, fontFamily: "var(--font-bricolage)", fontSize: "16px", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, margin: 0, maxWidth: "480px" }}>
            Essays, brand documents, and process notes from Tanosei Studio — on motion, identity, and the philosophy behind the work.
          </p>
        </div>

        {/* DIVIDER */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "48px" }} />

        {/* ENTRY LIST */}
        <div ref={listRef} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {entries.map((entry, i) => (
            <Link key={entry.slug} href={`/journal/${entry.slug}`} className="entry" style={{ opacity: 0, textDecoration: "none", color: "inherit", display: "block", padding: "36px 0", borderBottom: "1px solid rgba(255,255,255,0.07)", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "8px"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0px"}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  {/* META ROW */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)" }}>{entry.date}</span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)" }}>{entry.category}</span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.28)" }}>{entry.readTime}</span>
                    {entry.isNew && (
                      <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", padding: "2px 8px", borderRadius: "999px" }}>New</span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h2 style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.15, color: "rgba(255,255,255,0.88)", margin: "0 0 12px", transition: "color 0.2s" }}>
                    {entry.title}
                  </h2>

                  {/* EXCERPT */}
                  <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "14.5px", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, margin: 0, maxWidth: "560px" }}>
                    {entry.excerpt}
                  </p>
                </div>

                {/* ARROW */}
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "4px", transition: "border-color 0.2s, background 0.2s" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="2" style={{ transform: "rotate(-45deg)" }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY STATE — shows when more entries are needed */}
        {entries.length === 1 && (
          <div style={{ marginTop: "48px", padding: "28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.25)", margin: 0, letterSpacing: "0.04em" }}>
              More entries coming.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}