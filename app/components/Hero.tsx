"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

type Logo = {
  name: string;
  src: string;
  w: number;
  url: string;
};

const logos: Logo[] = [
  { name: "Composio", src: "/logos/white/Composio.svg", w: 150, url: "https://www.linkedin.com/company/composiohq/" },
  { name: "DocUnlock", src: "/logos/white/docunlock.svg", w: 120, url: "https://www.linkedin.com/company/docunlock-ai" },
  { name: "Niural", src: "/logos/white/niural.svg", w: 160, url: "https://www.linkedin.com/company/niural/" },
  { name: "reAlpha", src: "/logos/white/realpha.svg", w: 135, url: "https://www.linkedin.com/company/realpha-homes/" },
  { name: "SecurityPal", src: "/logos/white/SecurityPal.svg", w: 185, url: "https://www.linkedin.com/company/securitypalhq/" },
  { name: "Thera", src: "/logos/white/thera.svg", w: 120, url: "https://www.linkedin.com/company/getthera/" },
  { name: "Aleph", src: "/logos/white/aleph.svg", w: 115, url: "https://www.linkedin.com/company/getaleph/" },
];

function Strip({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="logoStrip" aria-hidden={ariaHidden ? "true" : undefined}>
      {logos.map((logo) => (
        <a
          key={logo.name}
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="logoItem"
          title={`Visit ${logo.name}`}
        >
          <div className="logoBox" style={{ width: `${logo.w}px` }}>
            <Image src={logo.src} alt={logo.name} fill className="logoImg" sizes="200px" />
          </div>
        </a>
      ))}
    </div>
  );
}

function LogoMarquee() {
  return (
    <section className="logoMarquee" aria-label="Trusted by teams at">
      <div className="logoContainer">
        <div className="logoKicker">TRUSTED BY TEAMS AT</div>

        <div className="logoRow">
          <div className="logoMarqueeInner">
            <Strip />
            <Strip ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}

const words = ["obvious.", "land.", "sell."];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // ── MOBILE DETECT ──
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 520px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  // ── ROTATING WORD ──
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // ── GSAP ENTRANCE ──
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headlineRef.current ? Array.from(headlineRef.current.children) : [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }
    )
      .fromTo(ledeRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(ctaRef.current, { opacity: 0, y: 16, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, "-=0.3")
      .fromTo(logoRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.15");
  }, []);

  return (
    <section
      style={{
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: isMobile ? "flex-start" : "center",
        padding: isMobile ? "92px 18px 56px" : "112px 24px 64px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── BACKGROUND GLOW ── */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? "24%" : "36%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "520px" : "760px",
          height: isMobile ? "340px" : "460px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.028)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      {/* ── HEADLINE ── */}
      <h1
        ref={headlineRef}
        style={{
          fontFamily: "var(--font-dm)",
          fontWeight: 300,
          fontSize: "clamp(40px, 9.2vw, 88px)",
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
          margin: 0,
          padding: 0,
        }}
      >
        <span style={{ fontWeight: 300, opacity: 0 }}>Make complex</span>{" "}
        <span style={{ fontWeight: 800, opacity: 0 }}>products</span>{" "}
        <span
          style={{
            fontWeight: 800,
            display: "inline-block",
            transition: "opacity 0.3s, transform 0.3s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
          }}
        >
          {words[index]}
        </span>
      </h1>

      {/* ── LEDE ── */}
      <p
        ref={ledeRef}
        style={{
          marginTop: isMobile ? "18px" : "28px",
          fontSize: isMobile ? "15px" : "17px",
          color: "rgba(255,255,255,0.45)",
          maxWidth: isMobile ? "420px" : "520px",
          lineHeight: 1.7,
          fontWeight: 300,
          opacity: 0,
        }}
      >
        We work alongside your marketing team to shape the narrative and ship the visuals{" "}
        <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>fast, consistent.</strong>
      </p>

      {/* ── CTA BUTTONS ── */}
      <div
        ref={ctaRef}
        style={{
          marginTop: isMobile ? "22px" : "36px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: 0,
        }}
      >
        <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer" className="premiumBtn">
          <div className="rimGlow" />
          <div className="btnInnerCover" />
          <span className="btnText">Book a Clarity Call</span>
          <span className="iconBubble">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </a>

        <a href="#walkthroughs" className="ghostBtn">
          See How It Works
        </a>
      </div>

      {/* ── SCROLL HINT ── */}
      <div
        style={{
          marginTop: isMobile ? "28px" : "56px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "10.5px",
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <div style={{ width: "28px", height: "1px", background: "linear-gradient(to right, rgba(255,255,255,0.25), transparent)" }} />
        Scroll to explore
      </div>

      {/* ── LOGO STRIP (MOVED BELOW SCROLL HINT) ── */}
      <div ref={logoRef} style={{ width: "100%", maxWidth: "920px", marginTop: isMobile ? "22px" : "250px", opacity: 0 }}>
        <LogoMarquee />
      </div>

      <style>{`
        /* ─────────────────────────────
           LOGO MARQUEE STYLES
        ───────────────────────────── */
        .logoMarquee{
          width: 100%;
          margin-top: 0;
          margin-bottom: 0;
        }
        .logoContainer{
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
        }
        .logoKicker{
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.20);
          font-weight: 600;
          margin-bottom: 12px;
        }
        .logoRow{
          position: relative;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.012);
          border-radius: 14px;
          overflow: hidden;
          padding: 12px 0;
        }
        .logoRow:before, .logoRow:after{
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 64px;
          z-index: 2;
          pointer-events: none;
        }
        .logoRow:before{
          left: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0));
        }
        .logoRow:after{
          right: 0;
          background: linear-gradient(to left, rgba(0,0,0,0.65), rgba(0,0,0,0));
        }

        .logoMarqueeInner{
          display: flex;
          width: max-content;
          gap: 0;
          animation: marquee 22s linear infinite;
          will-change: transform;
        }
        @keyframes marquee{
          0%{ transform: translateX(0); }
          100%{ transform: translateX(-50%); }
        }

        .logoStrip{
          display: flex;
          align-items: center;
          gap: 26px;
          padding: 0 20px;
        }
        .logoItem{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          opacity: 0.62;
          transition: opacity .2s ease, transform .2s ease;
          z-index: 3;
        }
        .logoItem:hover{
          opacity: 0.95;
          transform: translateY(-1px);
        }

        .logoBox{
          position: relative;
          height: 18px;
        }
        .logoImg{ object-fit: contain; }

        @media (max-width: 520px){
          .logoContainer{ max-width: 520px; }
          .logoRow{ border-radius: 12px; }
          .logoKicker{ margin-bottom: 10px; }
          .logoStrip{ gap: 20px; padding: 0 14px; }
          .logoBox{ height: 16px; }
          .logoRow:before, .logoRow:after{ width: 42px; }
        }

        @media (prefers-reduced-motion: reduce){
          .logoMarqueeInner{ animation: none; transform: none; }
        }
      `}</style>
    </section>
  );
}