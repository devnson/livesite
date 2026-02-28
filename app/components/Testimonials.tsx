"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const row1 = [
  {
    quote: "We'd been trying to visualize productivity concepts for social for years. Sushan understood the brand instinctively — and kept delivering across three years without us having to re-explain ourselves.",
    name: "Ashutosh Priyadarshy",
    role: "Founder",
    company: "Sunsama",
    detail: "Productivity · Social Content",
    headshot: "https://media.licdn.com/dms/image/v2/C4D03AQEsfB4yQxh1rQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516525779905?e=1773878400&v=beta&t=eSAfUJhEeZalrDX2Fu4XnAT95xD0hTinaIIMeaAcvq0",
    videoId: "",
    linkedin: "https://www.linkedin.com/in/ashutoshpriyadarshy/",
  },
  {
    quote: "The process was frictionless. We had a complex concept, a tight timeline, and they just moved — clean system, no back-and-forth. The whole team was impressed.",
    name: "Lucas Goransky",
    role: "Co-founder",
    company: "Aleph",
    detail: "Fintech · Series B",
    headshot: "https://media.licdn.com/dms/image/v2/D4D03AQFtv5upv1ad3g/profile-displayphoto-scale_400_400/B4DZfB26VGGUAg-/0/1751304087625?e=1773878400&v=beta&t=67zhD5R7x72865ZICP4U7loAjl6_JCZ5M9MLzskuXd0",
    videoId: "",
    linkedin: "https://www.linkedin.com/in/lucasgoransky/",
  },
  {
    quote: "Despite the complexity of what we're building, they made it visual — and our sales team actually uses it. That's not easy to do with deep tech.",
    name: "Kathryn Wu",
    role: "Co-founder",
    company: "Openmart",
    detail: "B2B Commerce · Seed",
    headshot: "https://media.licdn.com/dms/image/v2/D5603AQEN_mLXZdnWbA/profile-displayphoto-scale_400_400/B56Zhsyjg7HQAk-/0/1754171849346?e=1773878400&v=beta&t=3OWE2VwmYaszvXR8VAU-hwTJLOPvr0HsaruaWstc0Zk",
    videoId: "",
    linkedin: "https://www.linkedin.com/in/kathrynwoohoo/",
  },
  {
    quote: "They broke down our legal tech in a way that felt approachable without dumbing it down. The video went straight into our marketing stack.",
    name: "Team",
    role: "",
    company: "Elefta",
    detail: "Legal Tech · Seed",
    headshot: "",
    videoId: "",
    linkedin: "",
  },
  {
    quote: "They brought our PropTech concepts to life visually — three videos in, and the quality actually got sharper each time. They understood what we were building.",
    name: "Marketing Head",
    role: "",
    company: "reAlpha",
    detail: "PropTech · Series A",
    headshot: "",
    videoId: "",
    linkedin: "",
  },
  {
    quote: "What stuck with me wasn't just the output — it was the framework they brought. For a single video project, they gave us a clear lens on how creative strategy should work.",
    name: "Nabin Banskota",
    role: "Co-founder",
    company: "Niural AI",
    detail: "HR Tech · Series A",
    headshot: "https://media.licdn.com/dms/image/v2/D5603AQEY5CWac6klMQ/profile-displayphoto-scale_400_400/B56ZfhAbICGQAk-/0/1751826674923?e=1773878400&v=beta&t=WFwJYbkO8bsNcZnojZl8WKWjPrMRvDWIIMQs4PV94Ws",
    videoId: "",
    linkedin: "https://www.linkedin.com/in/nabinbanskota/",
  },
];

const row2 = [
  {
    quote: "Three years, consistent quality, zero re-briefing. Sushan just gets it — the brand, the tone, the audience. That's rare.",
    name: "Ashutosh Priyadarshy",
    role: "Founder",
    company: "Sunsama",
    detail: "Productivity · Social Content",
    headshot: "https://media.licdn.com/dms/image/v2/C4D03AQEsfB4yQxh1rQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516525779905?e=1773878400&v=beta&t=eSAfUJhEeZalrDX2Fu4XnAT95xD0hTinaIIMeaAcvq0",
    videoId: "",
    linkedin: "https://www.linkedin.com/in/ashutoshpriyadarshy/",
  },
  {
    quote: "We had complex customs automation to explain to an audience that's skeptical by default. They made it legible without losing the technical credibility.",
    name: "Sepehr F.",
    role: "Founder",
    company: "DocUnlock",
    detail: "Trade Compliance · AI",
    headshot: "https://media.licdn.com/dms/image/v2/D5603AQEepBbTI5j0Yw/profile-displayphoto-shrink_400_400/B56ZVEI0CUHsAo-/0/1740604916477?e=1773878400&v=beta&t=ETt3C1q9NHvtfp1f3Q-MkxtMiko4IdfmXwm41T0ize4",
    videoId: "",
    linkedin: "https://www.linkedin.com/in/sepehr-f/",
  },
  {
    quote: "Efficiency was the word that kept coming up internally. They had a system — and it showed in how smooth the whole process was.",
    name: "Yucheng He",
    role: "Co-founder",
    company: "Openmart",
    detail: "B2B Commerce · Seed",
    headshot: "https://media.licdn.com/dms/image/v2/D5635AQGNVyV6K0ZBXA/profile-framedphoto-shrink_400_400/B56ZYcg6kWH0Ak-/0/1744235113112?e=1772870400&v=beta&t=CiFSsAl5YQlOI77YuWjr5fN_GPg2sux3MT7OeKutlSA",
    videoId: "",
    linkedin: "https://www.linkedin.com/in/yuchenghe/",
  },
  {
    quote: "They were cheap when we first worked together, and they were still better than people who charged more. The visual thinking was always there.",
    name: "Marketing Head",
    role: "",
    company: "reAlpha",
    detail: "PropTech · Series A",
    headshot: "",
    videoId: "",
    linkedin: "",
  },
  {
    quote: "The video made our workflow feel trustworthy — not just explainable. That distinction mattered a lot for the kind of buyers we're going after.",
    name: "Jonathan Moberger",
    role: "Marketing",
    company: "DocUnlock",
    detail: "Trade Compliance · AI",
    headshot: "https://media.licdn.com/dms/image/v2/D4E03AQFaKE9crxHfOw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1681855699853?e=1773878400&v=beta&t=9TBeKtwNuOZ5GtkrYEuXNcYFMY2Z_EC9C2rM4qJb7vw",
    videoId: "",
    linkedin: "https://www.linkedin.com/in/jmoberger/",
  },
  {
    quote: "They translated a genuinely hard product into something our non-technical prospects could grasp in 90 seconds. Sales started using it immediately.",
    name: "Nabin Banskota",
    role: "Co-founder",
    company: "Niural AI",
    detail: "HR Tech · Series A",
    headshot: "https://media.licdn.com/dms/image/v2/D5603AQEY5CWac6klMQ/profile-displayphoto-scale_400_400/B56ZfhAbICGQAk-/0/1751826674923?e=1773878400&v=beta&t=WFwJYbkO8bsNcZnojZl8WKWjPrMRvDWIIMQs4PV94Ws",
    videoId: "",
    linkedin: "https://www.linkedin.com/in/nabinbanskota/",
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

  const S = isMobile ? 0.86 : 1;
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

    const CardWrapper = ({ children }: { children: React.ReactNode }) =>
      t.linkedin ? (
        <a
          href={t.linkedin}
          target="_blank"
          rel="noopener noreferrer"
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
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.22)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.09)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
          }}
        >
          {children}
        </a>
      ) : (
        <div
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
          {children}
        </div>
      );

    return (
      <CardWrapper key={i}>
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
              <p style={{ fontSize: `${nameFont}px`, fontWeight: 600, color: "rgba(255,255,255,0.82)", margin: "0 0 2px 0" }}>
                {t.name}
                {t.linkedin && (
                  <span style={{ display: "inline-flex", alignItems: "center", marginLeft: "5px", opacity: 0.4 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                )}
              </p>
              <p style={{ fontSize: `${metaFont}px`, color: "rgba(255,255,255,0.48)", margin: 0 }}>
                {t.role ? `${t.role}, ` : ""}{t.company}
              </p>
            </div>
          </div>
        </div>
      </CardWrapper>
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

        {/* ROW 1 — LTR */}
        <div style={{ position: "relative", width: "100%", overflow: "hidden", marginBottom: `${GAP}px` }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${fadeW}px`, background: "linear-gradient(to right, #0d0d0d, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${fadeW}px`, background: "linear-gradient(to left, #0d0d0d, transparent)", zIndex: 2, pointerEvents: "none" }} />
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

        {/* ROW 2 — RTL */}
        <div style={{ position: "relative", width: "100%", overflow: "hidden" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${fadeW}px`, background: "linear-gradient(to right, #0d0d0d, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${fadeW}px`, background: "linear-gradient(to left, #0d0d0d, transparent)", zIndex: 2, pointerEvents: "none" }} />
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

      {/* VIDEO LIGHTBOX */}
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
      `}</style>
    </>
  );
}