"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
//  CASE STUDY DATA — SecurityPal (Assurance / Security Reviews)
//  (NOT “cybersecurity tool” positioning)
// ─────────────────────────────────────────────────────────────
const cs = {
  // Meta
  slug: "securitypal-case",
  client: "SecurityPal",
  subject: "Making assurance visible",
  industry: "Assurance · Security Reviews · Enterprise SaaS",
  type: "Case Study",
  year: "2024",

  // 1) CONTEXT
  positioningHeadline: "Making assurance visible.",
  heroHeadline:
    "How SecurityPal made assurance momentum legible to enterprise buyers — before the first call.",
  heroSubhead:
    "A calm, proof-first narrative system that turns security reviews, questionnaires, and trust proof into visible progress — shipped on the landing page and shared publicly by the founder and company.",

  context: {
    category: "Assurance / Security reviews / Questionnaires / Trust proof",
    target: "Security & GRC teams + revenue leaders in enterprise sales cycles",
    problem: "Assurance work impacts revenue velocity — but it’s hard to show as value.",
    whatTheyDo:
      "SecurityPal helps teams complete security reviews faster — handling questionnaires, evidence, and assurance workflows using AI + certified security experts.",
  },

  // 2) STRATEGIC PROBLEM
  strategicProblemIntro:
    "SecurityPal didn’t need “a video.” They needed a homepage narrative that holds up under enterprise scrutiny — where every claim must be believable without a presenter.",
  strategicTensionBullets: [
    "Security reviews happen daily — but the work is hidden.",
    "When the work is hidden, assurance feels like cost — not growth infrastructure.",
    "Sales teams over-explain instead of showing proof.",
    "Without a proof-led story, positioning compresses into “questionnaire help.”",
  ],

  // 3) HYPOTHESIS
  hypothesisTitle: "What if we made assurance momentum visible?",
  hypothesisBody:
    "We reframed SecurityPal from “support for questionnaires” into infrastructure for assurance velocity. If we can visualize progress, control, and proof readiness, buyers trust earlier — and the story holds without constant live explanation.",
  hypothesisTransforms: [
    { left: "Questionnaires", right: "A completion engine buyers can trust" },
    { left: "Evidence + artifacts", right: "Proof readiness that feels structured and auditable" },
    { left: "Assurance operations", right: "A measurable revenue lever (not hidden work)" },
  ],

  // 4) CREATIVE DIRECTION
  creativeDirection: {
    tone: "Calm. Controlled. Enterprise.",
    directionNote:
      "In high-stakes enterprise categories, hype reduces trust. We chose restraint: structured pacing, clean proof, and controlled momentum — so the work feels inevitable.",
    principles: [
      "No startup explainer energy — no loud transitions, no over-editing.",
      "Proof over claims — show progress, structure, and outcomes.",
      "Controlled momentum — pacing signals reliability.",
      "Infrastructure positioning — SecurityPal as the layer that keeps deals moving.",
    ],
  },

  // OUR APPROACH (extra context)
  approachIntro:
    "We don’t start in animation. We start in skepticism: what would a risk-conscious buyer need to see to trust this?",
  approach: [
    {
      title: "Buyer skepticism mapping",
      body: "Mapped enterprise doubts (accuracy, credibility, scalability) and defined what proof resolves each one.",
    },
    {
      title: "Claims → proof discipline",
      body: "Pressure-tested every line: what can be shown, measured, or visually proved — no marketing fog.",
    },
    {
      title: "Proof-first storyboard system",
      body: "Built a proof chain around completion, control, throughput, and confidence — no filler scenes.",
    },
    {
      title: "Calm execution mechanics",
      body: "Restrained motion + high legibility so the narrative feels enterprise-safe on homepage and social.",
    },
  ],

  // 5) EXECUTION FRAMEWORK
  executionFramework: [
    {
      title: "Clarity Call",
      body: "Define buyer skepticism, proof required, and the one story that must land before any demo.",
    },
    {
      title: "Messaging Alignment",
      body: "Lock claims, proof points, and language so approvals stay factual and enterprise-safe.",
    },
    {
      title: "Storyboard System",
      body: "Translate the proof chain into an async sequence that holds without a live presenter.",
    },
    {
      title: "Visual Language Definition",
      body: "Establish a proof grammar: completion states, artifacts, signal types, and enterprise pacing.",
    },
    {
      title: "Motion System",
      body: "Minimal motion, maximum credibility — controlled momentum with calm transitions.",
    },
    {
      title: "Strategic QA",
      body: "Final pass on accuracy + clarity: does an enterprise buyer understand and trust it fast?",
    },
  ],

  // FILM
  videoUrl:
    "https://www.youtube.com/embed/azDJfHvwpEY?modestbranding=1&rel=0&showinfo=0&color=white",
  videoCaption: "Homepage film (proof-led narrative)",

  // VIDEO TESTIMONIAL (optional)
  testimonialVideoUrl: "",
  testimonialCaption: "Customer testimonial (optional)",

  // QUOTES
  quotes: [
    {
      text:
        "We didn’t want a marketing video. We wanted the work to feel real — measurable — something enterprise buyers could trust fast.",
      person: "SecurityPal team",
    },
    {
      text:
        "This explains SecurityPal better than text. That’s why we put it on the landing page.",
      person: "SecurityPal team",
    },
    {
      text:
        "It makes assurance feel structured and controlled — not reactive back-and-forth.",
      person: "SecurityPal team",
    },
  ],

  // DEPLOYMENT (landing + social)
  deploymentIntro:
    "The strongest validation wasn’t a metric — it was deployment. SecurityPal shipped the film as a front-door story and shared it publicly.",
  deployment: [
    { label: "Primary placement", value: "Landing page" },
    { label: "Public distribution", value: "Founder + Company page" },
    { label: "Use cases", value: "Homepage · Social · Sales enablement" },
    { label: "Narrative role", value: "Always-on pre-demo layer" },
  ],

  // RESULTS
  resultsIntro:
    "When assurance becomes visible, the conversation changes. Buyers arrive with context, proof lands earlier, and trust compounds without constant live explanation.",
  results: [
    "Landing page clarity: assurance momentum becomes legible in seconds.",
    "Public trust signal: shared by founder + company social.",
    "Positioning lift: infrastructure for assurance velocity (not “questionnaire help”).",
    "Cleaner first calls: less re-explaining, more forward motion.",
  ],

  // FINAL
  finalLineA: "Assurance isn’t invisible anymore.",
  finalLineB: "When proof becomes visible, deals move faster.",

  // RELATED + NEXT
  related: [
    {
      slug: "docunlock-case",
      client: "DocUnlock",
      tag: "Enterprise Clarity",
      headline: "Turning operational complexity into buyer-visible proof.",
      thumb: "",
    },
    {
      slug: "thera-oceans",
      client: "Thera × Oceans",
      tag: "Customer Story",
      headline: "Customer narrative built for sales velocity and trust.",
      thumb: "",
    },
    {
      slug: "niural-case",
      client: "Niural",
      tag: "Systems Story",
      headline: "Making back-office infrastructure feel inevitable.",
      thumb: "",
    },
  ],
  next: {
    slug: "docunlock-case",
    client: "DocUnlock",
    subject: "Enterprise Operations Clarity",
    headline: "How DocUnlock made operational work instantly legible.",
  },
};

// ─────────────────────────────────────────────────────────────
// UI HELPERS
// ─────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        margin: "64px 0 56px",
      }}
    />
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      style={{
        fontSize: "11px",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.52)",
        fontWeight: 650,
        marginBottom: "22px",
      }}
    >
      {children}
    </p>
  );
}

function MiniGridRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: "16px 16px",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "12px",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          color: "rgba(255,255,255,0.45)",
          fontWeight: 750,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          margin: "0 0 8px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "14px",
          fontWeight: 750,
          color: "rgba(255,255,255,0.78)",
          margin: 0,
          lineHeight: 1.45,
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function PullQuote({ text, person }: { text: string; person: string }) {
  return (
    <div
      style={{
        margin: "0",
        padding: "26px 30px",
        borderLeft: "2px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.03)",
        borderRadius: "0 12px 12px 0",
      }}
    >
      <p
        style={{
          fontSize: "16.5px",
          color: "rgba(255,255,255,0.70)",
          lineHeight: 1.85,
          margin: "0 0 12px",
          fontStyle: "italic",
          letterSpacing: "-0.01em",
          fontFamily: "var(--font-dm)",
        }}
      >
        “{text}”
      </p>
      <p
        style={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.42)",
          margin: 0,
          fontWeight: 750,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        — {person}
      </p>
    </div>
  );
}

function VideoBlock({
  url,
  caption,
  label,
  aspectRatio = "16 / 9",
  note,
}: {
  url: string;
  caption?: string;
  label?: string;
  aspectRatio?: string;
  note?: string;
}) {
  return (
    <div>
      {label && <SectionLabel>{label}</SectionLabel>}

      <div
        style={{
          width: "100%",
          aspectRatio,
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)",
          position: "relative",
        }}
      >
        {url ? (
          <iframe
            src={url}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              background: "transparent",
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={label || "Video"}
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
              gap: "14px",
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 3l14 9-14 9V3z" fill="rgba(255,255,255,0.55)" />
              </svg>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.35)",
                margin: 0,
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              Video coming soon
              <br />
              <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.22)" }}>
                Paste embed URL in testimonialVideoUrl
              </span>
            </p>
          </div>
        )}
      </div>

      {(caption || note) && (
        <div style={{ marginTop: "12px" }}>
          {caption && (
            <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.40)", margin: 0, lineHeight: 1.7 }}>
              {caption}
            </p>
          )}
          {note && (
            <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.30)", margin: "6px 0 0", lineHeight: 1.7 }}>
              {note}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function SecurityPalCasePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero cascade
    pageRef.current?.querySelectorAll<HTMLElement>(".hero-el").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: "power3.out" }
      );
    });

    // Scroll reveal
    pageRef.current?.querySelectorAll<HTMLElement>(".fade-el").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    });
  }, []);

  return (
    <main
      style={{
        // Black, but not “crushed”:
        // match Home background (#080808) + soft lifted gradients
        background:
          "radial-gradient(900px 520px at 18% 10%, rgba(255,255,255,0.06), rgba(0,0,0,0) 60%)," +
          "radial-gradient(900px 520px at 82% 14%, rgba(255,255,255,0.05), rgba(0,0,0,0) 62%)," +
          "linear-gradient(180deg, #0a0a0a 0%, #080808 50%, #070707 100%)",
        minHeight: "100vh",
        color: "#f2f2f2",
        fontFamily: "var(--font-dm), system-ui, sans-serif",
      }}
    >
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "18px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(8,8,8,0.72)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 900,
              color: "rgba(255,255,255,0.82)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Tanosei
          </span>
          <span
            style={{
              fontSize: "9px",
              color: "rgba(255,255,255,0.40)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: "1px",
            }}
          >
            Studio
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          {[
            { label: "Work", href: "/work" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Studio", href: "/studio" },
            { label: "Team", href: "/team" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.48)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}
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
              padding: "8px 16px",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 850,
              transition: "opacity 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.86")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Book a call
          </a>
        </div>
      </nav>

      <div
        ref={pageRef}
        className="page"
        style={{ padding: "128px 28px 110px", maxWidth: "980px", margin: "0 auto" }}
      >
        {/* ── BREADCRUMB ── */}
        <div
          className="hero-el"
          style={{
            opacity: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "30px",
          }}
        >
          <Link
            href="/case-studies"
            style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            Case Studies
          </Link>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.18)" }}>›</span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.62)" }}>
            {cs.client} — {cs.subject}
          </span>
        </div>

        {/* ── HERO ── */}
        <div style={{ marginBottom: 0 }}>
          <div
            className="hero-el"
            style={{ opacity: 0, display: "flex", gap: "8px", marginBottom: "18px", flexWrap: "wrap" }}
          >
            {[cs.industry, cs.type, cs.year].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  fontWeight: 750,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.40)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  padding: "4px 10px",
                  borderRadius: "10px",
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
              fontWeight: 900,
              fontSize: "clamp(30px, 5.1vw, 58px)",
              letterSpacing: "-0.045em",
              lineHeight: 1.04,
              margin: "0 0 16px",
            }}
          >
            {cs.heroHeadline}
          </h1>

          <p
            className="hero-el"
            style={{
              opacity: 0,
              fontSize: "16px",
              color: "rgba(255,255,255,0.40)",
              lineHeight: 1.9,
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {cs.heroSubhead}
          </p>
        </div>

        <Divider />

        {/* 1) CONTEXT */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Context</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "18px" }}>
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.03)",
                padding: "22px 22px",
              }}
            >
              <p
                style={{
                  fontSize: "10.5px",
                  color: "rgba(255,255,255,0.38)",
                  fontWeight: 750,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: "0 0 10px",
                }}
              >
                Positioning headline
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "22px",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  margin: "0 0 12px",
                  color: "rgba(255,255,255,0.86)",
                  lineHeight: 1.15,
                }}
              >
                {cs.positioningHeadline}
              </p>

              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.48)", lineHeight: 1.9, margin: "0 0 14px" }}>
                {cs.context.whatTheyDo}
              </p>

              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.40)", lineHeight: 1.9, margin: 0 }}>
                The goal: make assurance feel structured, measurable, and enterprise-safe — so it can live on the homepage and still hold up.
              </p>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              <MiniGridRow label="Category" value={cs.context.category} />
              <MiniGridRow label="Target" value={cs.context.target} />
              <MiniGridRow label="Problem" value={cs.context.problem} />
            </div>
          </div>
        </div>

        <Divider />

        {/* 2) STRATEGIC PROBLEM */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Strategic Problem</SectionLabel>

          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.52)", lineHeight: 1.95, margin: "0 0 18px" }}>
            {cs.strategicProblemIntro}
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {cs.strategicTensionBullets.map((point, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  padding: "14px 0",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "3px",
                  }}
                >
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.32)" }} />
                </div>
                <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.50)", lineHeight: 1.85, margin: 0 }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* QUOTE */}
        <div className="fade-el" style={{ opacity: 0, margin: "44px 0" }}>
          <PullQuote text={cs.quotes[0].text} person={cs.quotes[0].person} />
        </div>

        {/* 3) HYPOTHESIS */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Our Strategic Hypothesis</SectionLabel>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.03)",
              padding: "22px 22px",
              marginBottom: "16px",
            }}
          >
            <p style={{ fontFamily: "var(--font-dm)", fontSize: "18px", fontWeight: 900, letterSpacing: "-0.02em", margin: "0 0 10px", color: "rgba(255,255,255,0.80)" }}>
              {cs.hypothesisTitle}
            </p>
            <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.48)", lineHeight: 1.95, margin: 0 }}>
              {cs.hypothesisBody}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {cs.hypothesisTransforms.map((t, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.03)",
                  padding: "18px 18px",
                }}
              >
                <p style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", margin: "0 0 10px" }}>
                  Transform
                </p>
                <p style={{ fontSize: "13px", fontWeight: 850, color: "rgba(255,255,255,0.68)", margin: "0 0 10px", lineHeight: 1.55 }}>
                  {t.left}
                </p>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "10px 0" }} />
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.46)", margin: 0, lineHeight: 1.75 }}>
                  {t.right}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* THE FILM */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <VideoBlock url={cs.videoUrl} caption={cs.videoCaption} label="The Film" />
        </div>

        <Divider />

        {/* DEPLOYMENT */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Deployment</SectionLabel>

          <p style={{ fontSize: "15.5px", color: "rgba(255,255,255,0.48)", lineHeight: 1.95, margin: "0 0 18px" }}>
            {cs.deploymentIntro}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
            {cs.deployment.map((d) => (
              <MiniGridRow key={d.label} label={d.label} value={d.value} />
            ))}
          </div>

          <div className="fade-el" style={{ opacity: 0, marginTop: "22px" }}>
            <PullQuote text={cs.quotes[1].text} person={cs.quotes[1].person} />
          </div>
        </div>

        <Divider />

        {/* CREATIVE DIRECTION */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Creative Direction</SectionLabel>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.03)",
              padding: "22px 22px",
              marginBottom: "14px",
            }}
          >
            <p style={{ fontFamily: "var(--font-dm)", fontSize: "18px", fontWeight: 900, margin: "0 0 10px", color: "rgba(255,255,255,0.78)" }}>
              Tone: {cs.creativeDirection.tone}
            </p>
            <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.48)", lineHeight: 1.95, margin: 0 }}>
              {cs.creativeDirection.directionNote}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {cs.creativeDirection.principles.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  padding: "14px 0",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "999px", background: "rgba(255,255,255,0.28)", marginTop: "9px", flexShrink: 0 }} />
                <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.48)", lineHeight: 1.85, margin: 0 }}>
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* OUR APPROACH */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Our Approach</SectionLabel>

          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.50)", lineHeight: 1.95, margin: "0 0 18px" }}>
            {cs.approachIntro}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {cs.approach.map((a, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 18px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <p style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: "0 0 10px" }}>
                  Approach {String(i + 1).padStart(2, "0")}
                </p>
                <p style={{ fontSize: "13.5px", fontWeight: 900, color: "rgba(255,255,255,0.72)", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                  {a.title}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.44)", lineHeight: 1.8, margin: 0 }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>

          <div className="fade-el" style={{ opacity: 0, marginTop: "22px" }}>
            <PullQuote text={cs.quotes[2].text} person={cs.quotes[2].person} />
          </div>
        </div>

        <Divider />

        {/* EXECUTION */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Execution Framework</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {cs.executionFramework.map((step, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 18px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <p style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: "0 0 10px" }}>
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <p style={{ fontSize: "13.5px", fontWeight: 900, color: "rgba(255,255,255,0.72)", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                  {step.title}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.44)", lineHeight: 1.8, margin: 0 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* VIDEO TESTIMONIAL */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <VideoBlock
            url={cs.testimonialVideoUrl}
            caption={cs.testimonialCaption}
            label="Video Testimonial"
            note="Keep this slot even if you don’t have it yet — it becomes the highest-trust upgrade later."
          />
        </div>

        <Divider />

        {/* RESULTS */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Results</SectionLabel>

          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.52)", lineHeight: 1.95, margin: "0 0 18px" }}>
            {cs.resultsIntro}
          </p>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.03)",
              padding: "18px 18px",
            }}
          >
            {cs.results.map((x, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: i === 0 ? "0 0 12px" : "12px 0 12px",
                  borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "999px", background: "rgba(255,255,255,0.28)", marginTop: "10px", flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: "14.5px", color: "rgba(255,255,255,0.48)", lineHeight: 1.85 }}>
                  {x}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* FINAL */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Final Positioning</SectionLabel>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "14px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))",
              padding: "26px 24px",
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                fontFamily: "var(--font-dm)",
                fontWeight: 950,
                fontSize: "22px",
                letterSpacing: "-0.03em",
                color: "rgba(255,255,255,0.86)",
                lineHeight: 1.12,
              }}
            >
              {cs.finalLineA}
            </p>
            <p style={{ margin: 0, fontSize: "14.5px", color: "rgba(255,255,255,0.48)", lineHeight: 1.9 }}>
              {cs.finalLineB}
            </p>
          </div>
        </div>

        <Divider />

        {/* NEXT */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Next Case Study</SectionLabel>
          <Link href={`/case-studies/${cs.next.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div
              style={{
                padding: "24px 24px",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "18px",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.16)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.10)";
              }}
            >
              <div>
                <p style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.30)", fontWeight: 800, letterSpacing: "0.10em", textTransform: "uppercase", margin: "0 0 8px" }}>
                  {cs.next.client} — {cs.next.subject}
                </p>
                <p style={{ fontSize: "14.5px", fontWeight: 850, color: "rgba(255,255,255,0.64)", margin: 0, lineHeight: 1.65, letterSpacing: "-0.01em" }}>
                  {cs.next.headline}
                </p>
              </div>

              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" style={{ flexShrink: 0, transform: "rotate(-45deg)" }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        <Divider />

        {/* RELATED */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>More Case Studies</SectionLabel>
          <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {cs.related.map((r) => (
              <Link key={r.slug} href={`/case-studies/${r.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  style={{
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.03)",
                    overflow: "hidden",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.16)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.10)";
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "16/9",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      position: "relative",
                    }}
                  >
                    {r.thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.thumb} alt={r.client} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 3l14 9-14 9V3z" fill="rgba(255,255,255,0.14)" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "16px 16px 18px" }}>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.30)", fontWeight: 800, letterSpacing: "0.10em", textTransform: "uppercase", margin: "0 0 8px" }}>
                      {r.client} · {r.tag}
                    </p>
                    <p style={{ fontSize: "13px", fontWeight: 850, color: "rgba(255,255,255,0.58)", margin: 0, lineHeight: 1.6, letterSpacing: "-0.01em" }}>
                      {r.headline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Divider />

        {/* BOTTOM CTA */}
        <div className="fade-el" style={{ opacity: 0, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "18px" }}>
          <div>
            <p style={{ fontSize: "18px", fontWeight: 900, color: "rgba(255,255,255,0.78)", letterSpacing: "-0.02em", margin: "0 0 6px", fontFamily: "var(--font-dm)" }}>
              Want this level of enterprise clarity?
            </p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.34)", margin: 0 }}>
              We’ll pressure-test the narrative and proof in 30 minutes.
            </p>
          </div>

          <a
            href="https://cal.com/tanoseihito/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="premiumBtn"
          >
            <span className="rimGlow" />
            <span className="btnInnerCover" />
            <span className="btnText">Book a Clarity Call</span>
            <span className="iconBubble" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .noise-overlay{
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          z-index: 1;
        }

        .page{
          position: relative;
          z-index: 2;
        }

        .premiumBtn{
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px 10px 16px;
          border-radius: 999px;
          text-decoration: none;
          color: rgba(0,0,0,0.92);
          background: rgba(242,242,242,1);
          font-weight: 850;
          font-size: 12.5px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          transition: transform .18s ease, opacity .18s ease;
          white-space: nowrap;
        }
        .premiumBtn:hover{ transform: translateY(-1px); opacity: 0.92; }

        .rimGlow{
          position: absolute;
          inset: -2px;
          border-radius: 999px;
          background: radial-gradient(120px 60px at 20% 0%, rgba(255,255,255,0.50), rgba(255,255,255,0.0) 70%),
                      radial-gradient(140px 80px at 90% 120%, rgba(255,255,255,0.20), rgba(255,255,255,0.0) 70%);
          opacity: 0.9;
          pointer-events: none;
        }
        .btnInnerCover{
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0.0));
          opacity: 0.35;
          pointer-events: none;
        }
        .btnText{ position: relative; z-index: 2; }
        .iconBubble{
          position: relative;
          z-index: 2;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.10);
          color: rgba(0,0,0,0.78);
        }
        .iconBubble svg{ width: 16px; height: 16px; }

        @media (max-width: 920px){
          .page{ padding-left: 18px !important; padding-right: 18px !important; }
        }

        @media (max-width: 860px){
          .page > div[style*="gridTemplateColumns: 1.2fr 0.8fr"]{
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 760px){
          .related-grid{ grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 560px){
          .related-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}