"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
//  CASE STUDY DATA
//  Duplicate this file into a new folder (e.g. app/case-studies/docunlock-case/page.tsx)
//  Update fields in this object only.
// ─────────────────────────────────────────────────────────────
const cs = {
  client: "DocUnlock",
  subject: "Trust-First Product Story",
  industry: "Trade Compliance · AI Automation",
  type: "Homepage + Sales Film",
  year: "2024",

  // ── HERO ──
  headline: "How DocUnlock made compliance automation feel trustworthy — before the demo.",
  subhead:
    "A proof-led narrative and visual system built from scratch to explain a high-risk workflow with calm clarity — shipped across homepage, sales, outbound, and social.",

  // ── EXECUTIVE OVERVIEW ──
  overview:
    "DocUnlock operates in a category where buyers don’t reward hype — they reward certainty. We built a calm, proof-forward hero film and a complete visual language from zero, then packaged it into reusable assets for homepage, sales conversations, outbound, and social distribution.",

  // ── SITUATION ──
  situation:
    "Trade compliance isn’t getting simpler. Tariffs shift, rules change, document bundles arrive messy — and brokers still spend hours retyping, cross-checking, and repairing errors because most ‘automation’ breaks exactly where accuracy matters.",

  // ── STRATEGIC PROBLEM ──
  problem:
    "DocUnlock didn’t have a messaging problem — they had a trust visibility problem. In compliance-heavy workflows, buyers assume ‘90% accurate’ still means they’re liable for the last 10%. The real challenge was making DocUnlock’s approach feel accurate, safe, and adoptable in under 90 seconds — without overselling.",

  // ── HYPOTHESIS ──
  hypothesis:
    "In compliance categories, clarity is the trust engine. Instead of positioning DocUnlock as ‘AI that reads documents’, we framed it as the system that turns messy inputs into complete, compliant outputs — inside the workflow brokers already trust.",

  // ── CHALLENGE ──
  challengeIntro:
    "We needed one story that could carry multiple buyer anxieties — accuracy, adoption friction, and credibility — without turning into a feature list.",
  challengePoints: [
    "Trust barrier: buyers fear ‘almost accurate’ automation more than no automation.",
    "Workflow risk: anything that requires changing process tends to fail internally.",
    "Category skepticism: scanning/OCR ≠ transformation — the difference must be obvious.",
    "Multi-surface deployment: the asset had to work on homepage, sales, outbound, and social without a presenter.",
  ],

  // ── APPROVAL + DEPLOYMENT CONTEXT (NEW) ──
  deploymentMeta: {
    usedAcross: ["Homepage", "Sales", "Outbound", "Social"],
    approvedBy: "Founder + Marketing Head",
    note:
      "DocUnlock didn’t have a high-end marketing design system. We helped build the visual + narrative foundation from scratch — then shipped a film that became their default explanation asset.",
  },

  // ── INLINE PULL QUOTE ──
  pullQuote: {
    text:
      "We needed buyers to understand the workflow instantly — and trust it. This gave us a calm, credible story we can use everywhere.",
    person: "Team, DocUnlock",
  },

  // ── WHAT WE BUILT ──
  deliverables: [
    "Hero film (homepage + sales) built as the default explanation asset",
    "Cutdowns for outbound follow-ups and social distribution",
    "A complete visual language for marketing — built from zero (typography, motion grammar, UI metaphors)",
    "Sales-friendly narrative structure that holds up without a presenter",
  ],

  // ── MAIN VIDEO ──
  videoUrl: "https://www.youtube.com/embed/0WjL6oWzHUg?modestbranding=1&rel=0&showinfo=0&color=white",
  videoCaption: "DocUnlock — Hero Film (Homepage + Sales) · 01:28",

  // ── WHY IT WORKED ──
  whyItWorked: [
    {
      heading: "Proof-led narrative",
      body:
        "We framed the story around what buyers are actually afraid of — accuracy, liability, and adoption friction — then resolved each fear with clarity instead of hype.",
    },
    {
      heading: "Transformation (not scanning)",
      body:
        "We made the category distinction visually obvious: DocUnlock doesn’t just read documents — it transforms bundles into complete, compliant outputs.",
    },
    {
      heading: "Calm = credibility",
      body:
        "The pacing and visual restraint were designed to signal confidence and precision — the tone buyers expect in high-risk workflows.",
    },
    {
      heading: "Designed for reuse",
      body:
        "Structured to work across homepage, sales calls, outbound, and social without needing a live explanation or extra edits.",
    },
  ],

  // ── OUTCOME STATS ──
  outcomes: [
    { label: "Used across", value: "Homepage · Sales · Outbound · Social" },
    { label: "Approved by", value: "Founder + Marketing Head" },
    { label: "Built from", value: "Zero → Visual + narrative system" },
    { label: "Primary role", value: "Default explanation asset" },
  ],

  // ── QUOTES (NEW SECTION) ──
  quotes: [
    {
      text:
        "We didn’t have a polished design system for marketing. Tanosei built the visual language from zero and made the product feel enterprise-ready.",
      person: "Marketing Head, DocUnlock",
    },
    {
      text:
        "This became our default explanation asset — homepage, sales, outbound, and social. It reduced the amount of live explaining we had to do.",
      person: "Team, DocUnlock",
    },
  ],

  // ── TESTIMONIAL VIDEO — paste embed URL when you have it ──
  testimonialVideoUrl: "",
  testimonialPerson: "Founder, DocUnlock",
  testimonialQuote:
    "Tanosei understood the product before we even sent the brief. The final film made the workflow feel safe to trust — and it became the asset we point to everywhere.",

  // ── RELATED CASE STUDIES ──
  related: [
    {
      slug: "securitypal-case",
      client: "SecurityPal",
      tag: "Enterprise Narrative",
      headline: "How SecurityPal reduced 20-minute sales explanations to a 90-second video.",
      thumb: "",
    },
    {
      slug: "thera-oceans",
      client: "Thera × Oceans",
      tag: "Case Study Series",
      headline: "How Thera turned written customer stories into a 3-part outbound video series.",
      thumb: "",
    },
    {
      slug: "aleph-case",
      client: "Aleph",
      tag: "Funding Announcement",
      headline: "How Aleph announced their Series B with an investor-grade film.",
      thumb: "",
    },
  ],

  // ── NEXT CASE STUDY ──
  next: {
    slug: "securitypal-case",
    client: "SecurityPal",
    subject: "Enterprise Narrative",
    headline: "How SecurityPal reduced 20-minute sales explanations to a 90-second video.",
  },
};
// ── CASE STUDY DATA ── END ──

// ── VIDEO BLOCK COMPONENT ── START ──
function VideoBlock({
  url,
  caption,
  label,
  aspectRatio = "16 / 9",
}: {
  url: string;
  caption?: string;
  label?: string;
  aspectRatio?: string;
}) {
  return (
    <div>
      {label && (
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.30)",
            fontWeight: 600,
            marginBottom: "14px",
          }}
        >
          {label}
        </p>
      )}

      <div
        style={{
          width: "100%",
          aspectRatio,
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)", // less “pure black”
          position: "relative",
        }}
      >
        {url ? (
          <iframe
            src={url}
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 3l14 9-14 9V3z" fill="rgba(255,255,255,0.4)" />
              </svg>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.26)",
                margin: 0,
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              Video coming soon
              <br />
              <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.16)" }}>
                Paste embed URL in videoUrl field
              </span>
            </p>
          </div>
        )}
      </div>

      {caption && (
        <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.28)", margin: "10px 0 0", lineHeight: 1.6 }}>
          {caption}
        </p>
      )}
    </div>
  );
}
// ── VIDEO BLOCK COMPONENT ── END ──

// ── PULL QUOTE COMPONENT ── START ──
function PullQuote({ text, person }: { text: string; person: string }) {
  return (
    <div
      style={{
        margin: "0",
        padding: "28px 36px",
        borderLeft: "2px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.03)",
        borderRadius: "0 12px 12px 0",
      }}
    >
      <p
        style={{
          fontSize: "17px",
          color: "rgba(255,255,255,0.66)",
          lineHeight: 1.8,
          margin: "0 0 14px",
          fontStyle: "italic",
          letterSpacing: "-0.01em",
          fontFamily: "var(--font-dm)",
        }}
      >
        "{text}"
      </p>
      <p
        style={{
          fontSize: "11.5px",
          color: "rgba(255,255,255,0.30)",
          margin: 0,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        — {person}
      </p>
    </div>
  );
}
// ── PULL QUOTE COMPONENT ── END ──

// ── QUOTE GRID (NEW) ──
function QuoteCard({ text, person }: { text: string; person: string }) {
  return (
    <div
      style={{
        padding: "22px 22px",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.56)", lineHeight: 1.8, margin: "0 0 14px" }}>
        “{text}”
      </p>
      <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.30)", margin: 0, fontWeight: 600, letterSpacing: "0.03em" }}>
        — {person}
      </p>
    </div>
  );
}

export default function DocUnlockCasePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pageRef.current?.querySelectorAll(".hero-el").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out" }
      );
    });
    pageRef.current?.querySelectorAll(".fade-el").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    });
  }, []);

  const Divider = () => <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "64px 0 56px" }} />;

  const SectionLabel = ({ children }: { children: string }) => (
    <p
      style={{
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.26)",
        fontWeight: 600,
        marginBottom: "28px",
      }}
    >
      {children}
    </p>
  );

  // “Not too black” background: match your Home: #080808
  const pageBg = "#080808";

  return (
    <div style={{ background: pageBg, minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-dm), system-ui, sans-serif" }}>
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── NAV ── START ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(8,8,8,0.82)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.62)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Tanosei
          </span>
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1px" }}>
            Studio
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {[
            { label: "Work", href: "/work" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Studio", href: "/studio" },
            { label: "Team", href: "/team" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{ fontSize: "13px", color: "rgba(255,255,255,0.40)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.78)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
            >
              {label}
            </Link>
          ))}

          <a
            href="https://cal.com/tanoseihito/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12.5px",
              color: "#000",
              background: "#f2f2f2",
              padding: "8px 18px",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 600,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Book a call
          </a>
        </div>
      </nav>
      {/* ── NAV ── END ── */}

      <div ref={pageRef} style={{ padding: "140px 28px 100px", maxWidth: "860px", margin: "0 auto" }}>
        {/* ── BREADCRUMB ── */}
        <div className="hero-el" style={{ opacity: 0, display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
          <Link
            href="/case-studies"
            style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
          >
            Case Studies
          </Link>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.16)" }}>›</span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.44)" }}>
            {cs.client} — {cs.subject}
          </span>
        </div>

        {/* ── HERO ── */}
        <div style={{ marginBottom: "0" }}>
          <div className="hero-el" style={{ opacity: 0, display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            {[cs.industry, cs.type, cs.year].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.38)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  padding: "3px 10px",
                  borderRadius: "6px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="hero-el"
            style={{
              opacity: 0,
              fontFamily: "var(--font-dm)",
              fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 56px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              margin: "0 0 20px",
            }}
          >
            {cs.headline}
          </h1>

          <p className="hero-el" style={{ opacity: 0, fontSize: "16px", color: "rgba(255,255,255,0.40)", lineHeight: 1.8, margin: 0 }}>
            {cs.subhead}
          </p>
        </div>

        <Divider />

        {/* ── EXECUTIVE OVERVIEW ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Executive Overview</SectionLabel>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.64)", lineHeight: 1.9, margin: 0, letterSpacing: "-0.01em" }}>
            {cs.overview}
          </p>
        </div>

        <Divider />

        {/* ── DEPLOYMENT META ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Where It Shipped</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
            {cs.deploymentMeta.usedAcross.map((x) => (
              <div
                key={x}
                style={{
                  padding: "14px 14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", margin: "0 0 6px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Surface
                </p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.66)", margin: 0, fontWeight: 650, letterSpacing: "-0.01em" }}>
                  {x}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "18px 18px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.015)",
            }}
          >
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", margin: "0 0 8px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Approved by
            </p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.64)", margin: "0 0 10px", lineHeight: 1.6 }}>
              {cs.deploymentMeta.approvedBy}
            </p>
            <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.50)", margin: 0, lineHeight: 1.8 }}>
              {cs.deploymentMeta.note}
            </p>
          </div>
        </div>

        <Divider />

        {/* ── MAIN VIDEO ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <VideoBlock url={cs.videoUrl} caption={cs.videoCaption} label="The Film" />
        </div>

        <Divider />

        {/* ── SITUATION ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Situation</SectionLabel>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.56)", lineHeight: 1.9, margin: 0 }}>
            {cs.situation}
          </p>
        </div>

        <Divider />

        {/* ── STRATEGIC PROBLEM ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Strategic Problem</SectionLabel>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.56)", lineHeight: 1.9, margin: 0 }}>
            {cs.problem}
          </p>
        </div>

        <Divider />

        {/* ── HYPOTHESIS ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Our Hypothesis</SectionLabel>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.56)", lineHeight: 1.9, margin: 0 }}>
            {cs.hypothesis}
          </p>
        </div>

        <Divider />

        {/* ── CHALLENGE ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Key Constraints</SectionLabel>

          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.56)", lineHeight: 1.9, margin: "0 0 28px" }}>
            {cs.challengeIntro}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {cs.challengePoints.map((point, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  padding: "16px 0",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2px",
                  }}
                >
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.30)" }} />
                </div>
                <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.56)", lineHeight: 1.75, margin: 0 }}>{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PULL QUOTE ── */}
        <div className="fade-el" style={{ opacity: 0, margin: "48px 0" }}>
          <PullQuote text={cs.pullQuote.text} person={cs.pullQuote.person} />
        </div>

        {/* ── WHAT WE BUILT ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>What We Built</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {cs.deliverables.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "16px 0",
                  borderBottom: i < cs.deliverables.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.28)", flexShrink: 0 }} />
                <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.62)", lineHeight: 1.7 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── WHY IT WORKED ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Why It Worked</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {cs.whyItWorked.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "22px 20px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <p style={{ fontSize: "13px", fontWeight: 750, color: "rgba(255,255,255,0.74)", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                  {item.heading}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.44)", lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── OUTCOME STATS ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Outcome</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
            {cs.outcomes.map((o, i) => (
              <div
                key={o.label}
                style={{
                  padding: "20px 18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", fontWeight: 650, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
                  {o.label}
                </p>
                <p style={{ fontSize: "14px", fontWeight: 650, color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.4, letterSpacing: "-0.01em" }}>
                  {o.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── QUOTES (NEW) ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Client Quotes</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {cs.quotes.map((q, idx) => (
              <QuoteCard key={idx} text={q.text} person={q.person} />
            ))}
          </div>
        </div>

        <Divider />

        {/* ── TESTIMONIAL VIDEO ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <VideoBlock url={cs.testimonialVideoUrl} label="Client Testimonial" aspectRatio="16 / 7" />
          {!cs.testimonialVideoUrl && cs.testimonialQuote && (
            <div
              style={{
                marginTop: "24px",
                padding: "26px 28px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.58)", lineHeight: 1.9, margin: "0 0 16px", fontStyle: "italic" }}>
                "{cs.testimonialQuote}"
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.30)", margin: 0, fontWeight: 600, letterSpacing: "0.04em" }}>
                — {cs.testimonialPerson}
              </p>
            </div>
          )}
          {cs.testimonialVideoUrl && (
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", margin: "12px 0 0", fontWeight: 600 }}>
              — {cs.testimonialPerson}
            </p>
          )}
        </div>

        <Divider />

        {/* ── NEXT CASE STUDY ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Next Case Study</SectionLabel>

          <Link href={`/case-studies/${cs.next.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div
              style={{
                padding: "26px 28px",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.015)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.015)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.09)";
              }}
            >
              <div>
                <p style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.28)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
                  {cs.next.client} — {cs.next.subject}
                </p>
                <p style={{ fontSize: "15px", fontWeight: 650, color: "rgba(255,255,255,0.68)", margin: 0, lineHeight: 1.6, letterSpacing: "-0.01em", maxWidth: "520px" }}>
                  {cs.next.headline}
                </p>
              </div>

              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="2" style={{ flexShrink: 0, transform: "rotate(-45deg)" }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        <Divider />

        {/* ── RELATED CASE STUDIES GRID ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>More Case Studies</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {cs.related.map((r) => (
              <Link key={r.slug} href={`/case-studies/${r.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  style={{
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.015)",
                    overflow: "hidden",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.015)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "16/9",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {r.thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.thumb} alt={r.client} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.72 }} />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 3l14 9-14 9V3z" fill="rgba(255,255,255,0.14)" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "16px 18px 20px" }}>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.30)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
                      {r.client} · {r.tag}
                    </p>
                    <p style={{ fontSize: "13px", fontWeight: 650, color: "rgba(255,255,255,0.60)", margin: 0, lineHeight: 1.6, letterSpacing: "-0.01em" }}>
                      {r.headline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── BOTTOM CTA ── */}
        <div className="fade-el" style={{ opacity: 0, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <p style={{ fontSize: "18px", fontWeight: 800, color: "rgba(255,255,255,0.76)", letterSpacing: "-0.02em", margin: "0 0 6px", fontFamily: "var(--font-dm)" }}>
              Want a case study like this?
            </p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.34)", margin: 0 }}>
              We’ll scope the right format in 30 minutes.
            </p>
          </div>

          <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer" className="premiumBtn">
            <div className="rimGlow" />
            <div className="btnInnerCover" />
            <span className="btnText">Book a Clarity Call</span>
            <span className="iconBubble">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Cursor glow removed (as requested). */}
    </div>
  );
}