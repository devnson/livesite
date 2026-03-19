"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── CONTENT ───────────────────────────────────────────────────

const founderNote = {
  label: "Founder's Note",
  title: "Tanosei did not change because we wanted a new look.",
  body: [
    "It changed because we had outgrown the old one.",
    "As the studio evolved, it became clearer that Tanosei was never only about visuals. The deeper work was always about making things understandable — taking complexity and shaping it into something people can follow, trust, and move with.",
    "That is what led to this rebrand. Not the need to appear different. The need to become more honest — about how we think, how we operate, and what we are trying to build.",
  ],
};

const whyWeChanged = {
  label: "Why We Changed",
  title: "The old identity no longer carried that weight.",
  body: [
    "As the studio matured, our identity began to lag behind our thinking. The previous brand reflected where we had been, not where we were heading.",
    "Our work had become more intentional, more strategic, more systems-driven. The old identity did not reflect that rigor — or the balance between curiosity, direction, and structure that had become central to how we worked.",
    "So the rebrand became necessary. Not cosmetic. Structural. We needed something that felt less like a style and more like a system.",
  ],
  from: ["Expressive identity", "Fixed visual language", "Studio-first presentation"],
  to: ["Structural identity", "Morphable system", "Philosophy-led presentation"],
};

const philosophy = {
  label: "Philosophy",
  title: "Built on a polymath mindset.",
  body: [
    "Tanosei is the broader philosophy. Tanosei Studio is its expression through motion, design, and visual systems.",
    "We are inspired by the people who moved across disciplines — mathematicians, engineers, physicians, artists — who understood that the hardest problems rarely belong to one field alone.",
    "That mindset shapes how we approach every project: not as decoration, but as a system designed to make complex ideas clearer and more usable. Creative by craft. Engineering-minded in how we think.",
  ],
};

const whyGeometry = {
  label: "Why Geometry",
  title: "We returned to something elemental.",
  body: [
    "Geometry gave us a language that felt timeless, disciplined, and true to the way we think. These are not decorative forms — they are foundational structures that carry order, proportion, and logic across mathematics, engineering, architecture, and motion.",
    "Tanosei exists at a meeting point: between human feeling and technical truth, between atmosphere and precision. Our identity needed to hold that tension without becoming soft or sterile.",
    "Geometry allowed that. Not as style, but as method — a system that could evolve across mediums while remaining coherent at its core.",
    "From that foundation, the identity was built around three primary forms: the Circle, the Triangle, and the Square.",
  ],
};

const shapes = [
  {
    id: "circle", symbol: "○", name: "The Circle", sub: "Human Curiosity",
    represents: "Openness",
    role: "Atmosphere and exploration",
    usedWhen: "Expansion, softness, curiosity, spatial breathing.",
    desc: "The most fluid form in the system — continuous, breathable, without hard edges. It reflects the part of our process that begins with listening and understanding what is actually needed before forcing conclusions. The circle keeps the system human.",
    principle: "Not passive curiosity, but disciplined attention. The willingness to explore widely and hold complexity without flattening it too quickly. Understanding before control.",
    risk: "Too much openness without structure creates drift.",
  },
  {
    id: "triangle", symbol: "△", name: "The Triangle", sub: "Purposeful Direction",
    represents: "Direction",
    role: "Momentum and decision",
    usedWhen: "Motion cues, emphasis, forward pull, decisive transitions.",
    desc: "The sharpest form in the system — directional, precise, full of forward pull. Where the Circle expands, the Triangle points. It marks the moment when exploration becomes decision and insight begins to move with intention. The triangle keeps the system from becoming passive.",
    principle: "Not movement for its own sake, but progress guided by choice. A force that gives ideas trajectory without losing clarity. Commitment over drift.",
    risk: "Too much direction without empathy creates force without meaning.",
  },
  {
    id: "square", symbol: "□", name: "The Square", sub: "Built Structure",
    represents: "Structure",
    role: "Framing and stability",
    usedWhen: "Grids, containment, architectural clarity, repeatable systems.",
    desc: "The architectural anchor of the system — grounded, balanced, dependable. Equal sides and clear edges reflect order, reliability, and structural integrity. The square is where abstraction becomes infrastructure, and momentum becomes method. It keeps the system from collapsing under its own ambition.",
    principle: "Not rigidity, but reliability. The logic that gives creative energy a form it can live inside — usable, repeatable, and built to hold weight over time.",
    risk: "Too much structure without curiosity creates rigidity.",
  },
];

const synthesis = [
  { shape: "○", label: "Circle",   force: "Openness",   risk: "Too much openness without structure creates drift." },
  { shape: "△", label: "Triangle", force: "Direction",  risk: "Too much direction without empathy creates force without meaning." },
  { shape: "□", label: "Square",   force: "Structure",  risk: "Too much structure without curiosity creates rigidity." },
];

const motionPrinciples = [
  { name: "Expansion",   desc: "Ideas begin open — the circle's breath before direction." },
  { name: "Alignment",   desc: "Forces orient. The triangle introduces pull and axis." },
  { name: "Convergence", desc: "Movement draws toward a point of clarity." },
  { name: "Reduction",   desc: "Complexity collapses into its most essential form." },
  { name: "Tension",     desc: "The productive resistance between forces — where meaning lives." },
  { name: "Release",     desc: "Resolution. The system settles into structure." },
];

// ── ANIMATED GEOMETRY CANVAS ──────────────────────────────────
function GeometryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.004;

      const cx = w / 2, cy = h / 2;

      // Outer circle — slow breathe
      const r1 = 160 + Math.sin(t * 0.7) * 10;
      ctx.beginPath();
      ctx.arc(cx, cy, r1, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.22 + Math.sin(t) * 0.04})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Inner circle
      const r2 = 100 + Math.sin(t * 1.1 + 1) * 7;
      ctx.beginPath();
      ctx.arc(cx, cy, r2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.30 + Math.sin(t * 0.8) * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Rotating triangle
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.25);
      const tr = 130;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
        i === 0 ? ctx.moveTo(Math.cos(a) * tr, Math.sin(a) * tr) : ctx.lineTo(Math.cos(a) * tr, Math.sin(a) * tr);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255,255,255,${0.26 + Math.sin(t * 1.3) * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Counter-rotating square
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.18 + Math.PI / 4);
      const sq = 82;
      ctx.beginPath();
      ctx.rect(-sq, -sq, sq * 2, sq * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.22 + Math.sin(t * 0.9 + 0.5) * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Centre dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.55 + Math.sin(t * 2) * 0.1})`;
      ctx.fill();

      // Radial tick marks on outer circle
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2 + t * 0.12;
        const inner = r1 + 6, outer2 = r1 + (i % 6 === 0 ? 16 : 10);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
        ctx.lineTo(cx + Math.cos(a) * outer2, cy + Math.sin(a) * outer2);
        ctx.strokeStyle = `rgba(255,255,255,${i % 6 === 0 ? 0.40 : 0.16})`;
        ctx.lineWidth = i % 6 === 0 ? 1.2 : 0.7;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

// ── PAGE ──────────────────────────────────────────────────────
export default function RebrandPage() {
  const [activeShape, setActiveShape] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    heroRef.current?.querySelectorAll(".hero-el").forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.1 + i * 0.1, ease: "power3.out" });
    });
    bodyRef.current?.querySelectorAll(".fade-in").forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
  }, []);

  return (
    <main style={{ background: "radial-gradient(ellipse 900px 600px at 20% 10%, #141414 0%, #0a0a0a 40%, #080808 100%)", minHeight: "100vh", color: "#f0f0f0", fontFamily: "var(--font-bricolage), system-ui, sans-serif", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "60px", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(8,8,8,0.88)", backdropFilter: "blur(12px)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "var(--font-dm)", fontSize: "13px", fontWeight: 900, color: "rgba(255,255,255,0.82)", letterSpacing: "-0.02em" }}>Tanosei</span>
          <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.30)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Studio</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-bricolage)", fontSize: "12.5px", fontWeight: 300, color: "rgba(255,255,255,0.38)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </Link>
          <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.22)", letterSpacing: "0.10em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.10)", padding: "4px 10px", borderRadius: "999px" }}>Journal</span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "60px" }}>

        {/* Geometry canvas — right side */}
        <div style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-52%)", width: "680px", height: "680px", opacity: 0.90 }}>
          <GeometryCanvas />
        </div>

        {/* Subtle grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

        <div ref={heroRef} style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 2, width: "100%" }}>

          {/* Logo mark */}
          <div className="hero-el" style={{ opacity: 0, marginBottom: "40px" }}>
            {/* Replace src with your actual logo PNG path e.g. "/logos/tanosei-mark.png" */}
            <div style={{ width: "64px", height: "64px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {/* LOGO PLACEHOLDER — swap this div for: <img src="/logos/tanosei-mark.png" alt="Tanosei Mark" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> */}
              <span style={{ fontFamily: "var(--font-dm)", fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textAlign: "center", lineHeight: 1.4 }}>Logo{"\n"}Mark</span>
            </div>
          </div>

          {/* Meta row */}
          <div className="hero-el" style={{ opacity: 0, display: "flex", alignItems: "center", gap: "16px", marginBottom: "44px" }}>
            <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>Tanosei Studio</span>
            <span style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.14)" }} />
            <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>2025</span>
            <span style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.14)" }} />
            <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>Brand Identity</span>
          </div>

          {/* Headline */}
          <h1 className="hero-el" style={{ opacity: 0, fontFamily: "var(--font-dm)", fontSize: "clamp(44px, 7vw, 96px)", fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 0.95, margin: "0 0 32px", maxWidth: "720px" }}>
            <span style={{ color: "#ffffff" }}>The</span>
            <br />
            <span style={{ color: "#ffffff" }}>Geometric</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>Rebirth.</span>
          </h1>

          {/* Subline */}
          <p className="hero-el" style={{ opacity: 0, fontFamily: "var(--font-bricolage)", fontSize: "16px", fontWeight: 300, color: "rgba(255,255,255,0.60)", lineHeight: 1.85, maxWidth: "480px", margin: "0 0 52px" }}>
            A new identity built on first principles — circle, triangle, square — and a clearer expression of how Tanosei thinks, operates, and builds.
          </p>

          {/* Three shapes preview — clickable, scroll to synthesis */}
          <div className="hero-el" style={{ opacity: 0, display: "flex", gap: "12px", alignItems: "center" }}>
            {(["○", "△", "□"] as const).map((s, i) => (
              <button key={i} onClick={() => {
                setActiveShape(i);
                document.getElementById("visual-synthesis")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }} style={{ width: "44px", height: "44px", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; }}>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "18px", color: "rgba(255,255,255,0.65)" }}>{s}</span>
              </button>
            ))}
            <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.22)", marginLeft: "8px", letterSpacing: "0.06em" }}>The Tanosei Visual Synthesis</span>
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 28px 100px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div style={{ width: "3px", height: "16px", background: "rgba(255,255,255,0.75)", borderRadius: "2px" }} />
          <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>The Rebrand Film</p>
        </div>
        <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.38)", margin: "0 0 20px", lineHeight: 1.6 }}>
          A short film introducing the new Tanosei identity system.
        </p>

        {/* Video embed — replace VIDEO_ID with your YouTube ID */}
        <div style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", position: "relative" }}>
          {/* PLACEHOLDER — swap this div for: */}
          {/* <iframe src="https://www.youtube.com/embed/VIDEO_ID?modestbranding=1&rel=0" style={{ width: "100%", height: "100%", border: "none", display: "block" }} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "18px", backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                <path d="M0 0L20 11 0 22z" fill="rgba(255,255,255,0.65)" />
              </svg>
            </div>
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.22)", margin: 0, letterSpacing: "0.08em", textTransform: "uppercase" }}>Paste YouTube ID to activate</p>
          </div>
        </div>
        <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.28)", margin: "14px 0 0", lineHeight: 1.6 }}>
          The Geometric Rebirth — Tanosei Studio, 2025
        </p>
      </section>

      {/* ── BODY ── */}
      <div ref={bodyRef} style={{ maxWidth: "780px", margin: "0 auto", padding: "0 28px 140px" }}>

        {/* ── PAGE SUMMARY ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "72px", padding: "24px 28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)" }}>
          <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "15px", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.85, margin: 0 }}>
            A rebrand built from first principles — using circle, triangle, and square to express Tanosei's shift toward a more structural, adaptive, and engineering-minded identity system.
          </p>
        </div>

        {/* ── FOUNDER'S NOTE ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "3px", height: "16px", background: "rgba(255,255,255,0.75)", borderRadius: "2px" }} />
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>{founderNote.label}</p>
          </div>
          <h2 style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#ffffff", margin: "0 0 28px" }}>{founderNote.title}</h2>
          {founderNote.body.map((para, i) => (
            <p key={i} style={{ fontFamily: "var(--font-bricolage)", fontSize: "16px", fontWeight: 300, color: "rgba(255,255,255,0.70)", lineHeight: 1.95, margin: "0 0 20px" }}>{para}</p>
          ))}
        </div>

        {/* ── WHY WE CHANGED ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "3px", height: "16px", background: "rgba(255,255,255,0.75)", borderRadius: "2px" }} />
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>{whyWeChanged.label}</p>
          </div>
          <h2 style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#ffffff", margin: "0 0 28px" }}>{whyWeChanged.title}</h2>
          {whyWeChanged.body.map((para, i) => (
            <p key={i} style={{ fontFamily: "var(--font-bricolage)", fontSize: "16px", fontWeight: 300, color: "rgba(255,255,255,0.70)", lineHeight: 1.95, margin: "0 0 20px" }}>{para}</p>
          ))}
          {/* From → To comparison */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "8px" }}>
            <div style={{ padding: "20px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", background: "rgba(255,255,255,0.02)" }}>
              <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: "0 0 14px" }}>Old Identity</p>
              {whyWeChanged.from.map(item => (
                <p key={item} style={{ fontFamily: "var(--font-bricolage)", fontSize: "13.5px", fontWeight: 300, color: "rgba(255,255,255,0.40)", margin: "0 0 8px", lineHeight: 1.5, display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "14px", height: "1px", background: "rgba(255,255,255,0.18)", display: "inline-block", flexShrink: 0 }} />{item}
                </p>
              ))}
            </div>
            <div style={{ padding: "20px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", background: "rgba(255,255,255,0.04)" }}>
              <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", margin: "0 0 14px" }}>New Identity</p>
              {whyWeChanged.to.map(item => (
                <p key={item} style={{ fontFamily: "var(--font-bricolage)", fontSize: "13.5px", fontWeight: 300, color: "rgba(255,255,255,0.68)", margin: "0 0 8px", lineHeight: 1.5, display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "14px", height: "1px", background: "rgba(255,255,255,0.40)", display: "inline-block", flexShrink: 0 }} />{item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── PHILOSOPHY ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "3px", height: "16px", background: "rgba(255,255,255,0.75)", borderRadius: "2px" }} />
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>{philosophy.label}</p>
          </div>
          <h2 style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#ffffff", margin: "0 0 28px" }}>{philosophy.title}</h2>
          {philosophy.body.map((para, i) => (
            <p key={i} style={{ fontFamily: "var(--font-bricolage)", fontSize: "16px", fontWeight: 300, color: "rgba(255,255,255,0.70)", lineHeight: 1.95, margin: "0 0 20px" }}>{para}</p>
          ))}
        </div>

        {/* ── WHY GEOMETRY ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "3px", height: "16px", background: "rgba(255,255,255,0.75)", borderRadius: "2px" }} />
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>{whyGeometry.label}</p>
          </div>
          <h2 style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#ffffff", margin: "0 0 28px" }}>{whyGeometry.title}</h2>
          {whyGeometry.body.map((para, i) => (
            <p key={i} style={{ fontFamily: "var(--font-bricolage)", fontSize: "16px", fontWeight: 300, color: "rgba(255,255,255,0.70)", lineHeight: 1.95, margin: "0 0 20px" }}>{para}</p>
          ))}
        </div>

        {/* ── THE VISUAL SYNTHESIS ── */}
        <div id="visual-synthesis" className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
            <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.14)" }} />
            <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap" }}>The Visual Synthesis</span>
            <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.14)" }} />
          </div>

          {/* Shape selector tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {shapes.map((sh, i) => (
              <button key={sh.id} onClick={() => setActiveShape(i)}
                style={{ fontFamily: "var(--font-bricolage)", display: "flex", alignItems: "center", gap: "8px", padding: "8px 18px", borderRadius: "999px", border: `1px solid ${activeShape === i ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.08)"}`, background: activeShape === i ? "rgba(255,255,255,0.07)" : "transparent", color: activeShape === i ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.32)", fontSize: "12.5px", fontWeight: activeShape === i ? 500 : 300, cursor: "pointer", transition: "all 0.2s" }}>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "14px" }}>{sh.symbol}</span>
                {sh.name}
              </button>
            ))}
          </div>

          {/* Active shape card */}
          <div style={{ border: "1px solid rgba(255,255,255,0.09)", borderRadius: "18px", background: "rgba(255,255,255,0.025)", overflow: "hidden" }}>
            <div style={{ padding: "32px 32px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "flex-start", gap: "28px" }}>
              <div style={{ width: "72px", height: "72px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(255,255,255,0.03)" }}>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "32px", color: "rgba(255,255,255,0.60)" }}>{shapes[activeShape].symbol}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0 0 6px" }}>{shapes[activeShape].sub}</p>
                <h3 style={{ fontFamily: "var(--font-dm)", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.04em", color: "#ffffff", margin: "0 0 12px" }}>{shapes[activeShape].name}</h3>
                <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "14.5px", fontWeight: 300, color: "rgba(255,255,255,0.58)", lineHeight: 1.85, margin: 0 }}>{shapes[activeShape].desc}</p>
              </div>
            </div>
            {/* 4-layer grid: represents / role / used for / risk */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {[
                ["Represents", shapes[activeShape].represents],
                ["Role", shapes[activeShape].role],
                ["Used for", shapes[activeShape].usedWhen],
                ["Risk if overused", shapes[activeShape].risk],
              ].map(([label, val], i) => (
                <div key={label} style={{ padding: "16px 22px", borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: "0 0 5px" }}>{label}</p>
                  <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13px", fontWeight: 300, color: i === 3 ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.62)", margin: 0, lineHeight: 1.6, fontStyle: i === 3 ? "italic" : "normal" }}>{val}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: "18px 24px", background: "rgba(255,255,255,0.02)" }}>
              <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13.5px", fontWeight: 300, color: "rgba(255,255,255,0.38)", lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>"{shapes[activeShape].principle}"</p>
            </div>
          </div>
        </div>

        {/* ── THE TANOSEI MARK ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "3px", height: "16px", background: "rgba(255,255,255,0.75)", borderRadius: "2px" }} />
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>The Tanosei Mark</p>
          </div>
          <h2 style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#ffffff", margin: "0 0 28px" }}>Not designed from a letterform. Derived from balance.</h2>
          {[
            "The mark was not designed by starting with a letterform or by attaching meaning after the fact. It was derived from the relationship between the Circle, Triangle, and Square.",
            "The goal was never to let one shape dominate. Too circular felt soft. Too square felt static. Too triangular felt aggressive. The final form came from resolving that tension.",
            "It is not a literal collage of three shapes. It is a distilled form born from their alignment — compact, geometric, and structurally clear.",
          ].map((para, i) => (
            <p key={i} style={{ fontFamily: "var(--font-bricolage)", fontSize: "16px", fontWeight: 300, color: "rgba(255,255,255,0.70)", lineHeight: 1.95, margin: "0 0 20px" }}>{para}</p>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginTop: "8px" }}>
            {[["Openness", "without becoming vague"], ["Direction", "without becoming forceful"], ["Structure", "without becoming rigid"]].map(([bold, rest]) => (
              <div key={bold} style={{ padding: "18px 16px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", background: "rgba(255,255,255,0.02)" }}>
                <p style={{ fontFamily: "var(--font-dm)", fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.78)", margin: "0 0 5px", letterSpacing: "-0.02em" }}>{bold}</p>
                <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.32)", margin: 0, lineHeight: 1.6 }}>{rest}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "15px", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: "24px 0 0", fontStyle: "italic" }}>
            "The mark is not just an identifier. It is the most concentrated expression of the larger philosophy: a polymath mindset, built with engineering discipline, expressed through a system designed to evolve."
          </p>
          {/* Mark formation */}
          <div style={{ marginTop: "32px" }}>
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 300, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0 0 4px" }}>Mark Formation</p>
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.35)", margin: "0 0 16px", fontStyle: "italic" }}>The mark emerged through balance, not literal assembly.</p>
            <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)", background: "#0d0d0d" }}>
              <img
                src="/tanoseilogos/logo_form.png"
                alt="Tanosei Mark Formation"
                style={{ width: "100%", display: "block", filter: "brightness(1.8) contrast(1.1)" }}
              />
            </div>
          </div>
        </div>

        {/* ── A SYSTEM, NOT JUST SYMBOLS ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "3px", height: "16px", background: "rgba(255,255,255,0.75)", borderRadius: "2px" }} />
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>The Relationship</p>
          </div>
          <h2 style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#ffffff", margin: "0 0 10px" }}>A System, Not Just Symbols.</h2>
          <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "16px", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, margin: "0 0 28px" }}>The meaning lives in the relationship between the three forms — not in any single shape.</p>
          <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden", marginBottom: "16px" }}>
            {synthesis.map((s, i) => (
              <div key={s.label} style={{ display: "grid", gridTemplateColumns: "48px 110px 1fr", alignItems: "center", padding: "18px 22px", borderBottom: i < synthesis.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "20px", color: "rgba(255,255,255,0.45)" }}>{s.shape}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "10px", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: "0 0 3px" }}>{s.label}</p>
                  <p style={{ fontFamily: "var(--font-dm)", fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.78)", margin: 0, letterSpacing: "-0.02em" }}>{s.force}</p>
                </div>
                <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.40)", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>{s.risk}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "18px 22px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontFamily: "var(--font-dm)", fontSize: "16px", color: "rgba(255,255,255,0.35)", flexShrink: 0 }}>○ △ □</span>
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13.5px", fontWeight: 300, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.7 }}>When these forces align — the work becomes clearer, the system more coherent, and progress more durable.</p>
          </div>
        </div>

        {/* ── MORPHABLE SYSTEM ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ padding: "36px", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "18px", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "3px", height: "16px", background: "rgba(255,255,255,0.75)", borderRadius: "2px" }} />
              <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>A Morphable System</p>
            </div>
            <h3 style={{ fontFamily: "var(--font-dm)", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.04em", color: "#ffffff", margin: "0 0 14px" }}>Built to adapt across mediums. Designed to stay coherent.</h3>
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "15px", fontWeight: 300, color: "rgba(255,255,255,0.50)", lineHeight: 1.85, margin: "0 0 24px" }}>This identity is not fixed around one static mark. It is built to behave — across motion, campaigns, interfaces, storytelling, and future mediums — without losing its internal logic. Recognizable and responsive.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              {[["Fluid", "without becoming vague"], ["Structured", "without becoming static"], ["Coherent", "while staying alive"]].map(([bold, rest]) => (
                <div key={bold} style={{ padding: "14px 16px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", background: "rgba(255,255,255,0.02)" }}>
                  <p style={{ fontFamily: "var(--font-dm)", fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.72)", margin: "0 0 4px", letterSpacing: "-0.02em" }}>{bold}</p>
                  <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.30)", margin: 0, lineHeight: 1.6 }}>{rest}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MOTION PRINCIPLES ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "3px", height: "16px", background: "rgba(255,255,255,0.75)", borderRadius: "2px" }} />
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>Motion Logic</p>
          </div>
          <h2 style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#ffffff", margin: "0 0 10px" }}>The identity is designed to move.</h2>
          <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "15px", fontWeight: 300, color: "rgba(255,255,255,0.50)", lineHeight: 1.85, margin: "0 0 28px" }}>As a motion studio, how the brand behaves in time matters as much as how it appears in space. Six principles govern how the Tanosei identity moves.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {motionPrinciples.map((m, i) => (
              <div key={m.name} style={{ padding: "18px 20px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", background: "rgba(255,255,255,0.02)", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em", minWidth: "20px", paddingTop: "2px" }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-dm)", fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.75)", margin: "0 0 5px", letterSpacing: "-0.01em" }}>{m.name}</p>
                  <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "12.5px", fontWeight: 300, color: "rgba(255,255,255,0.38)", margin: 0, lineHeight: 1.65 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── APPLICATIONS ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "3px", height: "16px", background: "rgba(255,255,255,0.75)", borderRadius: "2px" }} />
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>In Practice</p>
          </div>
          <h2 style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#ffffff", margin: "0 0 10px" }}>Theory applied.</h2>
          <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "15px", fontWeight: 300, color: "rgba(255,255,255,0.50)", lineHeight: 1.85, margin: "0 0 24px" }}>The identity across logo, motion, interface, and communication.</p>
          <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", aspectRatio: "16/5", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.18)", letterSpacing: "0.10em", textTransform: "uppercase", margin: 0 }}>Application visuals — coming soon</p>
          </div>
        </div>

        {/* ── PULL QUOTE ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ borderLeft: "2px solid rgba(255,255,255,0.18)", paddingLeft: "28px" }}>
            <p style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#ffffff", lineHeight: 1.35, margin: "0 0 16px" }}>
              "Not simply to modernize how Tanosei looks, but to clarify how Tanosei thinks."
            </p>
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.28)", letterSpacing: "0.10em", textTransform: "uppercase", margin: 0 }}>— Sushan Bastola, Founder</p>
          </div>
        </div>

        {/* ── CLOSING ── */}
        <div className="fade-in" style={{ opacity: 0, marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "36px" }}>
            <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.14)" }} />
            <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Closing</span>
            <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.14)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#ffffff", margin: "0 0 28px" }}>A return to first principles.</h2>
          {[
            "The Circle. The Triangle. The Square. Three simple forms. Three enduring forces. Three ways of understanding how meaningful progress is made.",
            "For Tanosei, this is a commitment — to build with rigor, to create with clarity, and to keep moving toward work that is not only expressive, but exacting. Not only flexible, but grounded.",
          ].map((p, i) => (
            <p key={i} style={{ fontFamily: "var(--font-bricolage)", fontSize: "16px", fontWeight: 300, color: "rgba(255,255,255,0.70)", lineHeight: 1.95, margin: "0 0 20px" }}>{p}</p>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "40px" }}>
            {shapes.map((sh, i) => (
              <span key={i} style={{ fontFamily: "var(--font-dm)", fontSize: "28px", color: "rgba(255,255,255,0.22)" }}>{sh.symbol}</span>
            ))}
            <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.10)" }} />
            <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.20)", letterSpacing: "0.10em", textTransform: "uppercase" }}>This is only the beginning.</span>
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="fade-in" style={{ opacity: 0, paddingTop: "48px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-dm)", fontSize: "17px", fontWeight: 800, color: "rgba(255,255,255,0.72)", letterSpacing: "-0.04em", margin: "0 0 6px" }}>If this way of thinking resonates —</p>
            <p style={{ fontFamily: "var(--font-bricolage)", fontSize: "13.5px", fontWeight: 300, color: "rgba(255,255,255,0.30)", margin: 0 }}>Let's build something that holds up. Book a 30-minute clarity call.</p>
          </div>
          <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "10px 10px 10px 20px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", textDecoration: "none", transition: "all 0.22s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
            <span style={{ fontFamily: "var(--font-bricolage)", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.62)", whiteSpace: "nowrap" }}>Book a Clarity Call</span>
            <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.70)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}