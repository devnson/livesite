"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const row1 = [
  {
    quote:
      "Tanosei took our security platform's story and made it feel like something people actually want to watch. Our sales team now leads every enterprise call with the video.",
    name: "Head of Marketing",
    company: "SecurityPal",
    detail: "Series B · Enterprise Security",
    headshot: "",
    videoId: "",
  },
  {
    quote:
      "What surprised me was how quickly they got the narrative right. One brief, one round of feedback, and we had something we're proud to put in front of CFOs.",
    name: "VP of Revenue",
    company: "Thera",
    detail: "Series A · Global Payroll",
    headshot: "",
    videoId: "",
  },
  {
    quote:
      "We've worked with bigger agencies that took longer and understood us less. Tanosei felt like a creative partner who actually cared about the outcome.",
    name: "Founder",
    company: "Openmart",
    detail: "Seed · B2B Commerce",
    headshot: "",
    videoId: "",
  },
  {
    quote:
      "The motion system they built scaled to every channel we needed — ads, social, product. We stopped treating video as a one-off.",
    name: "Marketing Lead",
    company: "Niural AI",
    detail: "Series A · HR Tech",
    headshot: "",
    videoId: "",
  },
  {
    quote: "14 days from brief to final file. No chasing, no re-briefs. Just clean execution every time.",
    name: "Head of Growth",
    company: "Elefta",
    detail: "Seed · Legal Tech",
    headshot: "",
    videoId: "",
  },
  {
    quote: "We had a complex story about AI in real estate. They turned it into something investors could understand in 90 seconds.",
    name: "Co-founder",
    company: "reAlpha",
    detail: "Series A · PropTech",
    headshot: "",
    videoId: "",
  },
];

const row2 = [
  {
    quote: "They nailed the tone on the first pass. No generic explainer energy — it actually sounded like us.",
    name: "Head of Brand",
    company: "Sunsama",
    detail: "Series A · Productivity",
    headshot: "",
    videoId: "",
  },
  {
    quote: "Every asset came with cutdowns we didn't have to ask for. They just thought ahead.",
    name: "Demand Gen Lead",
    company: "Ramp",
    detail: "Series C · Fintech",
    headshot: "",
    videoId: "",
  },
  {
    quote: "The video became our best-performing outbound asset within two weeks of going live.",
    name: "VP of Sales",
    company: "Aleph",
    detail: "Series B · Finance",
    headshot: "",
    videoId: "",
  },
  {
    quote: "We went into the call thinking we knew our story. Tanosei showed us a sharper version we hadn't considered.",
    name: "CEO",
    company: "Saral",
    detail: "Seed · Influencer Marketing",
    headshot: "",
    videoId: "",
  },
  {
    quote: "Fast, sharp, and zero handholding. Exactly what a lean marketing team needs.",
    name: "Marketing Manager",
    company: "Elefta",
    detail: "Seed · Legal Tech",
    headshot: "",
    videoId: "",
  },
  {
    quote: "Our investors watched it before the pitch. That's when we knew it worked.",
    name: "Founder",
    company: "reAlpha",
    detail: "Series A · PropTech",
    headshot: "",
    videoId: "",
  },
];

type CardItem = (typeof row1)[0];

function useIsMobile(bp = 520) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, [bp]);
  return isMobile;
}

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const isMobile = useIsMobile(520);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      }
    );
  }, []);

  const doubled1 = useMemo(() => [...row1, ...row1], []);
  const doubled2 = useMemo(() => [...row2, ...row2], []);

  // ✅ Mobile shrink controls (only affects <= 520px)
  const S = isMobile ? 0.86 : 1; // overall scale factor for card typography + paddings
  const CARD_W = isMobile ? 288 : 340;
  const PAD = Math.round((isMobile ? 18 : 24) * S);
  const GAP = isMobile ? 12 : 16;

  const quoteMarkSize = isMobile ? 30 : 36;
  const quoteFont = isMobile ? 12.4 : 13.5;
  const nameFont = isMobile ? 12.2 : 13;
  const metaFont = isMobile ? 10.4 : 11;

  const avatar = isMobile ? 32 : 36;

  const fadeW = isMobile ? 74 : 120;
  const sectionPadY = isMobile ? 84 : 120;
  const headerPadX = isMobile ? 20 : 28;
  const railPadLeft = isMobile ? 20 : 28;
  const headerBottom = isMobile ? 40 : 56;

  const renderCard = (t: CardItem, i: number) => {
    const initials = t.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const thumbUrl = t.videoId ? `https://img.youtube.com/vi/${t.videoId}/hqdefault.jpg` : null;

    return (
      <div
        key={i}
        style={{
          width: `${CARD_W}px`,
          flexShrink: 0,
          borderRadius: isMobile ? "14px" : "16px",
          border: "1px solid rgba(255,255,255,0.09)",
          background: "rgba(255,255,255,0.03)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "border-color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.18)";
          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.09)";
          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
        }}
      >
        {thumbUrl && (
          <div
            onClick={() => setActiveVideo(t.videoId)}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              background: "#111",
              cursor: "pointer",
              overflow: "hidden",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={thumbUrl}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.78,
                transition: "opacity 0.3s, transform 0.4s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "1";
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.78";
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  width: isMobile ? "42px" : "48px",
                  height: isMobile ? "42px" : "48px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.14)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width={isMobile ? "13" : "14"} height={isMobile ? "15" : "16"} viewBox="0 0 14 16" fill="white" style={{ marginLeft: "2px" }}>
                  <path d="M0 0L14 8 0 16z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        <div style={{ padding: `${PAD}px`, display: "flex", flexDirection: "column", gap: isMobile ? "14px" : "18px", flex: 1 }}>
          {/* quote mark */}
          <div
            style={{
              fontSize: `${quoteMarkSize}px`,
              lineHeight: 1,
              color: "rgba(255,255,255,0.12)",
              fontWeight: 800,
              marginTop: "-4px",
              fontFamily: "Georgia, serif",
            }}
          >
            "
          </div>

          <p
            style={{
              fontSize: `${quoteFont}px`,
              color: "rgba(255,255,255,0.80)",
              lineHeight: isMobile ? 1.65 : 1.75,
              margin: 0,
              flex: 1,
            }}
          >
            {t.quote}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "10px" : "12px",
              paddingTop: isMobile ? "12px" : "16px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                width: `${avatar}px`,
                height: `${avatar}px`,
                borderRadius: "50%",
                flexShrink: 0,
                overflow: "hidden",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "11px" : "12px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {t.headshot ? <img src={t.headshot} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
            </div>

            <div>
              <p style={{ fontSize: `${nameFont}px`, fontWeight: 600, color: "rgba(255,255,255,0.82)", margin: "0 0 2px 0" }}>{t.name}</p>
              <p style={{ fontSize: `${metaFont}px`, color: "rgba(255,255,255,0.48)", margin: 0 }}>
                {t.company} · {t.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        style={{
          padding: `${sectionPadY}px 0`,
          background: "#0d0d0d",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
            padding: `0 ${headerPadX}px`,
            marginBottom: `${headerBottom}px`,
            opacity: 0,
          }}
        >
          <p
            style={{
              fontSize: isMobile ? "10.5px" : "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.52)",
              marginBottom: isMobile ? "12px" : "16px",
              fontWeight: 600,
            }}
          >
            Client Words
          </p>
          <h2
            style={{
              fontFamily: "var(--font-dm)",
              fontWeight: 800,
              fontSize: "clamp(30px, 6.2vw, 56px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              color: "#fff",
            }}
          >
            <span style={{ fontWeight: 300 }}>Don't take</span> our word for it.
          </h2>
        </div>

        {/* ROW 1 */}
        <div style={{ position: "relative", width: "100%", overflow: "hidden", marginBottom: `${GAP}px` }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${fadeW}px`, background: "linear-gradient(to right, #080808, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${fadeW}px`, background: "linear-gradient(to left, #080808, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div
            style={{
              display: "flex",
              gap: `${GAP}px`,
              width: "max-content",
              animation: "tickerLTR 60s linear infinite",
              animationPlayState: paused ? "paused" : "running",
              paddingLeft: `${railPadLeft}px`,
            }}
          >
            {doubled1.map((t, i) => renderCard(t, i))}
          </div>
        </div>

        {/* ROW 2 */}
        <div style={{ position: "relative", width: "100%", overflow: "hidden" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${fadeW}px`, background: "linear-gradient(to right, #080808, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${fadeW}px`, background: "linear-gradient(to left, #080808, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div
            style={{
              display: "flex",
              gap: `${GAP}px`,
              width: "max-content",
              animation: "tickerRTL 66s linear infinite",
              animationPlayState: paused ? "paused" : "running",
              paddingLeft: `${railPadLeft}px`,
            }}
          >
            {doubled2.map((t, i) => renderCard(t, i))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(900px, 96vw)", position: "relative" }}>
            <button
              onClick={() => setActiveVideo(null)}
              style={{
                position: "absolute",
                top: "-44px",
                right: 0,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.7)",
                borderRadius: "8px",
                padding: "6px 14px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              ✕ Close
            </button>
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "#000",
              }}
            >
              <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} allow="autoplay; fullscreen" style={{ width: "100%", height: "100%", border: "none" }} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes tickerLTR {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tickerRTL {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* Extra tightening for very small devices */
        @media (max-width: 380px) {
          /* This section is already responsive via JS, but this keeps it safe */
        }
      `}</style>
    </>
  );
}