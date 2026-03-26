"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ─── PASSWORD ────────────────────────────────────────────────────────────────
// Change this to whatever you want the password to be
const ACCESS_PASSWORD = "ypalq2.2026";
const SESSION_KEY = "spal_playbook_access";

// ─── Q&A FORM STATE ───────────────────────────────────────────────────────────
const Q2_QUESTIONS = [
  { id: "q1", label: "What are SecurityPAL's top 2–3 product priorities for Q2 2026?" },
  { id: "q2", label: "Which products or features are shipping in Q2 that need video support?" },
  { id: "q3", label: "Who is the primary audience for Q2 content — prospects, existing customers, or both?" },
  { id: "q4", label: "What does success look like for content in Q2? (pipeline, adoption, brand awareness?)" },
  { id: "q5", label: "Are there specific campaigns or launches we should plan video around?" },
  { id: "q6", label: "What channels are most important — LinkedIn, sales outreach, product onboarding?" },
  { id: "q7", label: "How often do you want to review and brief new videos? (monthly call, async, both?)" },
  { id: "q8", label: "Is there a specific tone or format you want to lead with in Q2?" },
  { id: "q9", label: "What is the biggest gap right now between what SecurityPAL is building and how it is being communicated externally?" },
  { id: "q10", label: "Any constraints — budget, timeline, stakeholder availability — we should plan around?" },
];

// ─── LOCK SCREEN ─────────────────────────────────────────────────────────────
function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (input === ACCESS_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0d0d0f",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    }}>
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60%  { transform: translateX(-8px); }
          40%,80%  { transform: translateX(8px); }
        }
        .lock-shake { animation: shake 0.45s ease; }
        .lock-input:focus { outline: none; border-color: rgba(74,158,240,0.5) !important; background: rgba(74,158,240,0.04) !important; }
        .lock-btn:hover { opacity: 0.88; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 400, padding: "0 24px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 20,
          }}>
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 15, fontWeight: 700, color: "#f0f0ec", letterSpacing: "-0.03em" }}>Tanosei Studio</span>
            <span style={{ color: "rgba(240,240,236,0.28)", fontSize: 13 }}>×</span>
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 15, fontWeight: 700, color: "#4a9ef0", letterSpacing: "-0.03em" }}>SecurityPAL AI</span>
          </div>

          {/* Lock icon */}
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "rgba(74,158,240,0.08)",
            border: "1px solid rgba(74,158,240,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(74,158,240,0.8)" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 20, fontWeight: 700, color: "#f0f0ec", letterSpacing: "-0.03em", margin: "0 0 8px" }}>
            Confidential document
          </p>
          <p style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,240,236,0.42)", lineHeight: 1.7, margin: 0 }}>
            This playbook is prepared exclusively for SecurityPAL.<br />Enter the access password to continue.
          </p>
        </div>

        {/* Input */}
        <div className={shake ? "lock-shake" : ""}>
          <input
            className="lock-input"
            type="password"
            placeholder="Enter password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            onKeyDown={e => { if (e.key === "Enter") attempt(); }}
            style={{
              width: "100%", padding: "13px 16px",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${error ? "rgba(224,92,92,0.5)" : "rgba(255,255,255,0.10)"}`,
              borderRadius: 10, color: "#f0f0ec",
              fontSize: 15, fontFamily: "inherit", fontWeight: 300,
              marginBottom: 10, boxSizing: "border-box",
              transition: "border-color 0.2s, background 0.2s",
            }}
            autoFocus
          />
          {error && (
            <p style={{ fontSize: 12, color: "#e05c5c", margin: "0 0 10px 2px", fontWeight: 300 }}>
              Incorrect password. Please try again.
            </p>
          )}
          <button
            className="lock-btn"
            onClick={attempt}
            style={{
              width: "100%", padding: "13px 16px",
              background: "#4a9ef0", border: "none",
              borderRadius: 10, color: "#0d0d0f",
              fontSize: 14, fontWeight: 600,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              letterSpacing: "-0.02em", cursor: "pointer",
              transition: "opacity 0.18s",
            }}
          >
            Unlock →
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 28, fontSize: 11, fontWeight: 300, color: "rgba(240,240,236,0.22)", letterSpacing: "0.08em" }}>
          TANOSEI STUDIO · MARCH 2026 · CONFIDENTIAL
        </p>
      </div>
    </div>
  );
}

export default function SecurityPalAiPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  // Check session on mount
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setUnlocked(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const s = document.documentElement;
      const el = document.getElementById("spal-progress");
      if (el) el.style.width = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100 + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomedImg(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = zoomedImg ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [zoomedImg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("https://formspree.io/f/xqegknzo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });
    setSubmitted(true);
  };

  // ── GATE ──
  if (!unlocked) return <LockScreen onUnlock={() => setUnlocked(true)} />;

  const ZoomableImg = ({ src, alt }: { src: string; alt: string }) => (
    <div className="spal-zoomable" onClick={() => setZoomedImg(src)} title="Click to zoom">
      <img src={src} alt={alt} className="spal-timeline-img" />
      <div className="spal-zoom-hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>
        Click to zoom
      </div>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="spal-root">

        <div id="spal-progress" className="spal-progress" />

        {/* LIGHTBOX */}
        {zoomedImg && (
          <div className="spal-lightbox" onClick={() => setZoomedImg(null)}>
            <button className="spal-lightbox-close" onClick={() => setZoomedImg(null)}>✕</button>
            <img
              src={zoomedImg}
              alt="Zoomed figure"
              className="spal-lightbox-img"
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}

        {/* NAV */}
        <nav className="spal-nav">
          <div className="spal-nav-logo"><span>Tanosei Studio</span> × SecurityPAL AI</div>
          <Link href="/" className="spal-nav-back">
            ← Back to home
          </Link>
        </nav>

        {/* PAGE WRAPPER — matches case study layout */}
        <div className="spal-page-wrap">

        {/* HERO */}
        <section className="spal-hero">
          <div className="spal-hero-bg">×</div>
          <div className="spal-hero-label">Partnership brief · Q2 2026</div>
          <h1 className="spal-h1">
            What four videos<br />
            taught us about<br />
            <em>building together.</em>
          </h1>
          <div className="spal-hero-meta">
            <div className="spal-meta-item"><label>From</label><span>Tanosei Studio</span></div>
            <div className="spal-meta-item"><label>For</label><span>SecurityPAL: Aakar, Laxman, Pukar</span></div>
            <div className="spal-meta-item"><label>Goal</label><span>Monthly creative partnership, Q2 onward</span></div>
            <div className="spal-meta-item"><label>Date</label><span>March 2026</span></div>
          </div>
        </section>

        {/* ── S1: WHAT WE LEARNED ── */}
        <section className="spal-section" id="s1">
          <div className="spal-section-inner-wrap">
          <div className="spal-section-label"><span className="spal-s-num">01</span> What we learned</div>
          <h2 className="spal-h2">What we learned from<br />the last four videos.</h2>
          <p className="spal-p">Over the last four videos, enough pattern has emerged to stop treating each video as an isolated project and start improving the system behind the work.</p>

          <div className="spal-two-col">
            <div>
              <span className="spal-col-tag spal-col-blue">What worked</span>
              <ul className="spal-insight-list">
                {["Once direction was clear, Tanosei's team executed the visual side strongly and consistently.",
                  "The recent videos proved Tanosei's internal production pipeline is significantly more stable than before.",
                  "SecurityPAL kept coming back, which means the output was valuable enough to deepen the relationship.",
                  "The Tanosei team now understands SecurityPAL's category, tone, and product world. Less back and forth at the design stage.",
                  "The Tanosei team can now carry execution with less direct dependence on the founder day-to-day.",
                ].map(t => <li key={t}><span className="spal-dot spal-dot-blue" />{t}</li>)}
              </ul>
            </div>
            <div>
              <span className="spal-col-tag spal-col-red">What created friction</span>
              <ul className="spal-insight-list">
                {["Source inputs were not always clean or reliable from the start.",
                  "Script and message clarity were not locked early enough before production began.",
                  "Direction changed after storyboard or design had already moved forward, creating expensive rework.",
                  "Multiple stakeholders affected the process at different stages, stretching the timeline.",
                  "The biggest delays did not come from animation speed. They came from the shared pipeline before production.",
                ].map(t => <li key={t}><span className="spal-dot spal-dot-red" />{t}</li>)}
              </ul>
            </div>
          </div>

          <h3 className="spal-h3">Patterns visible only after multiple videos</h3>
          <ul className="spal-insight-list">
            {["The real bottleneck is no longer raw creative execution. It is the shared decision pipeline between both teams.",
              "Two videos per month is realistic now. Three becomes realistic only when the shared pipeline gets tighter.",
              "There is now enough shared history to stop treating each video as a separate event and start treating this relationship as an operating system.",
              "SecurityPAL does not just need videos. They need a consistent creative rhythm tied to quarter goals.",
            ].map(t => <li key={t}><span className="spal-dot spal-dot-green" />{t}</li>)}
          </ul>
          </div>{/* end inner-wrap */}
        </section>

        {/* ── S2: TANOSEI SIDE ── */}
        <section className="spal-section-full" id="s2">
          <div className="spal-section-inner">
            <div className="spal-section-label"><span className="spal-s-num">02</span> What strengthened</div>
            <h2 className="spal-h2">What strengthened<br />on Tanosei's side.</h2>
            <p className="spal-p">Every video in this relationship was treated as more than a production task. Each one had to carry meaning, serve a clear objective, and move something forward for SecurityPAL, not just look polished.</p>
            <p className="spal-p">That philosophy has shaped how Tanosei has built its internal system.</p>

            <div className="spal-card-grid">
              {[
                { color: "accent", title: "Independent execution", body: "A full team that can take an idea from concept to final output — with less direct dependence on the founder at every step." },
                { color: "green",  title: "Clear phase ownership", body: "An internal pipeline running on defined ownership: strategy and direction, script and design, animation and delivery." },
                { color: "purple", title: "Secure remote operation", body: "Fully remote but every confidential file remains within Tanosei's controlled environment. SecurityPAL can rely on this." },
                { color: "amber",  title: "Long-term investment", body: "Not short term hires rotating in and out — people invested in understanding the startup's world deeply and staying in it." },
                { color: "red",    title: "Active pipeline improvement", body: "Actively investing in team productivity, pipeline efficiency, and delivery speed. This is ongoing, not a one-time fix." },
                { color: "accent", title: "The shift that matters most", body: "Earlier: founder-dependent. Now: a system that executes. That is what makes a monthly retainer reliable rather than risky." },
              ].map(c => (
                <div className="spal-card" key={c.title}>
                  <div className={`spal-card-dot spal-card-dot-${c.color}`} />
                  <h4 className="spal-card-title">{c.title}</h4>
                  <p className="spal-card-body">{c.body}</p>
                </div>
              ))}
            </div>

            {/* Tanosei internal pipeline — image */}
            <div className="spal-img-wrap" style={{ marginTop: 52 }}>
              <div className="spal-img-caption">Tanosei internal pipeline — how we operate</div>
              <ZoomableImg src="/spalfigures/tanosei_internal_operations.png" alt="Tanosei Internal Operations pipeline" />
            </div>
          </div>
        </section>

        {/* ── S3: WHERE TIME GETS LOST ── */}
        <section className="spal-section" id="s3">
          <div className="spal-section-inner-wrap">
          <div className="spal-section-label"><span className="spal-s-num">03</span> Where time gets lost</div>
          <h2 className="spal-h2">Where time still<br />gets lost.</h2>
          <p className="spal-p">The production side has improved significantly. But the biggest source of timeline loss is in the shared upstream pipeline the space between SecurityPAL's internal decisions and the moment Tanosei can execute with confidence.</p>

          <ul className="spal-insight-list" style={{ marginTop: 36 }}>
            {[
              ["Input clarity", "briefs arrive before the core message has been fully decided internally."],
              ["Source reliability", "data or product details sometimes shift after work has begun."],
              ["Message lock", "script direction not confirmed before design or storyboard moves forward."],
              ["Late-stage changes", "feedback arrives after storyboard or design is complete, requiring rework not refinement."],
              ["Stakeholder timing", "multiple people affect direction at different stages without a clear decision gate."],
              ["Handoff gaps", "the biggest timeline losses happen at handoff points between teams, not during active execution."],
            ].map(([bold, rest]) => (
              <li key={bold}>
                <span className="spal-dot spal-dot-red" />
                <span><strong className="spal-strong">{bold}</strong> — {rest}</span>
              </li>
            ))}
          </ul>

          {/* ── TIMELINE VISUALS ── */}
          <h3 className="spal-h3" style={{ marginTop: 52 }}>What this looked like across real projects</h3>

          <div className="spal-img-wrap">
            <div className="spal-img-caption">
              <span className="spal-tl-badge spal-tl-red">Analytics Video</span>
              <span className="spal-tl-total">21 days total — 5 drafts</span>
            </div>
            <ZoomableImg src="/spalfigures/timeline_analytics_video.png" alt="Timeline of Analytics Video" />
          </div>

          <div className="spal-img-wrap" style={{ marginTop: 16 }}>
            <div className="spal-img-caption">
              <span className="spal-tl-badge spal-tl-amber">2025 Year in Review Video</span>
              <span className="spal-tl-total">~10.5 days — clean pipeline</span>
            </div>
            <ZoomableImg src="/spalfigures/timeline_2025_Year.png" alt="Timeline of 2025 Year in Review Video" />
          </div>

          <div className="spal-quote-block spal-quote-red" style={{ marginTop: 48 }}>
            <p className="spal-quote-p">"No amount of production speed on Tanosei's side can absorb upstream delays. Solving this together is the highest-leverage improvement available to both sides."</p>
          </div>
          </div>{/* end inner-wrap */}
        </section>

        {/* ── S4: SHARED PIPELINE ── */}
        <section className="spal-section-full" id="s4">
          <div className="spal-section-inner">
            <div className="spal-section-label"><span className="spal-s-num">04</span> The shared pipeline</div>
            <h2 className="spal-h2">The shared pipeline<br />we should build.</h2>
            <p className="spal-p">The goal is a shared operating rhythm where ideas, priorities, and approvals flow cleanly — so execution can happen fast and without repeated interruption. Tanosei wants to become a creative department SecurityPAL does not have to manage constantly. Your win is our win.</p>

            {/* The Principle */}
            <div className="spal-principle-block">
              <div className="spal-principle-label">The principle</div>
              <p className="spal-principle-body">The video should never be random. It should come from:</p>
              <div className="spal-flow-chain spal-flow-good">
                {["Goal", "Opportunity", "Idea", "Alignment", "Production"].map((s, i, a) => (
                  <span key={s} className="spal-flow-item">
                    <span className="spal-flow-step">{s}</span>
                    {i < a.length - 1 && <span className="spal-flow-arrow">→</span>}
                  </span>
                ))}
              </div>
              <p className="spal-principle-not">Not:</p>
              <div className="spal-flow-chain spal-flow-bad">
                {["Random idea", "Make video", "Ask later if it was useful"].map((s, i, a) => (
                  <span key={s} className="spal-flow-item">
                    <span className="spal-flow-step">{s}</span>
                    {i < a.length - 1 && <span className="spal-flow-arrow">→</span>}
                  </span>
                ))}
              </div>
              <p className="spal-principle-body" style={{ marginTop: 20 }}>
                <strong style={{ color: "var(--text)", fontFamily: "var(--font-dm), system-ui, sans-serif", fontWeight: 600 }}>Pukar's brain</strong> — goals, objectives, product roadmap, what matters this quarter, what story SecurityPAL needs to tell the market.
              </p>
              <p className="spal-principle-body">
                <strong style={{ color: "var(--text)", fontFamily: "var(--font-dm), system-ui, sans-serif", fontWeight: 600 }}>Sushan's brain</strong> — creative ideas, visual execution, what makes a great video.
              </p>
              <p className="spal-principle-body">
                These two brains are not connected. So videos get made in isolation - reactive, random, disconnected from what SecurityPAL actually needs to achieve. The shared pipeline solves this by creating <em style={{ fontStyle: "normal", color: "var(--accent)" }}>one shared brain.</em>
              </p>
            </div>

            {/* 3 Layers */}
            <h3 className="spal-h3" style={{ marginTop: 48 }}>The system — three layers</h3>

            <div className="spal-layers">
              <div className="spal-layer spal-layer-red">
                <div className="spal-layer-num">Layer 1</div>
                <div className="spal-layer-title">Context feed <span className="spal-layer-dir">their side → Tanosei</span></div>
                <p className="spal-layer-body">Tanosei need to know what's cooking before we can bring ideas. SecurityPAL shares — before the brief, not after:</p>
                <ul className="spal-layer-list">
                  <li>What products are launching this quarter</li>
                  <li>What the business goal is behind each launch</li>
                  <li>What audience they are trying to reach</li>
                  <li>What success looks like for each piece of content</li>
                </ul>
                <div className="spal-layer-note">A shared Notion page, a monthly 30-minute call, or a structured message. The format does not matter — the timing does.</div>
              </div>

              <div className="spal-layer spal-layer-blue">
                <div className="spal-layer-num">Layer 2</div>
                <div className="spal-layer-title">Ideas and resources <span className="spal-layer-dir">Tanosei → them</span></div>
                <p className="spal-layer-body">Once we have context, we bring real creative ideas — not random ones:</p>
                <ul className="spal-layer-list">
                  <li>3–5 video concepts tied to their actual upcoming launches</li>
                  <li>References, formats, examples that match the objective</li>
                  <li>A suggested approach for each — what the video achieves, who it is for, what it needs to say</li>
                </ul>
                <div className="spal-layer-note">Pukar, Laxman, or Aakar filters: what to execute, what to shelve, what to develop further. We stop waiting for a brief and start bringing ideas to the table.</div>
              </div>

              <div className="spal-layer spal-layer-purple">
                <div className="spal-layer-num">Layer 3</div>
                <div className="spal-layer-title">Production pipeline <span className="spal-layer-dir">shared execution</span></div>
                <p className="spal-layer-body">Once an idea is approved — it goes through the same pipeline every time:</p>
                <div className="spal-layer-flow">
                  {[
                    "Idea approved",
                    "Brief locked — message, objective, audience",
                    "Storyboard — one review round, then locked",
                    "Design — no direction changes after this",
                    "Animation",
                    "Draft 1 — feedback within scope only",
                    "Output",
                  ].map((step, i) => (
                    <div className="spal-layer-flow-step" key={i}>
                      <span className="spal-layer-flow-dot" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6-step pipeline */}
            <h3 className="spal-h3" style={{ marginTop: 52 }}>Shared strategic pipeline</h3>
            <div className="spal-pipeline6">
              {[
                { n: "1", title: "What's happening", body: "Upcoming launches, product updates, internal priorities, quarter goals", color: "red" },
                { n: "2", title: "Idea capture", body: "Founder ideas, Tanosei ideas, demand gen ideas, product signals, customer-facing opportunities", color: "amber" },
                { n: "3", title: "Strategic filter", body: "Why now, who it's for, what objective it supports, whether enough context exists", color: "blue" },
                { n: "4", title: "Production readiness", body: "Message lock, input lock, direction lock, stakeholder alignment", color: "green" },
                { n: "5", title: "Production", body: "Script → storyboard → design → animation → QC → output", color: "purple" },
                { n: "6", title: "Feedback loop", body: "What worked, what should repeat, what should improve next time", color: "accent" },
              ].map((s, i, a) => (
                <div className="spal-p6-item" key={s.n}>
                  <div className={`spal-p6-num spal-p6-${s.color}`}>{s.n}</div>
                  <div className="spal-p6-content">
                    <div className="spal-p6-title">{s.title}</div>
                    <div className="spal-p6-body">{s.body}</div>
                  </div>
                  {i < a.length - 1 && <div className="spal-p6-connector" />}
                </div>
              ))}
            </div>

            <h3 className="spal-h3" style={{ marginTop: 48 }}>What this makes possible</h3>
            <ul className="spal-insight-list" style={{ marginTop: 14 }}>
              {["A lightweight monthly alignment call at the start of each month — upcoming launches and priorities shared early enough to plan around.",
                "Product updates stop being isolated projects and become a repeatable communication system.",
                "Tanosei brings early creative ideas tied to real product moments — not reacting to last-minute briefs.",
                "SecurityPAL gets a creative department that runs without constant management.",
              ].map(t => <li key={t}><span className="spal-dot spal-dot-blue" />{t}</li>)}
            </ul>
          </div>
        </section>

        {/* ── S5: Q2 PRIORITIES + QUESTIONS ── */}
        <section className="spal-section" id="s5">
          <div className="spal-section-inner-wrap">
          <div className="spal-section-label"><span className="spal-s-num">05</span> SecurityPAL's Q2 priorities</div>
          <h2 className="spal-h2">SecurityPAL's Q2 priorities —<br />and how video supports them.</h2>
          <p className="spal-p">Video is not just content. It is how complex products become legible to the people who need to trust them. The goal of every video Tanosei makes is not to look impressive — it is to help SecurityPAL hit its quarterly objectives.</p>
          <p className="spal-p">Based on my conversations with Aakar dai on 25th March, here is what we believe matters most in Q2. We would love your input to sharpen this.</p>

          <div className="spal-priority-grid">
            {[
              { n: "01", title: "Product update videos", body: "Flows, Trust Center, Project & Tasks, Vendor Access — each release made visible and understandable to customers and prospects.", color: "blue" },
              { n: "02", title: "Feature launch videos", body: "Giving new capabilities a clear, confident introduction to the market the moment they ship.", color: "green" },
              { n: "03", title: "Customer-facing communication", body: "Helping customers understand the value of what they already have — reducing churn, increasing adoption.", color: "purple" },
              { n: "04", title: "Visible product momentum", body: "Showing the market that SecurityPAL is building, shipping, and improving — consistently, quarter over quarter.", color: "amber" },
              { n: "05", title: "Demand gen support", body: "Video as pipeline fuel — LinkedIn, outbound sequences, campaign assets tied to actual revenue goals.", color: "blue" },
              { n: "06", title: "Repeatable content system", body: "Stop treating each video as a one-off. Build a quarterly rhythm where content compounds and builds brand authority.", color: "green" },
            ].map(item => (
              <div className={`spal-priority-item spal-priority-${item.color}`} key={item.n}>
                <div className="spal-priority-num">{item.n}</div>
                <h4 className="spal-priority-title">{item.title}</h4>
                <p className="spal-priority-body">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Q2 Questions Form */}
          <div className="spal-q-form-wrap" style={{ marginTop: 56 }}>
            <div className="spal-q-form-header">
              <div className="spal-q-form-eyebrow">For Aakar, Laxman, Pukar</div>
              <h3 className="spal-q-form-title">Help us understand your Q2 — answer directly here.</h3>
              <p className="spal-q-form-sub">These answers will help Tanosei plan the first month more precisely. No meeting needed — just fill this out and we will come prepared.</p>
            </div>

            {submitted ? (
              <div className="spal-q-submitted">
                <div className="spal-q-submitted-icon">✓</div>
                <div className="spal-q-submitted-title">Answers received.</div>
                <div className="spal-q-submitted-body">Thank you — Sushan will review these and follow up shortly.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="spal-q-form">
                {Q2_QUESTIONS.map((q, i) => (
                  <div className="spal-q-item" key={q.id}>
                    <label className="spal-q-label">
                      <span className="spal-q-num">{String(i + 1).padStart(2, "0")}</span>
                      {q.label}
                    </label>
                    <textarea
                      className="spal-q-textarea"
                      placeholder="Your answer..."
                      value={answers[q.id] || ""}
                      onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      rows={2}
                    />
                  </div>
                ))}
                <button type="submit" className="spal-q-submit">
                  Send answers to Tanosei →
                </button>
              </form>
            )}
          </div>
          </div>{/* end inner-wrap */}
        </section>

        {/* ── S6: MONTHLY RHYTHM ── */}
        <section className="spal-section" id="s6">
          <div className="spal-section-inner-wrap">
          <div className="spal-section-label"><span className="spal-s-num">06</span> Monthly rhythm</div>
          <h2 className="spal-h2">Recommended monthly<br />rhythm: 2 vs 3 videos.</h2>
          <p className="spal-p">The conversation about 2 or 3 videos per month is really about pipeline readiness and shared commitment — not just production capacity. The ambition is to get to Pukar dai's original goal of 1 video per week. That is the direction. But it has to be earned through a working system.</p>
          <p className="spal-p">A monthly retainer means Tanosei plans team bandwidth around SecurityPAL's calendar — not the other way around. Both sides operate with predictability. The relationship compounds each month.</p>
          </div>{/* end inner-wrap */}
        </section>

        {/* ── S7: NEXT STEP ── */}
        <section className="spal-section" id="s7">
          <div className="spal-section-inner-wrap">
          <div className="spal-section-label"><span className="spal-s-num">07</span> Next step</div>
          <h2 className="spal-h2">Next step.</h2>
          <p className="spal-p">The groundwork is already in place. Four videos in. Real context built. Friction identified on both sides. The only thing left is the decision to make this a proper partnership.</p>

          <div className="spal-next-steps">
            {[
              { n: "01", title: "Alignment conversation", body: "A short meeting between Aakar, Laxman / Pukar, and Sushan to confirm the monthly rhythm and shared pipeline structure." },
              { n: "02", title: "Confirm the package", body: "Choose cadence and lock in the monthly retainer going forward." },
              { n: "03", title: "First monthly alignment call", body: "30 minutes at the start of the first month — share upcoming launches, Q2 priorities, and brief the first videos together." },
              { n: "04", title: "Execute the first month cleanly", body: "Deliver on time. Use the shared pipeline. Build the trust that makes month two even faster." },
            ].map(s => (
              <div className="spal-next-step" key={s.n}>
                <span className="spal-step-num">{s.n}</span>
                <div>
                  <h4 className="spal-step-title">{s.title}</h4>
                  <p className="spal-step-body">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="spal-quote-block" style={{ marginTop: 60 }}>
            <p className="spal-quote-p">"Your win is our win. That has always been the operating principle. Let's build the system that makes it consistent."</p>
          </div>
          </div>{/* end inner-wrap */}
        </section>

        <footer className="spal-footer">
          <div className="spal-footer-l"><strong>Tanosei Studio</strong> — Creative production partner</div>
          <div className="spal-footer-r">March 2026 &nbsp;·&nbsp; Prepared for SecurityPAL &nbsp;·&nbsp; Confidential</div>
        </footer>

        </div>{/* end page-wrap */}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  .spal-root {
    --bg:     #0d0d0f;
    --bg2:    #141417;
    --border: rgba(255,255,255,0.08);
    --border2:rgba(255,255,255,0.13);
    --text:   #f0f0ec;
    --muted:  rgba(240,240,236,0.65);
    --dim:    rgba(240,240,236,0.38);
    --accent: #4a9ef0;
    --accent-dim:    rgba(74,158,240,0.08);
    --accent-border: rgba(74,158,240,0.20);
    --green:         #34c98a;
    --green-dim:     rgba(52,201,138,0.08);
    --green-border:  rgba(52,201,138,0.20);
    --red:           #e05c5c;
    --red-dim:       rgba(224,92,92,0.08);
    --red-border:    rgba(224,92,92,0.20);
    --purple:        #a882f0;
    --purple-dim:    rgba(168,130,240,0.10);
    --purple-border: rgba(168,130,240,0.22);
    --amber:         #f0c84a;
    --amber-dim:     rgba(240,200,74,0.10);
    --amber-border:  rgba(240,200,74,0.22);
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-bricolage), system-ui, sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.75;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  /* PAGE WRAP — matches case study: maxWidth 980px centered */
  .spal-page-wrap { max-width: 980px; margin: 0 auto; padding: 0 28px 110px; }

  .spal-progress { position: fixed; top: 0; left: 0; height: 1px; background: var(--accent); width: 0%; z-index: 9999; transition: width 0.08s linear; }

  /* NAV */
  .spal-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 52px; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; background: rgba(13,13,15,0.90); backdrop-filter: blur(18px); border-bottom: 1px solid var(--border); }
  .spal-nav-logo { font-family: var(--font-dm), system-ui, sans-serif; font-size: 13px; font-weight: 500; letter-spacing: -0.02em; color: var(--muted); }
  .spal-nav-logo span { color: var(--text); font-weight: 600; }
  .spal-nav-back { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 12px; font-weight: 300; color: var(--muted); text-decoration: none; padding: 6px 12px; border-radius: 6px; border: 1px solid var(--border); transition: color 0.18s, border-color 0.18s; }
  .spal-nav-back:hover { color: var(--text); border-color: var(--border2); }

  /* HERO */
  .spal-hero { display: flex; flex-direction: column; padding: 96px 0 72px; border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
  .spal-hero-inner { width: 100%; }
  .spal-hero-bg { position: absolute; right: -40px; top: 50%; transform: translateY(-50%); font-family: var(--font-dm), system-ui, sans-serif; font-size: 320px; font-weight: 700; color: rgba(255,255,255,0.018); line-height: 1; user-select: none; pointer-events: none; letter-spacing: -0.08em; }
  .spal-hero-label { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 28px; opacity: 0.85; display: flex; align-items: center; gap: 10px; }
  .spal-hero-label::before { content: ''; display: block; width: 28px; height: 1px; background: var(--accent); opacity: 0.5; }
  .spal-h1 { font-family: var(--font-dm), system-ui, sans-serif; font-size: clamp(44px, 6.5vw, 88px); font-weight: 700; line-height: 1.04; letter-spacing: -0.05em; max-width: 860px; margin-bottom: 48px; color: var(--text); }
  .spal-h1 em { font-style: normal; color: var(--accent); }
  .spal-hero-meta { display: flex; gap: 48px; flex-wrap: wrap; border-top: 1px solid var(--border); padding-top: 28px; }
  .spal-meta-item label { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; color: var(--dim); display: block; margin-bottom: 5px; }
  .spal-meta-item span { font-family: var(--font-dm), system-ui, sans-serif; font-size: 13.5px; font-weight: 500; color: var(--text); letter-spacing: -0.02em; }

  /* SECTIONS — no side padding, page-wrap handles it */
  .spal-section { border-bottom: 1px solid var(--border); }
  .spal-section-inner-wrap { padding: 80px 0; }
  .spal-section-full { border-bottom: 1px solid var(--border); }
  .spal-section-inner { padding: 80px 0; }
  .spal-section-label { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9.5px; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: var(--dim); margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
  .spal-section-label::before { content: ''; display: block; width: 22px; height: 1px; background: var(--dim); }
  .spal-s-num { color: var(--accent); opacity: 0.8; }
  .spal-h2 { font-family: var(--font-dm), system-ui, sans-serif; font-size: clamp(28px, 3.8vw, 48px); font-weight: 700; line-height: 1.08; letter-spacing: -0.04em; margin-bottom: 24px; color: var(--text); }
  .spal-h3 { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9.5px; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-top: 44px; margin-bottom: 14px; }
  .spal-p { font-family: var(--font-bricolage), system-ui, sans-serif; font-weight: 300; font-size: 14.5px; color: rgba(240,240,236,0.82); line-height: 1.82; margin-bottom: 14px; max-width: 680px; }

  /* TWO COL */
  .spal-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-top: 44px; }
  .spal-col-tag { display: inline-flex; align-items: center; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; border: 1px solid currentColor; margin-bottom: 20px; opacity: 0.8; }
  .spal-col-blue  { color: var(--accent); background: var(--accent-dim); }
  .spal-col-green { color: var(--green);  background: var(--green-dim); }
  .spal-col-red   { color: var(--red);    background: var(--red-dim); }

  /* INSIGHT LIST */
  .spal-insight-list { list-style: none; }
  .spal-insight-list li { display: flex; gap: 16px; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid var(--border); font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 14px; font-weight: 300; color: rgba(240,240,236,0.88); line-height: 1.72; }
  .spal-insight-list li:last-child { border-bottom: none; }
  .spal-dot { flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%; margin-top: 8px; display: inline-block; }
  .spal-dot-blue   { background: var(--accent); }
  .spal-dot-green  { background: var(--green); }
  .spal-dot-red    { background: var(--red); }
  .spal-dot-accent { background: var(--green); }
  .spal-strong { font-family: var(--font-dm), system-ui, sans-serif; font-weight: 600; color: var(--text); font-size: 13.5px; letter-spacing: -0.02em; }

  /* CARD GRID */
  .spal-card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-top: 44px; }
  .spal-card { background: var(--bg2); padding: 28px 28px 24px; }
  .spal-card-dot { width: 28px; height: 28px; border-radius: 6px; margin-bottom: 16px; }
  .spal-card-dot-accent { background: var(--accent-dim); border: 1px solid var(--accent-border); }
  .spal-card-dot-green  { background: var(--green-dim);  border: 1px solid var(--green-border); }
  .spal-card-dot-purple { background: var(--purple-dim); border: 1px solid var(--purple-border); }
  .spal-card-dot-amber  { background: var(--amber-dim);  border: 1px solid var(--amber-border); }
  .spal-card-dot-red    { background: var(--red-dim);    border: 1px solid var(--red-border); }
  .spal-card-title { font-family: var(--font-dm), system-ui, sans-serif; font-size: 14px; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 8px; color: var(--text); }
  .spal-card-body { font-size: 13px; color: var(--muted); max-width: none; margin: 0; line-height: 1.65; }

  /* PIPELINE (internal) */
  .spal-pipeline-wrap { background: var(--bg2); border: 1px solid var(--border2); border-radius: 12px; padding: 32px; overflow-x: auto; margin-top: 44px; }
  .spal-pipeline-caption { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9.5px; font-weight: 300; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); margin-bottom: 28px; }
  .spal-pipeline { display: flex; align-items: stretch; min-width: 660px; }
  .spal-pipe-start, .spal-pipe-end { display: flex; align-items: center; justify-content: center; width: 56px; height: 44px; border-radius: 7px; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; flex-shrink: 0; align-self: center; }
  .spal-pipe-start { background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-border); }
  .spal-pipe-end   { background: var(--purple-dim); color: var(--purple); border: 1px solid var(--purple-border); }
  .spal-pipe-arrow { display: flex; align-items: center; padding: 0 8px; color: var(--dim); font-size: 16px; align-self: center; flex-shrink: 0; }
  .spal-pipe-phase { flex: 1; border: 1px solid var(--border2); border-radius: 8px; padding: 18px 16px; }
  .spal-pipe-days { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
  .spal-pipe-steps { display: flex; gap: 6px; flex-wrap: wrap; }
  .spal-pipe-step { padding: 4px 10px; border-radius: 4px; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 11px; font-weight: 400; }
  .spal-step-amber  { background: var(--amber-dim);  color: var(--amber); }
  .spal-step-green  { background: var(--green-dim);  color: var(--green); }
  .spal-step-blue   { background: var(--accent-dim); color: var(--accent); }
  .spal-step-purple { background: var(--purple-dim); color: var(--purple); }
  .spal-step-red    { background: var(--red-dim);    color: var(--red); }
  .spal-pipe-people { margin-top: 12px; display: flex; flex-direction: column; gap: 3px; }
  .spal-pipe-person { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 11px; font-weight: 300; color: var(--muted); }
  .spal-pipe-person span { color: var(--text); font-weight: 400; }
  .spal-pipe-lock { margin-top: 10px; padding: 5px 9px; border-radius: 4px; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9.5px; font-weight: 400; letter-spacing: 0.06em; }
  .spal-lock-red   { background: var(--red-dim);    color: var(--red);    border: 1px solid var(--red-border); }
  .spal-lock-green { background: var(--green-dim);  color: var(--green);  border: 1px solid var(--green-border); }
  .spal-lock-blue  { background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-border); }
  .spal-pipe-manager { margin-top: 16px; padding: 10px 16px; border: 1px solid var(--border); border-radius: 6px; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 300; color: var(--muted); text-align: center; }
  .spal-pipe-manager span { color: var(--accent); }

  /* ── TIMELINE VISUALS ── */
  .spal-timeline-wrap { background: var(--bg2); border: 1px solid var(--border2); border-radius: 12px; padding: 28px; overflow-x: auto; margin-top: 32px; }
  .spal-timeline-title { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .spal-tl-badge { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; border: 1px solid currentColor; }
  .spal-tl-red    { color: var(--red);   background: var(--red-dim); }
  .spal-tl-amber  { color: var(--green); background: var(--green-dim); }
  .spal-tl-total  { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 11px; color: var(--dim); }
  .spal-timeline-grid { min-width: 700px; }
  .spal-tl-header { display: grid; grid-template-columns: 90px repeat(9, 1fr); gap: 3px; margin-bottom: 6px; }
  .spal-tl-col-label { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9px; color: var(--dim); text-align: center; letter-spacing: 0.08em; padding-bottom: 4px; border-bottom: 1px solid var(--border); }
  .spal-tl-row { display: grid; grid-template-columns: 90px repeat(9, 1fr); gap: 3px; margin-bottom: 3px; }
  .spal-tl-lane-label { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; display: flex; align-items: center; padding-right: 10px; }
  .spal-tl-tanosei-label { color: var(--accent); }
  .spal-tl-spal-label    { color: var(--red); }
  .spal-tl-cell { border-radius: 5px; padding: 8px 6px; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 400; text-align: center; color: var(--dim); min-height: 36px; display: flex; align-items: center; justify-content: center; }
  .spal-tl-tanosei      { background: rgba(74,158,240,0.12); color: var(--accent); border: 1px solid var(--accent-border); }
  .spal-tl-spal         { background: rgba(224,92,92,0.12);  color: var(--red);    border: 1px solid var(--red-border); }
  .spal-tl-spal-change  { background: rgba(240,200,74,0.12); color: var(--amber);  border: 1px solid var(--amber-border); }
  .spal-tl-legend { margin-top: 14px; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10.5px; color: var(--dim); display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
  .spal-tl-legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
  .spal-tl-tanosei-dot { background: var(--accent); }
  .spal-tl-spal-dot    { background: var(--red); }
  .spal-tl-change-dot  { background: var(--amber); }

  /* ── SPLIT PIPELINE ── */
  .spal-split-pipeline { background: var(--bg2); border: 1px solid var(--border2); border-radius: 12px; padding: 32px; overflow-x: auto; margin-top: 32px; }
  .spal-split-caption { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9.5px; font-weight: 300; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); margin-bottom: 20px; }
  .spal-split-header { display: grid; grid-template-columns: 90px repeat(3, 1fr); gap: 8px; margin-bottom: 8px; min-width: 600px; }
  .spal-split-lane-label { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; display: flex; align-items: center; justify-content: flex-end; padding-right: 12px; }
  .spal-split-phase-header { padding: 8px 14px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 400; }
  .spal-split-red-hdr    { background: var(--red-dim);    color: var(--red);    border: 1px solid var(--red-border); }
  .spal-split-blue-hdr   { background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-border); }
  .spal-split-purple-hdr { background: var(--purple-dim); color: var(--purple); border: 1px solid var(--purple-border); }
  .spal-split-owner { opacity: 0.65; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; }
  .spal-split-row { display: grid; grid-template-columns: 90px repeat(3, 1fr); gap: 8px; margin-bottom: 2px; min-width: 600px; }
  .spal-tanosei-lane { color: var(--accent); }
  .spal-spal-lane    { color: var(--red); }
  .spal-split-cell { border-radius: 8px; padding: 14px 16px; display: flex; flex-direction: column; gap: 6px; min-height: 80px; }
  .spal-split-empty { background: transparent; border: 1px dashed var(--border); justify-content: center; }
  .spal-split-blue-cell   { background: var(--accent-dim); border: 1px solid var(--accent-border); }
  .spal-split-red-cell    { background: var(--red-dim);    border: 1px solid var(--red-border); }
  .spal-split-purple-cell { background: var(--purple-dim); border: 1px solid var(--purple-border); }
  .spal-split-names { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; color: var(--muted); margin-top: 4px; }
  .spal-split-review-note { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 11px; color: var(--dim); text-align: center; }
  .spal-split-aakar { display: flex; align-items: center; gap: 12px; margin: 10px 0; min-width: 600px; }
  .spal-split-aakar-line { flex: 1; height: 1px; background: var(--border2); }
  .spal-split-aakar-label { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 400; color: var(--muted); white-space: nowrap; padding: 4px 12px; border: 1px solid var(--border2); border-radius: 999px; }

  /* PRIORITY GRID */
  .spal-priority-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-top: 44px; }
  .spal-priority-item { background: var(--bg2); padding: 26px 28px; border-left: 2px solid transparent; transition: background 0.2s; }
  .spal-priority-item:hover { background: rgba(255,255,255,0.03); }
  .spal-priority-blue   { border-left-color: var(--accent); }
  .spal-priority-green  { border-left-color: var(--green); }
  .spal-priority-purple { border-left-color: var(--purple); }
  .spal-priority-amber  { border-left-color: var(--amber); }
  .spal-priority-num { font-family: var(--font-dm), system-ui, sans-serif; font-size: 28px; font-weight: 700; letter-spacing: -0.05em; line-height: 1; color: rgba(255,255,255,0.06); margin-bottom: 10px; }
  .spal-priority-title { font-family: var(--font-dm), system-ui, sans-serif; font-size: 13.5px; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 7px; color: var(--text); }
  .spal-priority-body { font-size: 12.5px; color: var(--muted); max-width: none; margin: 0; line-height: 1.62; }

  /* Q2 QUESTIONS FORM */
  .spal-q-form-wrap { background: var(--bg2); border: 1px solid var(--border2); border-radius: 14px; overflow: hidden; }
  .spal-q-form-header { padding: 32px 36px 28px; border-bottom: 1px solid var(--border); }
  .spal-q-form-eyebrow { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9.5px; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; opacity: 0.8; }
  .spal-q-form-title { font-family: var(--font-dm), system-ui, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: -0.03em; color: var(--text); margin-bottom: 10px; }
  .spal-q-form-sub { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 13.5px; font-weight: 300; color: var(--muted); line-height: 1.7; margin: 0; max-width: 600px; }
  .spal-q-form { padding: 8px 0; }
  .spal-q-item { padding: 20px 36px; border-bottom: 1px solid var(--border); }
  .spal-q-item:last-of-type { border-bottom: none; }
  .spal-q-label { display: flex; align-items: flex-start; gap: 14px; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 13.5px; font-weight: 400; color: var(--text); line-height: 1.6; margin-bottom: 10px; }
  .spal-q-num { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 400; color: var(--accent); opacity: 0.7; flex-shrink: 0; margin-top: 2px; min-width: 22px; }
  .spal-q-textarea { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 8px; padding: 12px 16px; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 13.5px; font-weight: 300; color: var(--text); line-height: 1.65; resize: vertical; outline: none; transition: border-color 0.18s; }
  .spal-q-textarea::placeholder { color: var(--dim); }
  .spal-q-textarea:focus { border-color: var(--accent-border); background: rgba(74,158,240,0.04); }
  .spal-q-submit { display: block; margin: 24px 36px 32px; padding: 14px 28px; background: var(--accent); color: #0d0d0f; font-family: var(--font-dm), system-ui, sans-serif; font-size: 13.5px; font-weight: 600; letter-spacing: -0.02em; border: none; border-radius: 8px; cursor: pointer; transition: opacity 0.18s; }
  .spal-q-submit:hover { opacity: 0.88; }
  .spal-q-submitted { padding: 52px 36px; text-align: center; }
  .spal-q-submitted-icon { font-size: 32px; color: var(--green); margin-bottom: 14px; }
  .spal-q-submitted-title { font-family: var(--font-dm), system-ui, sans-serif; font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
  .spal-q-submitted-body { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 14px; font-weight: 300; color: var(--muted); }

  /* NEXT STEPS */
  .spal-next-steps { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-top: 44px; }
  .spal-next-step { display: flex; gap: 28px; padding: 24px 28px; background: var(--bg2); align-items: flex-start; transition: background 0.18s; }
  .spal-next-step:hover { background: rgba(255,255,255,0.025); }
  .spal-step-num { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 400; color: var(--accent); letter-spacing: 0.1em; padding-top: 3px; flex-shrink: 0; opacity: 0.7; }
  .spal-step-title { font-family: var(--font-dm), system-ui, sans-serif; font-size: 14px; font-weight: 600; letter-spacing: -0.025em; margin-bottom: 5px; color: var(--text); }
  .spal-step-body { font-size: 13px; color: var(--muted); max-width: none; margin: 0; line-height: 1.65; }

  /* QUOTE */
  .spal-quote-block { margin: 56px 0; padding: 36px 40px; border-left: 2px solid var(--accent); background: var(--accent-dim); border-radius: 0 8px 8px 0; }
  .spal-quote-red { border-left-color: var(--red) !important; background: var(--red-dim) !important; }
  .spal-quote-p { font-family: var(--font-dm), system-ui, sans-serif; font-size: clamp(17px, 2.2vw, 24px); font-weight: 400; font-style: italic; color: var(--text); max-width: 680px; line-height: 1.5; margin: 0; }

  /* IMAGE WRAPPERS */
  .spal-img-wrap { background: var(--bg2); border: 1px solid var(--border2); border-radius: 12px; overflow: hidden; margin-top: 32px; }
  .spal-img-caption { display: flex; align-items: center; gap: 14px; padding: 16px 20px 14px; border-bottom: 1px solid var(--border); }
  .spal-timeline-img { width: 100%; display: block; border-radius: 0 0 10px 10px; }

  /* PRINCIPLE BLOCK */
  .spal-principle-block { background: var(--bg2); border: 1px solid var(--border2); border-radius: 12px; padding: 32px; margin-top: 32px; }
  .spal-principle-label { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9.5px; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); opacity: 0.8; margin-bottom: 14px; }
  .spal-principle-body { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 14px; font-weight: 300; color: rgba(240,240,236,0.78); line-height: 1.75; margin-bottom: 12px; max-width: none; }
  .spal-principle-not { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: var(--red); opacity: 0.7; margin: 16px 0 8px; }
  .spal-flow-chain { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; padding: 14px 16px; border-radius: 8px; margin-bottom: 8px; }
  .spal-flow-good { background: rgba(74,158,240,0.06); border: 1px solid var(--accent-border); }
  .spal-flow-bad  { background: rgba(224,92,92,0.06);  border: 1px solid var(--red-border); opacity: 0.7; }
  .spal-flow-item { display: flex; align-items: center; gap: 6px; }
  .spal-flow-step { font-family: var(--font-dm), system-ui, sans-serif; font-size: 13px; font-weight: 500; color: var(--text); letter-spacing: -0.02em; }
  .spal-flow-good .spal-flow-step { color: var(--accent); }
  .spal-flow-bad  .spal-flow-step { color: var(--red); }
  .spal-flow-arrow { color: var(--dim); font-size: 13px; }

  /* LAYERS */
  .spal-layers { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; }
  .spal-layer { border-radius: 10px; padding: 24px 28px; border: 1px solid transparent; }
  .spal-layer-red    { background: var(--red-dim);    border-color: var(--red-border); }
  .spal-layer-blue   { background: var(--accent-dim); border-color: var(--accent-border); }
  .spal-layer-purple { background: var(--purple-dim); border-color: var(--purple-border); }
  .spal-layer-num { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 9.5px; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .spal-layer-red    .spal-layer-num { color: var(--red); opacity: 0.8; }
  .spal-layer-blue   .spal-layer-num { color: var(--accent); opacity: 0.8; }
  .spal-layer-purple .spal-layer-num { color: var(--purple); opacity: 0.8; }
  .spal-layer-title { font-family: var(--font-dm), system-ui, sans-serif; font-size: 16px; font-weight: 600; letter-spacing: -0.03em; color: var(--text); margin-bottom: 12px; display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
  .spal-layer-dir { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 300; color: var(--muted); letter-spacing: 0.04em; }
  .spal-layer-body { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 13.5px; font-weight: 300; color: rgba(240,240,236,0.75); line-height: 1.72; margin-bottom: 12px; max-width: none; }
  .spal-layer-list { list-style: none; display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .spal-layer-list li { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 13.5px; font-weight: 300; color: rgba(240,240,236,0.75); padding-left: 14px; position: relative; line-height: 1.65; }
  .spal-layer-list li::before { content: '·'; position: absolute; left: 0; color: var(--muted); }
  .spal-layer-note { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 12px; font-weight: 300; color: var(--muted); line-height: 1.65; padding: 10px 14px; border-radius: 6px; background: rgba(255,255,255,0.04); border: 1px solid var(--border); margin-top: 8px; }
  .spal-layer-flow { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
  .spal-layer-flow-step { display: flex; align-items: flex-start; gap: 10px; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 13px; font-weight: 300; color: rgba(240,240,236,0.8); line-height: 1.6; }
  .spal-layer-flow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--purple); flex-shrink: 0; margin-top: 7px; }

  /* 6-STEP PIPELINE */
  .spal-pipeline6 { display: flex; flex-direction: column; gap: 2px; margin-top: 16px; }
  .spal-p6-item { display: flex; align-items: flex-start; gap: 18px; padding: 18px 22px; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; transition: border-color 0.18s; position: relative; }
  .spal-p6-item:hover { border-color: var(--border2); }
  .spal-p6-num { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: var(--font-dm), system-ui, sans-serif; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .spal-p6-red    { background: var(--red-dim);    color: var(--red); }
  .spal-p6-amber  { background: var(--amber-dim);  color: var(--amber); }
  .spal-p6-blue   { background: var(--accent-dim); color: var(--accent); }
  .spal-p6-green  { background: var(--green-dim);  color: var(--green); }
  .spal-p6-purple { background: var(--purple-dim); color: var(--purple); }
  .spal-p6-accent { background: var(--accent-dim); color: var(--accent); opacity: 0.7; }
  .spal-p6-content { flex: 1; }
  .spal-p6-title { font-family: var(--font-dm), system-ui, sans-serif; font-size: 14px; font-weight: 600; letter-spacing: -0.025em; color: var(--text); margin-bottom: 4px; }
  .spal-p6-body { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 12.5px; font-weight: 300; color: var(--muted); line-height: 1.6; }

  /* FOOTER */
  .spal-footer { padding: 48px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; max-width: 1200px; margin: 0 auto; }
  .spal-footer-l { font-family: var(--font-dm), system-ui, sans-serif; font-size: 13px; font-weight: 500; color: rgba(240,240,236,0.72); letter-spacing: -0.02em; }
  .spal-footer-l strong { color: var(--text); }
  .spal-footer-r { font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 300; color: rgba(240,240,236,0.52); letter-spacing: 0.1em; text-transform: uppercase; }

  /* ZOOMABLE IMAGES */
  .spal-zoomable { position: relative; cursor: zoom-in; }
  .spal-zoomable:hover .spal-zoom-hint { opacity: 1; }
  .spal-zoom-hint { position: absolute; bottom: 10px; right: 10px; display: flex; align-items: center; gap: 5px; background: rgba(0,0,0,0.65); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; padding: 5px 10px; font-family: var(--font-bricolage), system-ui, sans-serif; font-size: 10px; font-weight: 300; color: rgba(255,255,255,0.65); opacity: 0; transition: opacity 0.2s; pointer-events: none; }

  /* LIGHTBOX */
  .spal-lightbox { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.92); backdrop-filter: blur(16px); display: flex; align-items: center; justify-content: center; padding: 24px; cursor: zoom-out; }
  .spal-lightbox-img { max-width: 95vw; max-height: 90vh; object-fit: contain; border-radius: 8px; box-shadow: 0 40px 100px rgba(0,0,0,0.8); cursor: default; }
  .spal-lightbox-close { position: fixed; top: 20px; right: 24px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: var(--text); font-size: 16px; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.18s; z-index: 10000; }
  .spal-lightbox-close:hover { background: rgba(255,255,255,0.18); }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .spal-nav { padding: 0 18px; }
    .spal-page-wrap { padding: 0 18px 80px; }
    .spal-hero { padding: 72px 0 48px; }
    .spal-hero-bg { display: none; }
    .spal-h1 { font-size: clamp(32px, 9vw, 52px); margin-bottom: 32px; }
    .spal-hero-meta { gap: 20px; }
    .spal-section-inner-wrap { padding: 56px 0; }
    .spal-section-inner { padding: 56px 0; }
    .spal-h2 { font-size: clamp(22px, 7vw, 34px); }
    .spal-two-col { grid-template-columns: 1fr; gap: 32px; margin-top: 24px; }
    .spal-card-grid { grid-template-columns: 1fr; }
    .spal-priority-grid { grid-template-columns: 1fr; }
    .spal-pipeline-wrap, .spal-img-wrap { padding: 16px; }
    .spal-quote-block { padding: 20px 18px; margin: 32px 0; }
    .spal-quote-p { font-size: clamp(14px, 4vw, 18px); }
    .spal-next-step { padding: 16px 14px; gap: 14px; }
    .spal-q-form-header { padding: 20px 18px; }
    .spal-q-item { padding: 14px 18px; }
    .spal-q-submit { margin: 16px 18px 20px; }
    .spal-footer { padding: 28px 0; flex-direction: column; text-align: center; gap: 8px; }
    .spal-layers { gap: 6px; }
    .spal-layer { padding: 18px 20px; }
    .spal-pipeline6 .spal-p6-item { padding: 14px 16px; }
  }
`;