"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { label: "Work",      id: "work",        href: null },
  { label: "Solutions", id: "solutions",   href: null },
  { label: "Process",   id: "how-we-work", href: null },
  { label: "Team",      id: "team",        href: null },
  { label: "Journal",   id: null,          href: "/journal" },
];

export default function Nav() {
  const router   = useRouter();
  const pathname = usePathname();

  const [scrolled,   setScrolled]   = useState(false);
  const [open,       setOpen]       = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const NAV_OFFSET = 96;

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
    window.history.replaceState(null, "", `/#${id}`);
  }, []);

  const handleNav = useCallback((id: string | null, href: string | null) => {
    setOpen(false);
    if (href) { router.push(href); return; }
    if (!id) return;
    if (pathname === "/") { scrollToId(id); return; }
    router.push(`/#${id}`);
    setTimeout(() => scrollToId(id), 50);
    setTimeout(() => scrollToId(id), 250);
  }, [pathname, router, scrollToId]);

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    setTimeout(() => scrollToId(hash), 50);
    setTimeout(() => scrollToId(hash), 250);
  }, [pathname, scrollToId]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize(); onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const isJournalActive = pathname.startsWith("/journal");

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>

      {/* FLOATING PILL */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", maxWidth: "1120px", height: "56px", padding: "0 8px 0 24px",
        borderRadius: "999px",
        background: scrolled ? "rgba(14,14,14,0.97)" : "rgba(10,10,10,0.6)",
        border: scrolled ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(32px) saturate(180%)", WebkitBackdropFilter: "blur(32px) saturate(180%)",
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.65), 0 1px 0 rgba(255,255,255,0.06) inset" : "0 4px 24px rgba(0,0,0,0.35)",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}>

        {/* LOGO — DM Sans */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.03em", color: "white", textDecoration: "none", flexShrink: 0 }}>
          <span style={{ width: "22px", height: "22px", borderRadius: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <Image src="/icon.png" alt="Tanosei" width={16} height={16} priority style={{ opacity: 0.9 }} />
          </span>
          Tanosei{" "}
          <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>Studio</span>
        </Link>

        {/* DESKTOP NAV LINKS — Bricolage */}
        {!isMobile && (
          <ul style={{ display: "flex", alignItems: "center", gap: "32px", listStyle: "none", margin: 0, padding: 0 }}>
            {links.map((link) => {
              const isActive = link.href ? pathname.startsWith(link.href) : false;
              return (
                <li key={link.label}>
                  <button type="button" onClick={() => handleNav(link.id, link.href)}
                    style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", fontFamily: "var(--font-bricolage)", fontSize: "13.5px", fontWeight: isActive ? 500 : 300, color: isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.45)", letterSpacing: "0.01em", transition: "color 0.18s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.88)")}
                    onMouseLeave={e => (e.currentTarget.style.color = isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.45)")}>
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* DESKTOP BUTTONS */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* GHOST BUTTON — Bricolage */}
            <button type="button" onClick={() => handleNav("how-we-work", null)}
              style={{ padding: "9px 18px", borderRadius: "999px", border: "1px solid transparent", background: "transparent", fontFamily: "var(--font-bricolage)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.45)", transition: "color 0.18s, border-color 0.18s", whiteSpace: "nowrap", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor = "transparent"; }}>
              See How It Works
            </button>

            {/* PRIMARY CTA — Bricolage */}
            <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => setBtnHovered(true)} onMouseLeave={() => setBtnHovered(false)}
              style={{ display: "inline-flex", alignItems: "center", padding: "0", borderRadius: "999px", border: `1px solid ${btnHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.18)"}`, background: btnHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)", fontFamily: "var(--font-bricolage)", fontSize: "13.5px", fontWeight: 500, color: btnHovered ? "#fff" : "rgba(255,255,255,0.78)", textDecoration: "none", transition: "border-color 0.2s, background 0.2s, color 0.2s", whiteSpace: "nowrap" }}>
              <span style={{ padding: "10px 12px 10px 20px" }}>Book a Clarity Call</span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", margin: "4px 4px 4px 0", borderRadius: "50%", background: btnHovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.09)", border: `1px solid ${btnHovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)"}`, flexShrink: 0, transition: "background 0.2s, border-color 0.2s" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: btnHovered ? "rotate(0deg)" : "rotate(-45deg)", transition: "transform 0.25s ease" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        )}

        {/* MOBILE HAMBURGER */}
        {isMobile && (
          <button onClick={() => setOpen(!open)} style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "10px", background: "transparent", border: "none", cursor: "pointer" }} aria-label="Open menu">
            <span style={{ display: "block", width: "20px", height: "1.5px", background: "rgba(255,255,255,0.75)", transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(6.5px)" : "none" }} />
            <span style={{ display: "block", width: "20px", height: "1.5px", background: "rgba(255,255,255,0.75)", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: "20px", height: "1.5px", background: "rgba(255,255,255,0.75)", transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
          </button>
        )}
      </div>

      {/* MOBILE DRAWER — Bricolage */}
      {isMobile && open && (
        <div style={{ position: "absolute", top: "78px", left: "16px", right: "16px", background: "rgba(10,10,10,0.97)", backdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "20px", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }}>
          {links.map((link) => (
            <button key={link.label} type="button" onClick={() => handleNav(link.id, link.href)}
              style={{ fontFamily: "var(--font-bricolage)", background: "transparent", border: "none", textAlign: "left", padding: "4px 0", cursor: "pointer", fontSize: "15px", fontWeight: 300, color: link.href && pathname.startsWith(link.href) ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.6)" }}>
              {link.label}
            </button>
          ))}
          <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
            style={{ marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "var(--font-bricolage)", color: "rgba(255,255,255,0.85)", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
            Book a Clarity Call
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      )}
    </nav>
  );
}