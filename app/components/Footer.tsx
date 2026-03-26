"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links: Record<string, { label: string; href: string }[]> = {
  Work: [
    { label: "SecurityPal", href: "#" },
    { label: "Aleph",       href: "#" },
    { label: "DocUnlock",   href: "#" },
  ],
  Services: [
    { label: "Sales Enablement",   href: "#" },
    { label: "Category Narrative", href: "#" },
    { label: "Motion System",      href: "#" },
    { label: "Retainer",           href: "#" },
  ],
  Company: [
    { label: "How We Work", href: "#" },
    { label: "Team",        href: "#" },
    { label: "FAQ",         href: "#" },
    { label: "Contact",     href: "#" },
  ],
  Journal: [
    { label: "The Geometric Rebirth", href: "/journal/rebrand" },
  ],
};

export default function Footer() {
  const ctaRef    = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(ctaRef.current,    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ctaRef.current,    start: "top 85%" } });
    gsap.fromTo(footerRef.current, { opacity: 0 },         { opacity: 1,        duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: footerRef.current, start: "top 95%" } });
  }, []);

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>

      {/* FOOTER LINKS */}
      <div ref={footerRef} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "48px 24px", maxWidth: "1160px", margin: "0 auto", opacity: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>

          {/* BRAND COLUMN */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "15px", marginBottom: "16px", color: "rgba(255,255,255,0.92)", letterSpacing: "-0.03em" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.85)", display: "inline-block" }} />
              Tanosei{" "}
              <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>Studio</span>
            </div>
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "240px" }}>
              Motion systems for complex tech products.
            </p>
          </div>

          {/* LINK COLUMNS */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.48)", marginBottom: "16px", fontWeight: 300 }}>
                {heading}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map(({ label, href }) => (
                  <Link key={label} href={href}
                    style={{ fontFamily: "var(--font-bricolage)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.90)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.45)", margin: 0 }}>
            © 2026 Tanosei Studio. Kathmandu, Nepal.
          </p>
          <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.35)", margin: 0 }}>
            Make complex products obvious.
          </p>
        </div>
      </div>

    </footer>
  );
}