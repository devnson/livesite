"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stat = { n: string; l: string };
type CardData = {
  tag: string; name: string; where: string;
  gif: string; gt: string;
  modal: {
    title: string; desc: string; stats: Stat[];
    videoId: string;
    caseUrl: string;
  };
};
type ModalData = CardData["modal"] & { gt: string };

const cards: CardData[] = [
  {
    tag: "AI Infra · SaaS",
    name: "DocUnlock — Feature Launch Walkthrough",
    where: "Explainer → landing + sales enablement",
    gif: "https://framerusercontent.com/images/yNs8rP2D4soCiX7eNIR9FJp3zI.gif",
    gt: "gt-1",
    modal: {
      title: "DocUnlock — Feature Launch Walkthrough",
      desc: "A clean, buyer-legible walkthrough designed for landing pages and sales reuse. Built around the moment of insight — the instant the feature becomes obvious.",
      stats: [{ n: "14 days", l: "Delivery" }, { n: "Hero + cutdowns", l: "Package" }, { n: "Landing + sales", l: "Used in" }],
      videoId: "0WjL6oWzHUg",
      caseUrl: "/case-studies/docunlock-case",
    },
  },
  {
    tag: "Series B · Announcement",
    name: "Aleph — Funding Film",
    where: "Launch film → Series B announcement",
    gif: "https://framerusercontent.com/images/MUc9I5El4kfxCqYc27XFGeOFqUo.gif",
    gt: "gt-4",
    modal: {
      title: "Aleph — Funding Announcement Film",
      desc: "Authority-first announcement video delivered on a fast track. Built to land with investors, press, and future hires.",
      stats: [{ n: "7 days", l: "Fast-track" }, { n: "Hero + cutdowns", l: "Package" }, { n: "Press + hiring", l: "Used in" }],
      videoId: "7sbP3rOhPec",
      caseUrl: "/case-studies/aleph-case",
    },
  },
  {
    tag: "Security · Assurance",
    name: "SecurityPal Film",
    where: "SecurityPal Brand Video",
    gif: "https://framerusercontent.com/images/ncaXWYv5fXVfX9wvB6AWJycHjog.gif",
    gt: "gt-2",
    modal: {
      title: "SecurityPal Film",
      desc: "A platform-native series designed for repeatable distribution — not a one-off post. Built for clarity + recall.",
      stats: [{ n: "Series", l: "Format" }, { n: "Weekly cadence", l: "System" }, { n: "Social", l: "Used in" }],
      videoId: "azDJfHvwpEY",
      caseUrl: "/case-studies/securitypal-case",
    },
  },
  {
    tag: "B2B · Fintech",
    name: "Niural Product Demo",
    where: "Brand clarity → landing + outbound",
    gif: "https://framerusercontent.com/images/BmmRR8wJ0tVQ7S2C55bfSfSRNQ.gif",
    gt: "gt-5",
    modal: {
      title: "Niural Product Demo",
      desc: "A hard-to-explain value prop turned into an instantly legible story for buyers. Built to reduce explanation load in outbound + sales.",
      stats: [{ n: "B2B", l: "Audience" }, { n: "Product demo", l: "Type" }, { n: "Landing + outbound", l: "Used in" }],
      videoId: "qC7YyUs9YNA",
      caseUrl: "/case-studies/niural-case",
    },
  },
  {
    tag: "AI · Real Estate",
    name: "reAlpha — Product Demo",
    where: "Demo → Customer + Demo",
    gif: "https://framerusercontent.com/images/flJCGvLOREpiUtVBf9UbTqr6qtM.gif?scale-down-to=512&width=542&height=304",
    gt: "gt-3",
    modal: {
      title: "reAlpha — Product Demo",
      desc: "A product demo built to make the AI feel tangible and trustworthy — not abstract. Used as a sales + investor clarity asset.",
      stats: [{ n: "Demo", l: "Type" }, { n: "Customer", l: "Used in" }, { n: "Clarity asset", l: "Outcome" }],
      videoId: "xRGp8VLp8Us",
      caseUrl: "/case-studies/realpha-case",
    },
  },
];

function PlayIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
      <path d="M1 1.5L14.5 9 1 16.5V1.5z" />
    </svg>
  );
}

function WorkCard({
  card,
  onClick,
  size = "normal",
}: {
  card: CardData;
  onClick: () => void;
  size?: "hero" | "normal" | "small";
}) {
  const [hovered, setHovered] = useState(false);

  const titleSize =
    size === "hero"   ? "clamp(16px, 1.8vw, 22px)" :
    size === "normal" ? "15px" : "13.5px";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: "10px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.09)"}`,
        background: "#0d0d0d",
        width: "100%",
        height: "100%",
        transition: "border-color 0.25s, box-shadow 0.35s",
        boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.7)" : "none",
      }}
    >
      <img
        src={card.gif}
        alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          opacity: hovered ? 0.92 : 0.82,
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "opacity 0.4s, transform 0.6s cubic-bezier(0.2,0.8,0.3,1)",
        }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.82) 100%)",
      }} />

      {/* TAG — nowrap + ellipsis so it never wraps on small cards */}
      <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", zIndex: 4 }}>
        <span style={{
          display: "inline-block",
          maxWidth: "100%",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.82)",
          background: "rgba(0,0,0,0.52)",
          backdropFilter: "blur(10px)",
          padding: "3px 8px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {card.tag}
        </span>
      </div>

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 3, pointerEvents: "none",
        opacity: 1,
        transition: "opacity 0.22s",
      }}>
        <div style={{
          width: "54px", height: "54px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.30)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff",
          transform: hovered ? "scale(1)" : "scale(0.8)",
          transition: "transform 0.3s cubic-bezier(0.2,0.8,0.3,1)",
        }}>
          <PlayIcon />
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: size === "hero" ? "22px 20px" : "14px",
        zIndex: 4,
      }}>
        <div style={{
          fontFamily: "var(--font-dm)",
          fontSize: titleSize,
          fontWeight: 600,
          color: "#ffffff",
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
          marginBottom: "4px",
        }}>
          {card.name}
        </div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", fontWeight: 400, lineHeight: 1.4 }}>
          {card.where}
        </div>
      </div>
    </div>
  );
}

export default function RecentWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const btnRef     = useRef<HTMLAnchorElement>(null);
  const [modal, setModal]     = useState<ModalData | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 88%" } });
    gsap.fromTo(gridRef.current, { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" } });
    gsap.fromTo(btnRef.current, { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: btnRef.current, start: "top 95%" } });
  }, []);

  return (
    <>
      <section
        id="recent-work"
        ref={sectionRef}
        style={{ padding: isMobile ? "80px 16px 0" : "120px 28px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* HEADER */}
          <div ref={headerRef} style={{ marginBottom: "28px", opacity: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.52)", marginBottom: "12px", fontWeight: 600,
            }}>
              <span style={{ display: "inline-block", width: "18px", height: "1px", background: "rgba(255,255,255,0.28)", flexShrink: 0 }} />
              Recent Work
            </div>
            <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "flex-end", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: "16px" }}>
              <h2 style={{
                fontFamily: "var(--font-dm)", fontWeight: 700,
                fontSize: isMobile ? "clamp(24px, 7vw, 34px)" : "clamp(28px, 3.8vw, 50px)",
                letterSpacing: "-0.035em", lineHeight: 1.06, margin: 0, color: "#fff",
              }}>
                Every frame built to make{" "}
                <span style={{ color: "rgba(255,255,255,0.52)", fontWeight: 400 }}>buyers confident.</span>
              </h2>
              <a
                href="/error/"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "10px 20px", borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.78)",
                  fontSize: "13px", fontWeight: 600,
                  textDecoration: "none", fontFamily: "var(--font-dm)",
                  whiteSpace: "nowrap", flexShrink: 0,
                  transition: "border-color 0.2s, background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.32)"; el.style.background = "rgba(255,255,255,0.09)"; el.style.color = "#fff"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.16)"; el.style.background = "rgba(255,255,255,0.04)"; el.style.color = "rgba(255,255,255,0.78)"; }}
              >
                View all work
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>

          {/* GRID */}
          <div ref={gridRef} style={{ opacity: 0 }}>
            {isMobile ? (
              // MOBILE: single column stack, natural heights
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {/* Hero card */}
                <div style={{ height: "240px" }}>
                  <WorkCard card={cards[0]} onClick={() => setModal({ ...cards[0].modal, gt: cards[0].gt })} size="hero" />
                </div>
                {/* 2-col grid for remaining */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {cards.slice(1).map(card => (
                    <div key={card.name} style={{ height: "180px" }}>
                      <WorkCard card={card} onClick={() => setModal({ ...card.modal, gt: card.gt })} size="small" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // DESKTOP: unchanged layout
              <>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "55fr 45fr",
                  gap: "8px",
                  marginBottom: "8px",
                  height: "420px",
                }}>
                  <WorkCard card={cards[0]} onClick={() => setModal({ ...cards[0].modal, gt: cards[0].gt })} size="hero" />
                  <WorkCard card={cards[1]} onClick={() => setModal({ ...cards[1].modal, gt: cards[1].gt })} size="normal" />
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                  height: "270px",
                }}>
                  {cards.slice(2).map(card => (
                    <WorkCard key={card.name} card={card} onClick={() => setModal({ ...card.modal, gt: card.gt })} size="small" />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* VIEW FULL LIBRARY */}
          <a
            ref={btnRef}
            href="/error/"
            style={{
              display: "flex", alignItems: "center",
              marginTop: "8px",
              justifyContent: "center",
              gap: "10px", width: "100%",
              padding: "18px 0",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.025)",
              color: "rgba(255,255,255,0.62)",
              fontSize: "13.5px", fontWeight: 600,
              fontFamily: "var(--font-dm)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
              opacity: 0,
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.06)"; el.style.color = "#fff"; el.style.borderColor = "rgba(255,255,255,0.18)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.025)"; el.style.color = "rgba(255,255,255,0.62)"; el.style.borderColor = "rgba(255,255,255,0.09)"; }}
          >
            View full library
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>

        </div>
      </section>

      {/* MODAL */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "min(680px, 96vw)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "#0d0d0d",
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(0,0,0,0.9)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ width: "100%", aspectRatio: "16/9", position: "relative", background: "#111", overflow: "hidden" }}>
              {modal.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${modal.videoId}?modestbranding=1&rel=0&showinfo=0&color=white`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)" }}>
                    <PlayIcon />
                  </div>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.42)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Video coming soon</span>
                </div>
              )}
            </div>

            <div style={{ padding: isMobile ? "20px" : "28px 32px 32px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.52)", marginBottom: "8px", fontWeight: 600 }}>Case Study</p>
              <h3 style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: isMobile ? "17px" : "20px", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "12px", color: "#fff" }}>{modal.title}</h3>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: "22px" }}>{modal.desc}</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.09)", borderRadius: "10px", overflow: "hidden", marginBottom: "24px" }}>
                {modal.stats.map(s => (
                  <div key={s.l} style={{ background: "#0d0d0d", padding: "16px 10px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", marginBottom: "4px", color: "#fff" }}>{s.n}</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.52)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={modal.caseUrl}
                  style={{ padding: "11px 24px", borderRadius: "10px", background: "white", color: "black", fontSize: "13.5px", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "7px", transition: "opacity 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                >
                  View full case study →
                </a>
                <button
                  onClick={() => setModal(null)}
                  style={{ padding: "11px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.60)", fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-dm)" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}