"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const walkthroughs = [
  {
    client: "SecurityPal",
    type: "Enterprise Narrative System",
    slug: "securitypal-case",
    videoId: "azDJfHvwpEY",
    problem: "Security work happens behind the scenes. The product's value was difficult to visualize for enterprise buyers",
    built: "A clear enterprise narrative system that visualized how trust moves through their platform, structured for homepage, decks, and outbound.",
    result: "Made enterprise security workflows visible and defensible.",
    tags: ["Homepage Narrative", "Enterprise Positioning", "Outbound Enablement"],
  },
  {
    client: "DocUnlock",
    type: "Feature Launch Walkthrough",
    slug: "docunlock-case",
    videoId: "0WjL6oWzHUg",
    thumb: "",
    context: "Automates customs entry writing by turning shipping documents into ready-to-file entries inside existing ABI tools.",
    problem: "Entry writing is high-volume and high-risk. Automation often fails because it disrupts broker workflows.",
    built: "A 90-second walkthrough visualizing the end-to-end flow, documents in, AI extraction, entries delivered inside ABI.",
    result: "Made workflow fit, accuracy, and scalability instantly clear. Deployed across homepage and outbound.",
    tags: ["Workflow integration", "Homepage Narrative", "Feature walkthrough"],
  },
  {
    client: "Aleph",
    type: "Funding Announcement Film",
    slug: "aleph-case",
    videoId: "7sbP3rOhPec",
    thumb: "",
    context: "Series B announcement requiring fast turnaround to align with press cycle.",
    problem: "Needed investor-grade authority signal. Standard agency timelines wouldn't hold.",
    built: "Single hero video delivered in 12 days. Structured for press, hiring, and investor audiences.",
    result: "Used in announcement deck and hiring pipeline.",
    tags: ["Investor announcement", "Press asset", "Hiring signal"],
  },
];

export default function Walkthroughs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (activeVideo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [activeVideo]);

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });

    const rows = sectionRef.current?.querySelectorAll(".wt-row");
    rows?.forEach((row, i) => {
      gsap.fromTo(row, { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%" } });
    });
  }, []);

  return (
    <>
      <section ref={sectionRef} style={{ padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

          {/* HEADER */}
          <div ref={headerRef} style={{ marginBottom: "72px", opacity: 0 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              marginBottom: "28px", padding: "6px 14px", borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)",
            }}>
              {/* PILL TEXT — Bricolage */}
              <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "12px", color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                Complex product
              </span>
              <svg width="32" height="10" viewBox="0 0 32 10" fill="none">
                <path d="M0 5h28M24 1l4 4-4 4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "12px", color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>
                Buyer-clear narrative
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <div>
                {/* HEADING — DM Sans */}
                <h2 style={{
                  fontFamily: "var(--font-dm)", fontWeight: 800,
                  fontSize: "clamp(32px, 5vw, 52px)",
                  letterSpacing: "-0.04em", lineHeight: 1.05,
                  margin: "0 0 16px 0", color: "#fff",
                }}>
                  Proven Systems.
                </h2>
                {/* SUBHEAD — Bricolage */}
                <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "15px", fontWeight: 300, color: "rgba(255,255,255,0.62)", margin: 0, lineHeight: 1.6 }}>
                  Three systems. Three different business outcomes.
                </p>
              </div>

              {/* BUTTON — Bricolage */}
              <Link href="/case-studies/" className="wt-cta wt-ctaTop" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "10px 20px", borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-bricolage)",
                fontSize: "13px", fontWeight: 500,
                textDecoration: "none", whiteSpace: "nowrap",
                transition: "border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s",
              }}>
                Read full case studies
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ROWS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {walkthroughs.map((w, i) => {
              const thumbUrl = (w as any).thumb || (w.videoId ? `https://img.youtube.com/vi/${w.videoId}/hqdefault.jpg` : null);

              return (
                <div key={w.client} className="wt-row" style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: i === 0 ? "14px 14px 0 0" : i === walkthroughs.length - 1 ? "0 0 14px 14px" : "0",
                  overflow: "hidden", opacity: 0,
                  borderBottom: i < walkthroughs.length - 1 ? "none" : "1px solid rgba(255,255,255,0.09)",
                }}>

                  {/* LEFT: VIDEO */}
                  <div className="wt-left" style={{ display: "flex", flexDirection: "column", alignItems: "center", borderRight: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.01)" }}>
                    <div className="wt-thumb" onClick={() => w.videoId && setActiveVideo(w.videoId)} style={{ position: "relative", aspectRatio: "16/9", background: "#080808", cursor: w.videoId ? "pointer" : "default", overflow: "hidden", flexShrink: 0, width: "100%" }}>
                      {thumbUrl ? (
                        <img src={thumbUrl} alt={w.client} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.72, transition: "opacity 0.3s, transform 0.45s" }} className="wt-thumbImg" />
                      ) : (
                        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", background: "linear-gradient(135deg, #0a0a0a, #111)" }}>
                          <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="rgba(255,255,255,0.3)"><path d="M0 0L14 8 0 16z" /></svg>
                          </div>
                          <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", color: "rgba(255,255,255,0.38)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 300 }}>Video coming</span>
                        </div>
                      )}
                      {w.videoId && (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div className="wt-play" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s, background 0.2s, border-color 0.2s" }}>
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="white" style={{ marginLeft: "2px" }}><path d="M0 0L14 8 0 16z" /></svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* DESKTOP CTA — Bricolage */}
                    <Link href={`/case-studies/${w.slug}`} className="wt-cta wt-ctaDesktop" style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px",
                      margin: "16px auto", padding: "7px 18px", borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.70)",
                      fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 500,
                      textDecoration: "none", letterSpacing: "0.01em",
                      transition: "border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s",
                    }}>
                      Read full case study
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                  </div>

                  {/* RIGHT: CONTENT */}
                  <div className="wt-right" style={{ padding: "36px 40px", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", gap: "22px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px", flexWrap: "wrap" }}>
                        {/* CLIENT NAME — DM Sans */}
                        <span style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.04em", color: "rgba(255,255,255,0.96)" }}>
                          {w.client}
                        </span>
                        {/* TYPE — Bricolage */}
                        <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", color: "rgba(255,255,255,0.48)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 300 }}>
                          {w.type}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {[
                        { label: "The Context", value: (w as any).context },
                        { label: "The Problem", value: w.problem },
                        { label: "What We Built", value: w.built },
                        { label: "Result",        value: w.result },
                      ].filter(item => item.value).map(item => (
                        <div key={item.label} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "12px" }}>
                          {/* LABEL — Bricolage */}
                          <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", color: "rgba(255,255,255,0.50)", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase", paddingTop: "2px", flexShrink: 0 }}>
                            {item.label}
                          </span>
                          {/* VALUE — Bricolage */}
                          <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "13.5px", fontWeight: 300, color: "rgba(255,255,255,0.82)", lineHeight: 1.65 }}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* TAGS — Bricolage */}
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {w.tags.map(tag => (
                        <span key={tag} className="wt-pill">{tag}</span>
                      ))}
                    </div>

                    {/* MOBILE CTA — Bricolage */}
                    <div className="wt-ctaMobileWrap">
                      <Link href={`/case-studies/${w.slug}`} className="wt-cta wt-ctaMobile" style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px",
                        padding: "9px 18px", borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.75)",
                        fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 500,
                        textDecoration: "none", letterSpacing: "0.01em",
                        transition: "border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s",
                      }}>
                        Read full case study
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOTER LINE */}
          <div style={{ marginTop: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {/* FOOTER NOTE — Bricolage */}
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.52)", letterSpacing: "0.04em", margin: 0 }}>
              Every walkthrough was built inside a 14-day sprint.
            </p>
            {/* FOOTER CTA — Bricolage */}
            <Link href="/case-studies/" className="wt-cta" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "9px 20px", borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.72)",
              fontFamily: "var(--font-bricolage)", fontSize: "12.5px", fontWeight: 500,
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s",
            }}>
              View all case studies
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div onClick={() => setActiveVideo(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "min(960px, 96vw)", position: "relative" }}>
            <button onClick={() => setActiveVideo(null)} style={{ position: "absolute", top: "-44px", right: 0, background: "transparent", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.62)", borderRadius: "8px", padding: "6px 16px", fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 300, cursor: "pointer", letterSpacing: "0.06em" }}>
              ESC / CLOSE
            </button>
            <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "#000" }}>
              <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&modestbranding=1&rel=0&showinfo=0`} allow="autoplay; fullscreen" allowFullScreen style={{ width: "100%", height: "100%", border: "none" }} />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .wt-pill {
          font-family: var(--font-bricolage);
          font-size: 11px;
          color: rgba(255,255,255,0.58);
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.05);
          font-weight: 300;
          letter-spacing: 0.04em;
          cursor: default;
          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease;
        }
        .wt-pill:hover {
          background: rgba(255,255,255,0.95);
          border-color: rgba(255,255,255,0.95);
          color: rgba(0,0,0,0.9);
          transform: translateY(-1px);
        }
        .wt-cta:hover {
          border-color: rgba(255,255,255,0.32) !important;
          background: rgba(255,255,255,0.09) !important;
          color: #fff !important;
          transform: translateY(-1px);
        }
        .wt-thumb:hover .wt-thumbImg { opacity: 0.92; transform: scale(1.04); }
        .wt-thumb:hover .wt-play { transform: scale(1.04); border-color: rgba(255,255,255,0.32); background: rgba(0,0,0,0.56); }

        @media (max-width: 820px) {
          .wt-row { grid-template-columns: 1fr !important; }
          .wt-left { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.09) !important; }
          .wt-right { padding: 22px 18px !important; }
          .wt-right > div[style*="grid-template-columns: 120px 1fr"] { grid-template-columns: 96px 1fr !important; }
          .wt-ctaDesktop { display: none !important; }
          .wt-ctaMobileWrap { display: flex !important; justify-content: flex-start; padding-top: 6px; }
        }
        @media (min-width: 821px) {
          .wt-ctaMobileWrap { display: none !important; }
        }
      `}</style>
    </>
  );
}