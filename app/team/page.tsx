"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
type Member = {
  name?: string;
  role: string;
  narrative: string;
  photo?: string;
  initials?: string;
  isFounder?: boolean;
  isFeatured?: boolean;
  tag?: string;
  img?: { zoom?: number; x?: number; y?: number };
};

type Department = {
  index: string;
  label: string;
  signal: string;
  members: Member[];
};

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const departments: Department[] = [
  {
    index: "01",
    label: "Leadership",
    signal:
      "Clear ownership. Clear direction. You always know what we're building, why it matters, and what success looks like.",
    members: [
      {
        name: "Sushan Bastola",
        role: "Founder · Product-Led Motion",
        narrative:
          "Single accountable owner on every engagement.\n\n" +
          "I define the narrative architecture, pressure-test the messaging, and protect the clarity bar across execution.\n\n" +
          "We don't optimize for applause.\n" +
          "We optimize for buyer understanding.\n\n" +
          "Every decision ties back to:\n" +
          "What should the buyer understand?\n" +
          "What should they trust?\n" +
          "What should they do next?",
        photo: "/headshots/sushan.png",
        isFounder: true,
        isFeatured: true,
        tag: "Product owner",
        img: { zoom: 1.0, x: 50, y: 45 },
      },
    ],
  },
  {
    index: "02",
    label: "Narrative & Strategy",
    signal:
      "We translate product complexity into a buyer-ready story: what to believe, what to remember, what to do next.",
    members: [
      {
        role: "Story Strategist",
        narrative:
          'Maps the belief shift: what a buyer needs to understand before they\'ll act. Sets structure, proof points, and the "why now" — before visuals start.',
        photo: "/illustrations/sunil.png",
        initials: "SA",
        tag: "Core",
        img: { zoom: 1.12, x: 52, y: 24 },
      },
      {
        role: "Positioning & Messaging",
        narrative:
          "Turns strategy into language that holds under pressure — hooks, hierarchy, and the exact phrasing that keeps the message consistent across channels.",
        initials: "PH",
        img: { zoom: 1.08, x: 50, y: 22 },
      },
    ],
  },
  {
    index: "03",
    label: "Design & Visual Systems",
    signal:
      "A visual language that makes your product feel obvious — and stays consistent across every asset you ship.",
    members: [
      {
        role: "Design Lead",
        narrative:
          "Builds reusable visual systems so the work scales across formats. Prioritizes comprehension, brand truth, and repeatability — not one-off pretty frames.",
        photo: "/illustrations/sakshyam.png",
        initials: "DL",
        tag: "Core",
        img: { zoom: 1.08, x: 52, y: 22 },
      },
      {
        role: "Designer",
        narrative:
          "Turns the narrative into precise frames buyers can parse fast. Keeps detail, hierarchy, and brand consistency tight — especially under deadlines.",
        photo: "/illustrations/dikshya.png",
        initials: "SD",
        img: { zoom: 1.06, x: 45, y: 22 },
      },
    ],
  },
  {
    index: "04",
    label: "Motion & Production",
    signal:
      "Motion that respects attention. We pace ideas for understanding — then ship assets that work in-market.",
    members: [
      {
        role: "Motion Lead",
        narrative:
          "Defines the motion language and pacing so the story lands. The work should feel inevitable: each beat earns the next, with zero confusion.",
        photo: "/illustrations/avisek.png",
        initials: "ML",
        tag: "Core",
        img: { zoom: 1.15, x: 50, y: 20 },
      },
      {
        role: "Motion Designer",
        narrative:
          "Executes fast without losing intent. Precision timing, clean transitions, and disciplined motion — built for real timelines and real distribution.",
        photo: "/illustrations/rohil.png",
        initials: "MD",
        img: { zoom: 1.1, x: 50, y: 22 },
      },
      {
        role: "Sound Design & Mix",
        narrative:
          "Audio is treated as structure, not polish: clarity, emphasis, and momentum are designed into the cut from the beginning.",
        initials: "SFX",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// PORTRAIT CARD
// Desktop: 280px photo, overlay role/tag, narrative below
// Mobile: 200px photo, 1-col, full narrative visible
// ─────────────────────────────────────────────────────────────
function PortraitCard({ m, photoH = 280 }: { m: Member; photoH?: number }) {
  const [hov, setHov] = useState(false);
  const zoom = m.img?.zoom ?? 1.08;
  const px = m.img?.x ?? 50;
  const py = m.img?.y ?? 24;

  return (
    <div
      className="t-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: "14px",
        border: `1px solid ${hov ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)"}`,
        background: "rgba(255,255,255,0.025)",
        overflow: "hidden",
        transition: "border-color 0.18s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Photo */}
      <div
        className="t-card-photo"
        style={{ position: "relative", height: photoH, flexShrink: 0, overflow: "hidden" }}
      >
        {m.photo ? (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `scale(${zoom})`,
                transformOrigin: `${px}% ${py}%`,
              }}
            >
              <Image
                src={m.photo}
                alt={m.name ?? m.role}
                fill
                sizes="(max-width: 640px) 100vw, 360px"
                style={{
                  objectFit: "cover",
                  objectPosition: `${px}% ${py}%`,
                  filter: "grayscale(5%) contrast(1.04)",
                }}
              />
            </div>
            {/* gradient — stronger so text overlay is readable */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.92) 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Role + tag pinned to bottom of photo */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "14px 16px 14px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {m.role}
              </div>
              {m.tag && (
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 800,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    background: "rgba(0,0,0,0.50)",
                    padding: "4px 9px",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {m.tag}
                </span>
              )}
            </div>
          </>
        ) : (
          /* No photo — initials + role in photo area */
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.03)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm)",
                fontWeight: 900,
                fontSize: "32px",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.16)",
              }}
            >
              {m.initials ?? "TM"}
            </span>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.30)",
              }}
            >
              {m.role}
            </div>
            {m.tag && (
              <span
                style={{
                  fontSize: "8.5px",
                  fontWeight: 800,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "4px 9px",
                  borderRadius: "999px",
                }}
              >
                {m.tag}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Narrative below photo */}
      <div className="t-card-body" style={{ padding: "16px 18px 18px", flex: 1 }}>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.52)",
            lineHeight: 1.72,
            margin: 0,
            whiteSpace: "pre-line",
          }}
        >
          {m.narrative}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FOUNDER CARD
// Desktop: wide horizontal — photo left, content right
// Mobile:  stacked — tall photo with overlay name, short content
// ─────────────────────────────────────────────────────────────
function FounderRow({ m }: { m: Member }) {
  const [hov, setHov] = useState(false);
  const chips = ["Product owner", "Clarity first", "Built for distribution"];

  return (
    <div
      className="founder-wrap"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: "16px",
        border: `1px solid ${hov ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.10)"}`,
        background: "rgba(255,255,255,0.02)",
        overflow: "hidden",
        transition: "border-color 0.18s",
      }}
    >
      {/* ── DESKTOP ── */}
      <div
        className="founder-desktop"
        style={{
          display: "grid",
          gridTemplateColumns: "380px 1fr",
          minHeight: "340px",
        }}
      >
        {/* Photo */}
        <div
          style={{
            position: "relative",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          {m.photo ? (
            <div style={{ position: "absolute", inset: 0, padding: "18px" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ position: "absolute", inset: 0, transform: "scale(1.18)", transformOrigin: "50% 22%" }}>
                  <Image
                    src={m.photo}
                    alt={m.name ?? m.role}
                    fill
                    sizes="420px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "50% 18%",
                      filter: "grayscale(5%) contrast(1.04)",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-dm)",
                  fontWeight: 900,
                  fontSize: "44px",
                  color: "rgba(255,255,255,0.16)",
                }}
              >
                {m.name?.[0] ?? "S"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "32px 32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            {m.tag && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.52)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.03)",
                  padding: "7px 14px",
                  borderRadius: "999px",
                  marginBottom: "18px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", animation: "hpulse 2s infinite", flexShrink: 0 }} />
                {m.tag}
              </span>
            )}

            <div
              style={{
                fontFamily: "var(--font-dm)",
                fontWeight: 900,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                letterSpacing: "-0.03em",
                color: "#fff",
                lineHeight: 1.08,
                marginBottom: "6px",
              }}
            >
              {m.name}
            </div>

            <div
              style={{
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.36)",
                marginBottom: "18px",
              }}
            >
              {m.role}
            </div>

            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.54)",
                lineHeight: 1.78,
                margin: 0,
                maxWidth: "560px",
                whiteSpace: "pre-line",
              }}
            >
              {m.narrative}
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "24px" }}>
            {chips.map((sig) => (
              <span
                key={sig}
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.02)",
                  padding: "6px 12px",
                  borderRadius: "999px",
                }}
              >
                {sig}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="founder-mobile">
        {/* Photo — 55vw tall so face dominates */}
        <div
          style={{
            position: "relative",
            height: "55vw",
            minHeight: "240px",
            maxHeight: "380px",
            overflow: "hidden",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          {m.photo ? (
            <>
              <div style={{ position: "absolute", inset: 0, transform: "scale(1.22)", transformOrigin: "50% 20%" }}>
                <Image
                  src={m.photo}
                  alt={m.name ?? m.role}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "50% 14%",
                    filter: "grayscale(5%) contrast(1.04)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.94) 100%)",
                  pointerEvents: "none",
                }}
              />
              {/* Name pinned over gradient */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" }}>
                {m.tag && (
                  <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", animation: "hpulse 2s infinite" }} />
                    <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                      {m.tag}
                    </span>
                  </div>
                )}
                <div
                  style={{
                    fontFamily: "var(--font-dm)",
                    fontWeight: 900,
                    fontSize: "20px",
                    letterSpacing: "-0.025em",
                    color: "#fff",
                    lineHeight: 1.1,
                    marginBottom: "3px",
                  }}
                >
                  {m.name}
                </div>
                <div style={{ fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.44)" }}>
                  {m.role}
                </div>
              </div>
            </>
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <span style={{ fontFamily: "var(--font-dm)", fontWeight: 900, fontSize: "44px", color: "rgba(255,255,255,0.16)" }}>
                {m.name?.[0] ?? "S"}
              </span>
            </div>
          )}
        </div>

        {/* Content below photo */}
        <div style={{ padding: "18px 18px 20px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p style={{ margin: "0 0 16px", fontSize: "13.5px", lineHeight: 1.75, color: "rgba(255,255,255,0.54)", whiteSpace: "pre-line" }}>
            {m.narrative}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {chips.map((sig) => (
              <span
                key={sig}
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.02)",
                  padding: "5px 10px",
                  borderRadius: "999px",
                }}
              >
                {sig}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DEPT HEADER — shared between DeptBand and Leadership
// ─────────────────────────────────────────────────────────────
function DeptHeader({ index, label, signal }: { index: string; label: string; signal: string }) {
  return (
    <div style={{ paddingBottom: "28px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "32px" }}>
      {/* Counter eyebrow */}
      <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.16em", color: "rgba(255,255,255,0.28)", marginBottom: "10px" }}>
        {index}
      </div>
      {/* Label — big and editorial */}
      <h2 style={{ fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.032em", lineHeight: 1.0, color: "#fff", margin: "0 0 12px" }}>
        {label}
      </h2>
      {/* Signal — generous, readable */}
      <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.44)", lineHeight: 1.7, margin: 0, maxWidth: "640px" }}>
        {signal}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DEPARTMENT BAND
// ─────────────────────────────────────────────────────────────
function DeptBand({ dept }: { dept: Department }) {
  const membersNoFounder = dept.members.filter((m) => !m.isFeatured);

  // Layout control: keep small teams from stretching too wide
  const gridMaxWidth =
    membersNoFounder.length <= 1 ? "420px" : membersNoFounder.length === 2 ? "900px" : "100%";

  return (
    <section className="dept-band" style={{ opacity: 0, paddingBottom: "88px" }}>
      <DeptHeader index={dept.index} label={dept.label} signal={dept.signal} />

      {membersNoFounder.length > 0 && (
        <div className="cards-grid" style={{ maxWidth: gridMaxWidth }}>
          {membersNoFounder.map((m, i) => (
            <PortraitCard key={i} m={m} photoH={300} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// STRATEGY SECTION
// ─────────────────────────────────────────────────────────────
function StrategySection() {
  const cardStyle: React.CSSProperties = {
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "10px",
    padding: "18px 20px",
    background: "rgba(255,255,255,0.02)",
  };
  const dot: React.CSSProperties = {
    width: "3px",
    height: "3px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.28)",
    flexShrink: 0,
    marginTop: "8px",
  };
  const sectionLabel: React.CSSProperties = {
    fontSize: "10px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.24)",
    fontWeight: 800,
    marginBottom: "14px",
  };

  const founderBlocks = [
    {
      title: "What a founder gets",
      lines: [
        "A story you can reuse across launches, updates, and sales — without reinventing the narrative.",
        "Clear direction up front — fewer loops, faster shipping.",
        "Assets that hold up everywhere: landing, social, sales enablement, internal decks.",
      ],
    },
    {
      title: "What we optimize for",
      lines: [
        "Comprehension speed: the buyer gets it fast.",
        "Consistency: same language, same logic, every surface.",
        "Outcomes: what the buyer understands, believes, and does next.",
      ],
    },
    {
      title: "What we refuse",
      lines: ["Generic SaaS content that proves nothing.", "Polish without hierarchy.", "Ambiguity that creates revision fatigue."],
    },
  ];

  const beliefs = [
    { h: "Clarity is a competitive advantage.", b: "In complex B2B markets, the company that explains best wins." },
    { h: "Narrative is infrastructure.", b: "Your launch, landing page, demo, and sales deck should not reinvent the story every time." },
    { h: "Polish is secondary to hierarchy.", b: "If the idea doesn't land, no animation will save it." },
    { h: "Trust compounds through consistency.", b: "Same language. Same logic. Every surface." },
  ];

  const principles = [
    { k: "01", t: "Engineering > Aesthetics", d: "Design supports logic. Motion supports structure. We build from understanding outward." },
    { k: "02", t: "Constraints First", d: "We start with the real variables: buyer psychology, technical depth, timeline, distribution — then we solve within them." },
    { k: "03", t: "Push Back Early", d: "If something is unclear, we say it. If messaging is weak, we fix it — before production locks in." },
    { k: "04", t: "Fewer Loops, Better Decisions", d: "We lock direction before execution. Alignment reduces revision fatigue." },
    { k: "05", t: "Built for Distribution", d: "Everything should work beyond one upload — landing, social, sales enablement, internal decks." },
    { k: "06", t: "Outcome Over Applause", d: "We care about what the buyer understands, believes, and does next." },
  ];

  return (
    <div className="dept-band" style={{ opacity: 0, paddingTop: "80px", paddingBottom: "100px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.24)", fontWeight: 800, marginBottom: "20px" }}>
        Built Like a Startup
      </div>

      <h2 style={{ fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.032em", lineHeight: 1.0, color: "#fff", margin: "0 0 60px" }}>
        We think in systems.
        <br />
        <span style={{ fontWeight: 300 }}>We remove ambiguity early.</span>
      </h2>

      {/* Row 1: 2-col — How we work | What we believe */}
      <div className="two-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: "52px", alignItems: "start", marginBottom: "56px" }}>
        <div>
          <div style={sectionLabel}>How we work</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.50)", lineHeight: 1.78, margin: 0 }}>
              We operate like a product team, not a production house. We care less about making a video — we care more about building a system that scales across your launches, updates, and sales cycles.
            </p>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.50)", lineHeight: 1.78, margin: 0 }}>
              We think in constraints: buyer, stakes, timeline, channel. Then we design around reality.
            </p>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.50)", lineHeight: 1.78, margin: 0 }}>
              Speed matters. But structured speed matters more.
            </p>
          </div>
        </div>

        <div>
          <div style={sectionLabel}>What we believe</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {beliefs.map((item) => (
              <div key={item.h} style={cardStyle}>
                <div style={{ fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "13.5px", letterSpacing: "-0.015em", color: "rgba(255,255,255,0.88)", marginBottom: "5px" }}>
                  {item.h}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.48)", lineHeight: 1.62 }}>
                  {item.b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: 3-col outcome cards */}
      <div style={sectionLabel}>What this means for you</div>
      <div className="tri-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "52px" }}>
        {founderBlocks.map((block) => (
          <div key={block.title} style={cardStyle}>
            <div style={{ fontSize: "10px", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontWeight: 800, marginBottom: "14px" }}>
              {block.title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {block.lines.map((line) => (
                <div key={line} style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <span style={dot} />
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.50)", lineHeight: 1.65 }}>{line}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Row 3: Operating principles full width */}
      <div style={sectionLabel}>Our operating principles</div>
      <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden", marginBottom: "40px" }}>
        {principles.map((p, idx) => (
          <div
            key={p.k}
            style={{
              display: "grid",
              gridTemplateColumns: "72px 1fr",
              gap: "14px",
              padding: "16px 20px",
              background: idx % 2 === 0 ? "rgba(255,255,255,0.018)" : "transparent",
              borderTop: idx === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontWeight: 800, paddingTop: "2px" }}>
              {p.k}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "13.5px", letterSpacing: "-0.015em", color: "rgba(255,255,255,0.86)", marginBottom: "4px" }}>
                {p.t}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.48)", lineHeight: 1.65 }}>
                {p.d}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link
          href="/#work"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "transparent",
            color: "rgba(255,255,255,0.60)",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "color 0.15s, border-color 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.color = "#fff";
            el.style.borderColor = "rgba(255,255,255,0.22)";
            el.style.background = "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.color = "rgba(255,255,255,0.60)";
            el.style.borderColor = "rgba(255,255,255,0.12)";
            el.style.background = "transparent";
          }}
        >
          See our work →
        </Link>

        <a
          href="https://cal.com/tanoseihito/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "10px 22px",
            borderRadius: "8px",
            background: "#fff",
            color: "#000",
            fontSize: "13px",
            fontWeight: 700,
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
        >
          Book a Clarity Call
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Final CTA */}
      <div style={{ marginTop: "72px", paddingTop: "48px", borderTop: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
        <a
          href="https://cal.com/tanoseihito/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            padding: "13px 14px 13px 26px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.04)",
            textDecoration: "none",
            transition: "background 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "rgba(255,255,255,0.08)";
            el.style.borderColor = "rgba(255,255,255,0.24)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "rgba(255,255,255,0.04)";
            el.style.borderColor = "rgba(255,255,255,0.14)";
          }}
        >
          <span style={{ fontFamily: "var(--font-dm)", fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.78)", letterSpacing: "-0.01em" }}>
            Book a Clarity Call
          </span>
          <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.78)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function TeamPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      pageRef.current?.querySelectorAll<HTMLElement>(".dept-band").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const totalMembers = departments.reduce((a, d) => a + d.members.length, 0);
  const founder = departments.flatMap((d) => d.members).find((m) => m.isFeatured) ?? departments[0]?.members?.[0];
  // Depts shown first = 02, 03, 04 (skip 01 Leadership — shown last)
  const teamDepts = departments.filter((d) => d.index !== "01");
  const leadershipDept = departments.find((d) => d.index === "01");

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-dm), system-ui, sans-serif" }}>
      {/* NAV */}
      <nav
        className="nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(0,0,0,0.92)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            fontFamily: "var(--font-dm)",
            fontWeight: 700,
            fontSize: "14px",
            color: "rgba(255,255,255,0.82)",
          }}
        >
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.78)" }} />
          Tanosei
          <span style={{ color: "rgba(255,255,255,0.30)", fontWeight: 400, marginLeft: "3px" }}>Studio</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            href="/"
            style={{
              padding: "7px 14px",
              borderRadius: "10px",
              fontSize: "12.5px",
              color: "rgba(255,255,255,0.44)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.88)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.44)")}
          >
            ← Home
          </Link>

          <a
            href="https://cal.com/tanoseihito/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              background: "#fff",
              color: "#000",
              fontSize: "12.5px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.87")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Book a call
          </a>
        </div>
      </nav>

      <div ref={pageRef} className="page" style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 28px" }}>
        {/* ── HERO ── */}
        <header
          className="hero dept-band"
          style={{
            opacity: 0,
            paddingTop: "128px",
            paddingBottom: "80px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "grid",
            gridTemplateColumns: "1fr 220px",
            gap: "48px",
            alignItems: "end",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <span style={{ width: "18px", height: "1px", background: "rgba(255,255,255,0.22)", display: "inline-block" }} />
              <span style={{ fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", fontWeight: 700 }}>
                The Team · {totalMembers} people · {departments.length} departments
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--font-dm)", fontWeight: 300, fontSize: "clamp(42px, 6.2vw, 76px)", letterSpacing: "-0.042em", lineHeight: 1.02, margin: "0 0 22px", color: "rgba(255,255,255,0.9)" }}>
              A small <strong style={{ fontWeight: 800, color: "#fff" }}>senior team.</strong>
              <br />
              Built for <strong style={{ fontWeight: 800, color: "#fff" }}>complex products.</strong>
            </h1>

            <p style={{ fontSize: "15.5px", color: "rgba(255,255,255,0.44)", maxWidth: "600px", lineHeight: 1.78, margin: 0 }}>
              Narrative, design, and motion run as one system — so the message stays intact from first direction to final delivery.
            </p>
          </div>

          <div className="hero-stats" style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
            {[
              { n: "4", l: "Departments" },
              { n: "Senior", l: "Team level" },
              { n: "Async", l: "Working style" },
              { n: "System", l: "Approach" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 18px",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.015)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <span style={{ fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "17px", letterSpacing: "-0.02em", color: "#fff" }}>{s.n}</span>
                <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.34)", letterSpacing: "0.04em" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </header>

        {/* ── TEAM DEPTS: 02, 03, 04 ── */}
        <div style={{ paddingTop: "72px" }}>
          {teamDepts.map((dept) => (
            <DeptBand key={dept.index} dept={dept} />
          ))}
        </div>

        {/* ── LEADERSHIP (01) — always last ── */}
        {leadershipDept && founder && (
          <section className="dept-band" style={{ opacity: 0, paddingBottom: "80px" }}>
            <DeptHeader index={leadershipDept.index} label={leadershipDept.label} signal={leadershipDept.signal} />
            <FounderRow m={founder} />
          </section>
        )}

        {/* ── STRATEGY ── */}
        <StrategySection />

        <div style={{ height: "60px" }} />
      </div>

      <style>{`
        @keyframes hpulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* ─────────────────────────────────────────────
           Layout system: make grids stable + predictable
           Key rule: use auto-fit instead of hard columns
        ───────────────────────────────────────────── */

        .founder-desktop { display: grid; }
        .founder-mobile  { display: none; }

        .cards-grid{
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 14px;
          width: 100%;
        }

        /* Keep the grid aligned with the text column */
        .dept-band .cards-grid{
          margin-top: 0;
        }

        /* ── 980px: strategy columns collapse ── */
        @media (max-width: 980px) {
          .page     { padding: 0 24px !important; }
          .two-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .tri-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
        }

        /* ── 860px: hero collapses ── */
        @media (max-width: 860px) {
          .hero       { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hero-stats { max-width: 420px; }
        }

        /* ── 640px: full mobile ── */
        @media (max-width: 640px) {
          .page { padding: 0 18px !important; }
          /* founder: switch to stacked mobile */
          .founder-desktop { display: none !important; }
          .founder-mobile  { display: block !important; }

          .cards-grid   { grid-template-columns: 1fr !important; gap: 10px !important; }
          .t-card-photo { height: 220px !important; }

          .tri-grid     { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 420px) {
          .page { padding: 0 14px !important; }
        }
      `}</style>
    </div>
  );
}