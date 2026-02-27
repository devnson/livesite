"use client";

export default function ComingSoon() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#080810",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-bricolage), system-ui, sans-serif",
      color: "#fff",
      textAlign: "center",
      padding: "24px",
    }}>

      {/* Logo */}
      <div style={{ marginBottom: "48px" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
          Tanosei Studio
        </span>
      </div>

      {/* Heading */}
      <h1 style={{
        fontSize: "clamp(36px, 7vw, 80px)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.0,
        margin: "0 0 20px",
      }}>
        Something is<br />
        <span style={{ color: "rgba(255,255,255,0.3)" }}>coming soon.</span>
      </h1>

      {/* Subtext */}
      <p style={{
        fontSize: "16px",
        color: "rgba(255,255,255,0.45)",
        lineHeight: 1.7,
        maxWidth: "420px",
        margin: "0 0 48px",
      }}>
        We're putting the finishing touches on the new Tanosei Studio website. In the meantime, you can reach us directly.
      </p>

      {/* CTA */}
      <a
        href="https://cal.com/tanoseihito/30min"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 28px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.8)",
          fontSize: "14px",
          fontWeight: 600,
          textDecoration: "none",
          letterSpacing: "0.01em",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          e.currentTarget.style.color = "rgba(255,255,255,0.8)";
        }}
      >
        Book a call
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* Bottom */}
      <p style={{ position: "absolute", bottom: "32px", fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
        © {new Date().getFullYear()} Tanosei Studio
      </p>

    </div>
  );
}