"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

function Strip({ ariaHidden, isMobile }: { ariaHidden?: boolean; isMobile: boolean }) {
  return (
    <div className="logoStrip" aria-hidden={ariaHidden ? "true" : undefined}>
      {logos.map((logo) => (
        <a
          key={logo.name}
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit ${logo.name}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
            padding: 0,
            margin: isMobile ? "0 20px" : "0 28px",
            flexShrink: 0,
          }}
        >
          <div
            className="logoBox"
            style={{
              width: `${Math.round(logo.w * (isMobile ? 1.1 : 1.35))}px`,
              height: "200px",
            }}
          >
            <Image src={logo.src} alt={logo.name} fill className="logoImg" sizes="200px" />
          </div>
        </a>
      ))}
    </div>
  );
}

export default function FooterCTA() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    gsap.fromTo(ctaRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
    });
  }, []);

  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>

      {/* BUTTON */}
      <div
        ref={ctaRef}
        style={{
          padding: "120px 24px",
          textAlign: "center",
          opacity: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "300px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.025)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }} />

        <p style={{
          fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.52)", marginBottom: "24px", fontWeight: 600,
        }}>
          Ready to start
        </p>

        <a
          href="https://cal.com/tanoseihito/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="premiumBtn"
        >
          <span className="rimGlow" />
          <span className="btnInnerCover" />
          <span className="btnText">Start with Clarity Call</span>
          <span className="iconBubble" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>

      {/* LOGO STRIP */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <section className="logoMarquee">
          <div className="logoContainer">
            <div className="logoKicker">TRUSTED BY TEAMS AT</div>
            <div className="logoRow">
              <div className="logoMarqueeInner">
                <Strip isMobile={isMobile} />
                <Strip ariaHidden isMobile={isMobile} />
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}