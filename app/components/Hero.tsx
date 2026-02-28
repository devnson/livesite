"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

type Logo = { name: string; src: string; w: number; url: string };

const logos: Logo[] = [
  { name: "Composio",    src: "/logos/white/Composio.svg",    w: 90,  url: "https://www.linkedin.com/company/composiohq/" },
  { name: "DocUnlock",   src: "/logos/white/docunlock.svg",   w: 80,  url: "https://www.linkedin.com/company/docunlock-ai" },
  { name: "Niural",      src: "/logos/white/niural.svg",      w: 90,  url: "https://www.linkedin.com/company/niural/" },
  { name: "reAlpha",     src: "/logos/white/realpha.svg",     w: 80,  url: "https://www.linkedin.com/company/realpha-homes/" },
  { name: "SecurityPal", src: "/logos/white/SecurityPal.svg", w: 110, url: "https://www.linkedin.com/company/securitypalhq/" },
  { name: "Thera",       src: "/logos/white/thera.svg",       w: 72,  url: "https://www.linkedin.com/company/getthera/" },
  { name: "Aleph",       src: "/logos/white/aleph.svg",       w: 70,  url: "https://www.linkedin.com/company/getaleph/" },
];

const words = ["obvious.", "land.", "sell."];

export default function Hero() {
  const [index, setIndex]       = useState(0);
  const [visible, setVisible]   = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ledeRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex((p) => (p + 1) % words.length); setVisible(true); }, 300);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (headlineRef.current)
      tl.fromTo(Array.from(headlineRef.current.children), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 });
    tl.fromTo(ledeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(ctaRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(logoRef.current, { opacity: 0 },        { opacity: 1,        duration: 0.6 }, "-=0.1");
  }, []);

  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        padding: isMobile ? "100px 24px 0" : "112px 24px 64px",
        textAlign: isMobile ? "left" : "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND GLOW */}
      <div style={{
        position: "absolute",
        top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMobile ? "500px" : "760px",
        height: isMobile ? "400px" : "460px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.025)",
        filter: "blur(110px)",
        pointerEvents: "none",
      }} />

      {/* MAIN CONTENT */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "flex-start" : "center",
        width: "100%",
        flex: 1,
        justifyContent: "center",
        paddingBottom: isMobile ? "32px" : "0",
      }}>

        {/* HEADLINE */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-dm)",
            fontWeight: 300,
            fontSize: isMobile ? "clamp(40px, 11.5vw, 54px)" : "clamp(40px, 9.2vw, 88px)",
            lineHeight: 1.06,
            letterSpacing: "-0.035em",
            margin: 0,
            padding: 0,
          }}
        >
          <span style={{ opacity: 0, display: "block", fontWeight: 300 }}>Make complex</span>
          <span style={{ opacity: 0 }}>
            <span style={{ fontWeight: 800 }}>products </span>
            <span style={{
              fontWeight: 800,
              display: "inline-block",
              transition: "opacity 0.3s, transform 0.3s",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-10px)",
            }}>
              {words[index]}
            </span>
          </span>
        </h1>

        {/* LEDE */}
        <p
          ref={ledeRef}
          style={{
            marginTop: isMobile ? "20px" : "28px",
            fontSize: isMobile ? "16px" : "17px",
            color: "rgba(255,255,255,0.48)",
            maxWidth: isMobile ? "100%" : "520px",
            lineHeight: 1.75,
            fontWeight: 400,
            opacity: 0,
            margin: `${isMobile ? 20 : 28}px 0 0 0`,
          }}
        >
          We help GTM teams turn complex products into structured, repeatable video systems that{" "}
          <strong style={{ color: "rgba(255,255,255,0.82)", fontWeight: 600 }}>educate buyers, strengthen positioning, and accelerate sales.</strong>
        </p>

        {/* CTA BUTTONS */}
        <div
          ref={ctaRef}
          style={{
            marginTop: isMobile ? "28px" : "36px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: isMobile ? "100%" : "auto",
            opacity: 0,
          }}
        >
          <a
            href="https://cal.com/tanoseihito/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="premiumBtn"
            style={{ justifyContent: "center" }}
          >
            <div className="rimGlow" />
            <div className="btnInnerCover" />
            <span className="btnText">Book a Clarity Call</span>
            <span className="iconBubble">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>

          <a
            href="#recent-work"
            className="ghostBtn"
            style={{ textAlign: "center" }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("recent-work")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            See How It Works
          </a>
        </div>
      </div>

      {/* LOGO STRIP */}
      <div ref={logoRef} style={{ width: "100%", opacity: 0 }}>
        <p style={{
          fontSize: "10px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)",
          fontWeight: 600,
          margin: "0 0 14px 0",
          textAlign: isMobile ? "left" : "center",
        }}>
          Trusted by teams at
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "flex-start" : "center",
          flexWrap: "wrap",
          gap: isMobile ? "24px 20px" : "0 44px",
        }}>
          {logos.map((logo) => (
            <a
              key={logo.name}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              title={logo.name}
              style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                style={{
                  // ── ONLY CHANGE: desktop logos are 1.35× bigger and 0.85 opacity ──
                  width: `${isMobile ? Math.round(logo.w * 0.72) : Math.round(logo.w * 1.35)}px`,
                  height: isMobile ? "15px" : "28px",
                  objectFit: "contain",
                  display: "block",
                  filter: "brightness(0) invert(1)",
                  opacity: isMobile ? 0.55 : 0.85,
                }}
              />
            </a>
          ))}
        </div>

        {/* Bottom rule */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginTop: "24px" }} />
      </div>

    </section>
  );
}