"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
//  CASE STUDY DATA (Aleph)
//  Keep it “press-cycle timeline” (no days, no sprint language).
// ─────────────────────────────────────────────────────────────
const cs = {
  client: "Aleph",
  subject: "Series B Announcement",
  industry: "Fintech · B2B SaaS",
  type: "Funding Announcement Film",
  year: "2025",

  // ── HERO ──
  headline:
    "How Aleph announced their Series B with a film that landed with investors, press, and future hires — on a press-cycle timeline.",
  subhead:
    "A funding announcement film built for authority and speed. Delivered inside a locked announcement window and deployed across homepage, social, and hiring surfaces.",

  // ── EXECUTIVE OVERVIEW ──
  overview:
    "Aleph needed an investor-grade announcement film on a press-cycle timeline. We structured the story to signal authority to three distinct audiences simultaneously: investors validating their bet, press looking for the narrative, and candidates deciding whether to join.",

  // ── CONTEXT (optional but helpful) ──
  context: {
    category: "AI-native FP&A / financial planning",
    target: "Finance leaders + operators evaluating modern planning",
    tension:
      "Funding announcements are judged by credibility. The film had to feel institutional — not celebratory.",
  },

  // ── SITUATION ──
  situation:
    "Aleph is a modern financial planning platform built for finance teams who’ve outgrown spreadsheets. When they closed their Series B, the announcement needed to do more than confirm the raise — it needed to signal a new chapter for every audience watching: investors, press, and future hires.",

  // ── STRATEGIC PROBLEM ──
  strategicProblemIntro:
    "Aleph didn’t need “a funding video.” They needed an authority signal — designed to travel across press, hiring, and homepage contexts without losing credibility.",
  strategicProblemPoints: [
    "Press cycle was locked. The announcement date couldn’t move — the story had to be ready.",
    "Three audiences, one artifact. Investors, press, and candidates all needed to feel spoken to.",
    "Authority required. A generic “we raised money” edit risks shrinking the moment.",
    "No revision marathons. One clean feedback loop, accurate claims, and a film that lands clean.",
  ],

  // ── HYPOTHESIS ──
  hypothesisTitle: "Authority isn’t declared. It’s designed.",
  hypothesisBody:
    "We treated the film like a public artifact that should still feel credible a year later. The strategy: frame the raise as a chapter shift — not a celebration — so the same film can land differently for investors, press, and future hires without becoming generic.",
  hypothesisLayers: [
    {
      title: "Investor layer",
      body: "Reinforce conviction with restraint: clarity, inevitability, and a calm signal of momentum.",
    },
    {
      title: "Press layer",
      body: "Give a story spine: what changed, why now, and what this round unlocks — without fluff.",
    },
    {
      title: "Talent layer",
      body: "Show taste and seriousness: craft, control, and a team that can ship under pressure.",
    },
  ],

  // ── INLINE PULL QUOTES ──
  quotes: [
    {
      text:
        "We needed something that felt like Aleph — not a generic funding announcement. The film had to carry the weight of the moment.",
      person: "Team, Aleph",
    },
    {
      text:
        "It wasn’t just a video. It was how we told the story of this round — with the right level of confidence.",
      person: "Team, Aleph",
    },
  ],

  // ── WHAT WE BUILT ──
  deliverables: [
    "Hero announcement film — structured for homepage, press, and investor contexts",
    "Cutdowns for LinkedIn + distribution surfaces",
    "Motion-designed title system + lower-thirds for authority framing",
  ],

  // ── MAIN VIDEO ──
  videoUrl:
    "https://www.youtube.com/embed/7sbP3rOhPec?modestbranding=1&rel=0&showinfo=0&color=white",
  videoCaption: "Aleph — Series B Funding Announcement Film",

  // ── WHY IT WORKED (rename: Execution System) ──
  approachLabel: "Execution System",
  whyItWorked: [
    {
      heading: "Press-cycle alignment",
      body:
        "We locked the narrative spine early so the project could move fast without losing precision or credibility.",
    },
    {
      heading: "Three-audience architecture",
      body:
        "One film written to land differently for investors, press, and future hires — without feeling generic to any of them.",
    },
    {
      heading: "Authority-first direction",
      body:
        "Calm pacing, restrained motion, and clear typography — designed to signal institutional confidence, not startup excitement.",
    },
    {
      heading: "Deployment-ready outputs",
      body:
        "Exports and cutdowns prepared for immediate use across homepage, social, and internal distribution surfaces.",
    },
  ],

  // ── OUTCOME (no time-counting) ──
  outcomes: [
    { label: "Built for", value: "Investors · Press · Future hires" },
    { label: "Deployed across", value: "Homepage · Social · Hiring" },
    { label: "Outcome", value: "Clearer authority signal" },
    { label: "Package", value: "Hero film + cutdowns" },
  ],
  outcomeUses: [
    "Used as a homepage authority asset during the announcement window",
    "Shared on social (founder + company page) as the primary narrative artifact",
    "Reused across hiring and internal contexts to reinforce momentum and credibility",
  ],

  // ── TESTIMONIAL VIDEO ──
  testimonialVideoUrl:
    "https://www.youtube.com/embed/ehFjx8WjIQc?modestbranding=1&rel=0&showinfo=0&color=white",
  testimonialCaption: "Aleph — Client Testimonial",
  testimonialPerson: "Team, Aleph",
  testimonialQuote:
    "The turnaround was faster than we thought possible — and the result felt exactly right for the moment.",

  // ── RELATED CASE STUDIES ──
  related: [
    {
      slug: "securitypal-case",
      client: "SecurityPal",
      tag: "Enterprise Narrative",
      headline: "Making operational work buyer-visible — with calm, credible proof.",
      thumb: "",
    },
    {
      slug: "docunlock-case",
      client: "DocUnlock",
      tag: "Feature Clarity",
      headline: "Turning complex workflows into a story buyers understand instantly.",
      thumb: "",
    },
    {
      slug: "thera-oceans",
      client: "Thera × Oceans",
      tag: "Customer Story",
      headline: "A customer narrative designed for trust and sales velocity.",
      thumb: "",
    },
  ],

  // ── NEXT CASE STUDY ──
  next: {
    slug: "securitypal-case",
    client: "SecurityPal",
    subject: "Enterprise Narrative",
    headline: "Making enterprise operations visible — before the demo.",
  },
};

// ─────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,0.10)",
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
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.52)",
        fontWeight: 600,
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
          color: "rgba(255,255,255,0.55)",
          fontWeight: 700,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          margin: "0 0 8px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "rgba(255,255,255,0.80)",
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
        margin: 0,
        padding: "26px 30px",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "14px",
      }}
    >
      <p
        style={{
          fontSize: "16px",
          color: "rgba(255,255,255,0.78)",
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
          color: "rgba(255,255,255,0.55)",
          margin: 0,
          fontWeight: 700,
          letterSpacing: "0.10em",
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
}: {
  url: string;
  caption?: string;
  label?: string;
  aspectRatio?: string;
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
          background: "rgba(255,255,255,0.04)",
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
            }}
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
              gap: "14px",
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 3l14 9-14 9V3z"
                  fill="rgba(255,255,255,0.65)"
                />
              </svg>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.65)",
                margin: 0,
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              Video coming soon
            </p>
          </div>
        )}
      </div>

      {caption && (
        <p
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.55)",
            margin: "12px 0 0",
            lineHeight: 1.6,
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function AlephCasePage() {
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
    <div
      style={{
        background: "#080808",
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
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(8,8,8,0.78)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              color: "rgba(255,255,255,0.80)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Tanosei
          </span>
          <span
            style={{
              fontSize: "9px",
              color: "rgba(255,255,255,0.55)",
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
                color: "rgba(255,255,255,0.62)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.92)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.62)")
              }
            >
              {label}
            </Link>
          ))}

          <a
            href="https://cal.com/tanoseihito/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="premiumBtn"
          >
            <span className="rimGlow" />
            <span className="btnInnerCover" />
            <span className="btnText">Book a call</span>
            <span className="iconBubble" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </nav>

      <div
        ref={pageRef}
        className="page"
        style={{
          padding: "128px 28px 110px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
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
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.60)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.90)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.60)")
            }
          >
            Case Studies
          </Link>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.30)" }}>
            ›
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.78)" }}>
            {cs.client} — {cs.subject}
          </span>
        </div>

        {/* ── HERO ── */}
        <div style={{ marginBottom: 0 }}>
          <div
            className="hero-el"
            style={{
              opacity: 0,
              display: "flex",
              gap: "8px",
              marginBottom: "18px",
              flexWrap: "wrap",
            }}
          >
            {[cs.industry, cs.type, cs.year].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  fontWeight: 750,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.70)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  padding: "4px 10px",
                  borderRadius: "8px",
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
              fontSize: "clamp(30px, 5.1vw, 56px)",
              letterSpacing: "-0.045em",
              lineHeight: 1.04,
              margin: "0 0 14px",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            {cs.headline}
          </h1>

          <p
            className="hero-el"
            style={{
              opacity: 0,
              fontSize: "16px",
              color: "rgba(255,255,255,0.68)",
              lineHeight: 1.85,
              margin: 0,
              maxWidth: "760px",
            }}
          >
            {cs.subhead}
          </p>
        </div>

        <Divider />

        {/* ── EXECUTIVE OVERVIEW ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Executive Overview</SectionLabel>
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.04)",
              padding: "22px 22px",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.9,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {cs.overview}
            </p>
          </div>
        </div>

        <Divider />

        {/* ── THE FILM ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <VideoBlock url={cs.videoUrl} caption={cs.videoCaption} label="The Film" />
        </div>

        <Divider />

        {/* ── THE CONTEXT ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Context</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "16px" }}>
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.04)",
                padding: "22px 22px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                {cs.situation}
              </p>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              <MiniGridRow label="Category" value={cs.context.category} />
              <MiniGridRow label="Target" value={cs.context.target} />
              <MiniGridRow label="Tension" value={cs.context.tension} />
            </div>
          </div>
        </div>

        <Divider />

        {/* ── STRATEGIC PROBLEM ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Strategic Problem</SectionLabel>

          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.74)", lineHeight: 1.9, margin: "0 0 18px" }}>
            {cs.strategicProblemIntro}
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {cs.strategicProblemPoints.map((point, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  padding: "14px 0",
                  borderTop: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "3px",
                  }}
                >
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.75)",
                    }}
                  />
                </div>

                <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.68)", lineHeight: 1.75, margin: 0 }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-el" style={{ opacity: 0, margin: "42px 0" }}>
          <PullQuote text={cs.quotes[0].text} person={cs.quotes[0].person} />
        </div>

        <Divider />

        {/* ── HYPOTHESIS ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Our Strategic Hypothesis</SectionLabel>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.04)",
              padding: "22px 22px",
              marginBottom: "14px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm)",
                fontSize: "18px",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                margin: "0 0 10px",
                color: "rgba(255,255,255,0.90)",
              }}
            >
              {cs.hypothesisTitle}
            </p>
            <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.9, margin: 0 }}>
              {cs.hypothesisBody}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {cs.hypothesisLayers.map((l, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.04)",
                  padding: "18px 18px",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    margin: "0 0 10px",
                  }}
                >
                  {l.title}
                </p>
                <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.74)", margin: 0, lineHeight: 1.75 }}>
                  {l.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── WHAT WE BUILT ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>What We Built</SectionLabel>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.04)",
              padding: "10px 18px",
            }}
          >
            {cs.deliverables.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: i === 0 ? "14px 0" : "14px 0",
                  borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.10)",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.70)",
                    marginTop: "10px",
                    flexShrink: 0,
                  }}
                />
                <p style={{ margin: 0, fontSize: "14.5px", color: "rgba(255,255,255,0.74)", lineHeight: 1.8 }}>
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── EXECUTION SYSTEM ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>{cs.approachLabel}</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {cs.whyItWorked.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 18px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <p
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 850,
                    color: "rgba(255,255,255,0.86)",
                    margin: "0 0 8px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.heading}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.66)", lineHeight: 1.75, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── OUTCOME ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Outcome</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "16px" }}>
            {cs.outcomes.map((o) => (
              <MiniGridRow key={o.label} label={o.label} value={o.value} />
            ))}
          </div>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.04)",
              padding: "10px 18px",
            }}
          >
            {cs.outcomeUses.map((x, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: i === 0 ? "14px 0" : "14px 0",
                  borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.70)",
                    marginTop: "10px",
                    flexShrink: 0,
                  }}
                />
                <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.70)", lineHeight: 1.8 }}>
                  {x}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── CLIENT TESTIMONIAL VIDEO ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <VideoBlock url={cs.testimonialVideoUrl} caption={cs.testimonialCaption} label="Client Testimonial" aspectRatio="16 / 7" />

          <div style={{ marginTop: "16px" }}>
            <PullQuote text={cs.testimonialQuote} person={cs.testimonialPerson} />
          </div>
        </div>

        <Divider />

        {/* ── QUOTE 2 ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <PullQuote text={cs.quotes[1].text} person={cs.quotes[1].person} />
        </div>

        <Divider />

        {/* ── NEXT CASE STUDY ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Next Case Study</SectionLabel>

          <Link href={`/case-studies/${cs.next.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div
              style={{
                padding: "24px 22px",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "18px",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.16)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.10)";
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "10.5px",
                    color: "rgba(255,255,255,0.55)",
                    fontWeight: 800,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    margin: "0 0 8px",
                  }}
                >
                  {cs.next.client} — {cs.next.subject}
                </p>
                <p
                  style={{
                    fontSize: "14.5px",
                    fontWeight: 750,
                    color: "rgba(255,255,255,0.82)",
                    margin: 0,
                    lineHeight: 1.65,
                    letterSpacing: "-0.01em",
                    maxWidth: "560px",
                  }}
                >
                  {cs.next.headline}
                </p>
              </div>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.70)"
                strokeWidth="2"
                style={{ flexShrink: 0, transform: "rotate(-45deg)" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        <Divider />

        {/* ── RELATED ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>More Case Studies</SectionLabel>

          <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {cs.related.map((r) => (
              <Link key={r.slug} href={`/case-studies/${r.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  style={{
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.04)",
                    overflow: "hidden",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.16)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.10)";
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "16/9",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                      borderBottom: "1px solid rgba(255,255,255,0.10)",
                      position: "relative",
                    }}
                  >
                    {r.thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.thumb} alt={r.client} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 3l14 9-14 9V3z" fill="rgba(255,255,255,0.35)" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "16px 16px 18px" }}>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.60)", fontWeight: 800, letterSpacing: "0.10em", textTransform: "uppercase", margin: "0 0 8px" }}>
                      {r.client} · {r.tag}
                    </p>
                    <p style={{ fontSize: "13px", fontWeight: 750, color: "rgba(255,255,255,0.78)", margin: 0, lineHeight: 1.6, letterSpacing: "-0.01em" }}>
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
        <div
          className="fade-el"
          style={{
            opacity: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "18px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 900,
                color: "rgba(255,255,255,0.88)",
                letterSpacing: "-0.02em",
                margin: "0 0 6px",
                fontFamily: "var(--font-dm)",
              }}
            >
              Want a film like this?
            </p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.62)", margin: 0 }}>
              We’ll pressure-test your narrative and proof in 30 minutes.
            </p>
          </div>

          <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer" className="premiumBtn">
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
        @media (max-width: 820px){
          .related-grid{ grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 720px){
          /* stack the 3-layer grid */
          .page div[style*="grid-template-columns: 1fr 1fr 1fr"]{
            grid-template-columns: 1fr !important;
          }
          /* stack the context grid */
          .page div[style*="grid-template-columns: 1.15fr 0.85fr"]{
            grid-template-columns: 1fr !important;
          }
          /* outcome cards */
          .page div[style*="repeat(4, 1fr)"]{
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px){
          .related-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}