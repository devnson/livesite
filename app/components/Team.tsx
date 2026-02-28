"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Member = {
  name: string;
  role: string;
  initials?: string;
  photo?: string;
};

const studio: Member = { name: "Tanosei Studio", role: "", initials: "" };
const creative: Member = {
  name: "Creative Lead",
  role: "",
  initials: "S",
  photo: "/illustrations/sushan.png",
};
const ops: Member = { name: "Ops", role: "", initials: "OP" };

const teamMembers: Member[] = [
  { name: "Design Lead", role: "", initials: "DL", photo: "/illustrations/sakshyam.png" },
  { name: "Storyboard", role: "", initials: "SB", photo: "/illustrations/sunil.png" },
  { name: "Motion Lead", role: "", initials: "ML", photo: "/illustrations/avisek.png" },
  { name: "Motion Designer", role: "", initials: "MD", photo: "/illustrations/rohil.png" },
];

const avatarTuning: Record<string, { size?: number; pos?: [number, number] }> = {
  "Creative Lead":    { size: 200, pos: [60, 20] },
  "Design Lead":      { size: 195, pos: [58, 0] },
  "Storyboard":       { size: 110, pos: [55,  0] },
  "Motion Lead":      { size: 230, pos: [50, 0] },
  "Motion Designer":  { size: 140, pos: [18,  0] },
};

const CW = 130;
const CH = 130;

// ─── Segment math ───────────────────────────────────────────────
type Seg = { x1: number; y1: number; x2: number; y2: number; len: number };
function buildSegs(pts: [number, number][]) {
  const segs: Seg[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1][0] - pts[i][0];
    const dy = pts[i + 1][1] - pts[i][1];
    const len = Math.sqrt(dx * dx + dy * dy);
    segs.push({ x1: pts[i][0], y1: pts[i][1], x2: pts[i + 1][0], y2: pts[i + 1][1], len });
    total += len;
  }
  return { segs, total };
}
function posAt(segs: Seg[], total: number, d: number) {
  let rem = Math.min(Math.max(d, 0), total);
  for (const s of segs) {
    if (rem <= s.len + 0.001) {
      const t = s.len > 0 ? rem / s.len : 0;
      return { x: s.x1 + (s.x2 - s.x1) * t, y: s.y1 + (s.y2 - s.y1) * t };
    }
    rem -= s.len;
  }
  const l = segs[segs.length - 1];
  return { x: l.x2, y: l.y2 };
}

// ─── Animation constants ─────────────────────────────────────────
const SPEED = 150;
const SPAWN_INTERVAL = 0.38;
const FADE_IN = 22;
const FADE_OUT = 28;

let _uid = 0;
const uid = () => ++_uid;

type TrunkBlock = { id: number; dist: number; spawnedSpine: boolean };
type SpineBlock  = { id: number; dist: number; emitted: boolean[] };
type BranchBlock = { id: number; lane: number; dist: number };

// ─── Layout types ────────────────────────────────────────────────
type LayoutDesktop = {
  mode: "desktop";
  W: number; H: number;
  COL_STUDIO: number; COL_CREATIVE: number; COL_OPS: number; COL_TEAM: number;
  spineX: number;
  STUDIO_Y: number; CREATIVE_Y: number; OPS_Y: number;
  memberY: (i: number) => number;
  studioMY: number; creativeMY: number; opsMY: number;
  topMY: number; botMY: number;
  TRUNK: ReturnType<typeof buildSegs>;
  SPINE_UP: ReturnType<typeof buildSegs>;
  SPINE_DOWN: ReturnType<typeof buildSegs>;
  BRANCHES: ReturnType<typeof buildSegs>[];
};
type LayoutMobile = {
  mode: "mobile";
  W: number; H: number;
  centerX: number;
  STUDIO_Y: number; CREATIVE_Y: number; OPS_Y: number;
  studioMY: number; creativeMY: number; opsMY: number;
  gridLeftX: number; gridRightX: number;
  gridRow1Y: number; gridRow2Y: number;
  lanes: { x: number; y: number }[];
  spineX: number; spineBotY: number;
  TRUNK: ReturnType<typeof buildSegs>;
  SPINE_DOWN: ReturnType<typeof buildSegs>;
  BRANCHES: ReturnType<typeof buildSegs>[];
};
type Layout = LayoutDesktop | LayoutMobile;

// ─── Avatar rendered via SVG <image> (works everywhere) ──────────
function Avatar({ m, isHover }: { m: Member; isHover: boolean }) {
  const r  = 22;
  const cx = CW / 2;
  const cy = 40;
  const tune = avatarTuning[m.name] || {};

  // Convert percentage-based size/pos into SVG viewBox crop values.
  // size% means the image width = r*2 * (size/100), so we offset negatively.
  const imgSize = ((tune.size ?? 165) / 100) * (r * 2);
  const px = (tune.pos?.[0] ?? 50) / 100; // 0–1
  const py = (tune.pos?.[1] ?? 50) / 100;
  const imgX = Math.round(cx - r - (imgSize - r * 2) * px);
  const imgY = Math.round(cy - r - (imgSize - r * 2) * py);

  const clipId = `clip-${m.name.replace(/\s+/g, "-")}`;

  return (
    <>
      {/* Clip circle */}
      <defs>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>

      {/* Background circle */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="rgba(255,255,255,0.04)"
        stroke={isHover ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)"}
        strokeWidth="1"
      />

      {m.photo ? (
        // SVG <image> with clipPath — works on all browsers including mobile Safari
        <image
          href={m.photo}
          x={imgX}
          y={imgY}
          width={imgSize}
          height={imgSize}
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYMid slice"
        />
      ) : (
        <text
          x={cx} y={cy + 6}
          textAnchor="middle"
          fontFamily="var(--font-dm)"
          fontSize="13"
          fontWeight="800"
          fill="rgba(255,255,255,0.55)"
        >
          {m.initials || ""}
        </text>
      )}

      {/* Subtle overlay to blend edges */}
      {m.photo && <circle cx={cx} cy={cy} r={r} fill="rgba(0,0,0,0.06)" />}
    </>
  );
}

// ─── Studio logo-only card (shared between desktop + mobile) ─────
function StudioCard({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0} y={0} width={CW} height={CH} rx={22}
        fill="rgb(12,12,12)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
      />
      {/* Tanosei logo SVG, centered in card
          Logo bbox: x≈71–274 (w≈203), y≈67–335 (h≈268)
          At scale 0.14: rendered w≈28, h≈38
          Offset to center: x = CW/2 - 28/2 - 71*0.14, y = CH/2 - 38/2 - 67*0.14
      */}
      <g transform={`translate(${Math.round(CW / 2 - 14 - 71 * 0.14)}, ${Math.round(CH / 2 - 19 - 67 * 0.14)}) scale(0.14)`}>
        <path
          fillRule="evenodd" clipRule="evenodd"
          d="M71.211 258.453L71.211 163.678L71.211 87.162C71.211 74.4614 83.7004 67.488 92.7003 72.6307L152.706 107.171L152.706 265.423L130.571 269.742L130.572 276.101L152.706 271.472L162.723 269.375L274.349 246.21V335.3L152.393 334.675C101.22 334.675 71.211 290.544 71.211 258.453Z"
          fill="rgba(255,255,255,0.86)"
        />
        <path
          d="M213.42 193.732L161.703 223.687L161.821 163.659L165.881 161.265C167.856 163.644 169.986 165.935 172.271 168.125C184.107 179.473 198.472 186.554 213.462 189.409L213.42 193.732Z"
          fill="rgba(255,255,255,0.86)"
        />
      </g>
    </g>
  );
}

export default function Team() {
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const [hov, setHov]         = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const layout: Layout = useMemo(() => {
    if (!isMobile) {
      const VGAP = 22, HGAP = 90, TOP_PAD = 10;
      const TEAM_TOTAL_H = teamMembers.length * CH + (teamMembers.length - 1) * VGAP;
      const H = TEAM_TOTAL_H + TOP_PAD * 2;
      const VCENTER = H / 2;
      const COL_STUDIO   = 0;
      const COL_CREATIVE = COL_STUDIO   + CW + HGAP;
      const COL_OPS      = COL_CREATIVE + CW + HGAP;
      const COL_TEAM     = COL_OPS      + CW + HGAP;
      const spineX       = COL_OPS + CW + HGAP / 2;
      const STUDIO_Y     = VCENTER - CH / 2;
      const CREATIVE_Y   = VCENTER - CH / 2;
      const OPS_Y        = VCENTER - CH / 2;
      const memberY      = (i: number) => TOP_PAD + i * (CH + VGAP);
      const studioMY     = STUDIO_Y   + CH / 2;
      const creativeMY   = CREATIVE_Y + CH / 2;
      const opsMY        = OPS_Y      + CH / 2;
      const topMY        = memberY(0) + CH / 2;
      const botMY        = memberY(teamMembers.length - 1) + CH / 2;
      const W            = COL_TEAM + CW + 30;
      const TRUNK    = buildSegs([[COL_STUDIO + CW, studioMY],[COL_CREATIVE, creativeMY],[COL_CREATIVE + CW, creativeMY],[COL_OPS, opsMY],[COL_OPS + CW, opsMY],[spineX, opsMY]]);
      const SPINE_UP   = buildSegs([[spineX, opsMY],[spineX, topMY]]);
      const SPINE_DOWN = buildSegs([[spineX, opsMY],[spineX, botMY]]);
      const BRANCHES   = teamMembers.map((_, i) => { const y = memberY(i) + CH / 2; return buildSegs([[spineX, y],[COL_TEAM, y],[COL_TEAM + CW / 2, y]]); });
      return { mode: "desktop", W, H, COL_STUDIO, COL_CREATIVE, COL_OPS, COL_TEAM, spineX, STUDIO_Y, CREATIVE_Y, OPS_Y, memberY, studioMY, creativeMY, opsMY, topMY, botMY, TRUNK, SPINE_UP, SPINE_DOWN, BRANCHES };
    }

    // MOBILE
    const VSTEP = 96, TOP_PAD = 10;
    const STUDIO_Y   = TOP_PAD;
    const CREATIVE_Y = STUDIO_Y   + CH + VSTEP;
    const OPS_Y      = CREATIVE_Y + CH + VSTEP;
    const studioMY   = STUDIO_Y   + CH / 2;
    const creativeMY = CREATIVE_Y + CH / 2;
    const opsMY      = OPS_Y      + CH / 2;
    const GRID_GAP_X = 22, GRID_GAP_Y = 22;
    const gridTopY   = OPS_Y + CH + 84;
    const gridRow1Y  = gridTopY;
    const gridRow2Y  = gridTopY + CH + GRID_GAP_Y;
    const gridW      = CW * 2 + GRID_GAP_X;
    const W          = Math.max(gridW + 40, CW + 40);
    const centerX    = W / 2;
    const gridLeftX  = centerX - gridW / 2;
    const gridRightX = gridLeftX + CW + GRID_GAP_X;
    const lanes      = [
      { x: gridLeftX  + CW / 2, y: gridRow1Y + CH / 2 },
      { x: gridRightX + CW / 2, y: gridRow1Y + CH / 2 },
      { x: gridLeftX  + CW / 2, y: gridRow2Y + CH / 2 },
      { x: gridRightX + CW / 2, y: gridRow2Y + CH / 2 },
    ];
    const spineX   = centerX;
    const spineBotY = (lanes[0].y + lanes[2].y) / 2;
    const H        = gridRow2Y + CH + 18;
    const TRUNK      = buildSegs([[spineX, studioMY],[spineX, creativeMY],[spineX, opsMY]]);
    const SPINE_DOWN = buildSegs([[spineX, opsMY],[spineX, spineBotY]]);
    const BRANCHES   = lanes.map((p) => buildSegs([[spineX, p.y],[p.x, p.y]]));
    return { mode: "mobile", W, H, centerX, STUDIO_Y, CREATIVE_Y, OPS_Y, studioMY, creativeMY, opsMY, gridLeftX, gridRightX, gridRow1Y, gridRow2Y, lanes, spineX, spineBotY, TRUNK, SPINE_DOWN, BRANCHES };
  }, [isMobile]);

  // ─── Animation state ─────────────────────────────────────────
  const trunkBlocks  = useRef<TrunkBlock[]>([{ id: uid(), dist: 0, spawnedSpine: false }]);
  const spineBlocks  = useRef<SpineBlock[]>([]);
  const branchBlocks = useRef<BranchBlock[]>([]);
  const lastTsRef    = useRef<number | null>(null);
  const spawnTimerRef = useRef(0);
  const [, redraw]   = useState(0);

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 88%" } });
    gsap.fromTo(wrapRef.current,   { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: wrapRef.current,   start: "top 85%" } });
  }, []);

  useEffect(() => {
    trunkBlocks.current  = [{ id: uid(), dist: 0, spawnedSpine: false }];
    spineBlocks.current  = [];
    branchBlocks.current = [];
    lastTsRef.current    = null;
    spawnTimerRef.current = 0;
  }, [layout.mode]);

  useEffect(() => {
    let raf: number;
    const loop = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt   = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;
      const move = SPEED * dt;

      spawnTimerRef.current += dt;
      while (spawnTimerRef.current >= SPAWN_INTERVAL) {
        spawnTimerRef.current -= SPAWN_INTERVAL;
        trunkBlocks.current.push({ id: uid(), dist: 0, spawnedSpine: false });
      }

      trunkBlocks.current = trunkBlocks.current.reduce<TrunkBlock[]>((acc, b) => {
        const next        = b.dist + move;
        const trunkTotal  = layout.TRUNK.total;
        if (!b.spawnedSpine && next >= trunkTotal) {
          const emitted = new Array(teamMembers.length).fill(false);
          if (layout.mode === "desktop") {
            spineBlocks.current.push({ id: uid(), dist: 0, emitted: [...emitted] });
            spineBlocks.current.push({ id: uid(), dist: 0, emitted: [...emitted] });
          } else {
            spineBlocks.current.push({ id: uid(), dist: 0, emitted: [...emitted] });
          }
        }
        if (next <= trunkTotal + 30) acc.push({ ...b, dist: next, spawnedSpine: b.spawnedSpine || next >= trunkTotal });
        return acc;
      }, []);

      if (layout.mode === "desktop") {
        spineBlocks.current = spineBlocks.current.reduce<SpineBlock[]>((acc, s, idx) => {
          const isUp = idx % 2 === 0;
          const path = isUp ? layout.SPINE_UP : layout.SPINE_DOWN;
          const next = s.dist + move;
          const p    = posAt(path.segs, path.total, next);
          for (let i = 0; i < teamMembers.length; i++) {
            if (s.emitted[i]) continue;
            const laneY        = layout.memberY(i) + CH / 2;
            const isLaneAbove  = laneY <= layout.opsMY;
            const laneMatchesDir = isUp ? isLaneAbove : !isLaneAbove;
            if (!laneMatchesDir) continue;
            if (Math.abs(p.y - laneY) < 10) { s.emitted[i] = true; branchBlocks.current.push({ id: uid(), lane: i, dist: 0 }); }
          }
          if (next <= path.total + 30) acc.push({ ...s, dist: next });
          return acc;
        }, []);
      } else {
        spineBlocks.current = spineBlocks.current.reduce<SpineBlock[]>((acc, s) => {
          const path = layout.SPINE_DOWN;
          const next = s.dist + move;
          const p    = posAt(path.segs, path.total, next);
          for (let i = 0; i < teamMembers.length; i++) {
            if (s.emitted[i]) continue;
            if (Math.abs(p.y - layout.lanes[i].y) < 10) { s.emitted[i] = true; branchBlocks.current.push({ id: uid(), lane: i, dist: 0 }); }
          }
          if (next <= path.total + 30) acc.push({ ...s, dist: next });
          return acc;
        }, []);
      }

      branchBlocks.current = branchBlocks.current.reduce<BranchBlock[]>((acc, b) => {
        const br   = layout.BRANCHES[b.lane];
        const next = b.dist + move;
        if (next <= br.total + 25) acc.push({ ...b, dist: next });
        return acc;
      }, []);

      redraw((n) => n + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [layout]);

  const renderBlock = (key: string, x: number, y: number, alpha: number) => (
    <g key={key} opacity={Math.max(0, Math.min(alpha, 1))}>
      <rect x={x - 6} y={y - 6} width={12} height={12} rx={2.5} fill="rgba(140,200,255,0.08)" />
      <rect x={x - 3.5} y={y - 3.5} width={7} height={7} rx={1.6} fill="rgba(255,255,255,0.9)" />
    </g>
  );

  const blocks: React.ReactNode[] = [];
  for (const b of trunkBlocks.current) {
    const p = posAt(layout.TRUNK.segs, layout.TRUNK.total, b.dist);
    blocks.push(renderBlock(`t-${b.id}`, p.x, p.y, Math.min(b.dist / FADE_IN, 1) * Math.min((layout.TRUNK.total - b.dist) / FADE_OUT, 1)));
  }
  if (layout.mode === "desktop") {
    for (let idx = 0; idx < spineBlocks.current.length; idx++) {
      const s    = spineBlocks.current[idx];
      const isUp = idx % 2 === 0;
      const path = isUp ? layout.SPINE_UP : layout.SPINE_DOWN;
      const p    = posAt(path.segs, path.total, s.dist);
      blocks.push(renderBlock(`s-${s.id}-${idx}`, p.x, p.y, Math.min(s.dist / FADE_IN, 1) * Math.min((path.total - s.dist) / FADE_OUT, 1)));
    }
  } else {
    for (const s of spineBlocks.current) {
      const path = layout.SPINE_DOWN;
      const p    = posAt(path.segs, path.total, s.dist);
      blocks.push(renderBlock(`s-${s.id}`, p.x, p.y, Math.min(s.dist / FADE_IN, 1) * Math.min((path.total - s.dist) / FADE_OUT, 1)));
    }
  }
  for (const b of branchBlocks.current) {
    const br = layout.BRANCHES[b.lane];
    const p  = posAt(br.segs, br.total, b.dist);
    blocks.push(renderBlock(`b-${b.id}`, p.x, p.y, Math.min(b.dist / FADE_IN, 1) * Math.min((br.total - b.dist) / FADE_OUT, 1)));
  }

  const cardFill    = "rgb(12,12,12)";
  const strokeIdle  = "rgba(255,255,255,0.10)";
  const strokeHover = "rgba(255,255,255,0.22)";

  const card = (x: number, y: number, m: Member, isHover: boolean, rx = 18) => (
    <g
      key={m.name}
      transform={`translate(${x}, ${y})`}
      onMouseEnter={() => setHov(m.name)}
      onMouseLeave={() => setHov(null)}
      style={{ cursor: "default" }}
    >
      <rect x={0} y={0} width={CW} height={CH} rx={rx}
        fill={cardFill}
        stroke={isHover ? strokeHover : strokeIdle}
        strokeWidth="1"
      />
      <Avatar m={m} isHover={isHover} />
      <text x={CW / 2} y={83} textAnchor="middle" fontFamily="var(--font-dm)" fontSize="12" fontWeight="800" fill={isHover ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.50)"}>
        {m.name}
      </text>
      <text x={CW / 2} y={100} textAnchor="middle" fontFamily="var(--font-dm)" fontSize="9.5" fill="rgba(255,255,255,0.22)">
        {m.role}
      </text>
    </g>
  );

  return (
    <section id="team" style={{ padding: "120px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        <div ref={headerRef} style={{ marginBottom: "72px", opacity: 0 }}>
          <h2 style={{ fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0, color: "rgba(255,255,255,0.92)" }}>
            <span style={{ fontWeight: 300 }}>The people</span> behind the work.
          </h2>
        </div>

        <div ref={wrapRef} style={{ display: "flex", justifyContent: "center", overflowX: "auto", opacity: 0, paddingBottom: 8 }}>
          <svg
            viewBox={`0 0 ${layout.W} ${layout.H}`}
            style={{ width: "min(100%, 980px)", height: "auto", overflow: "visible", display: "block" }}
          >
            {/* WIRES */}
            {layout.mode === "desktop" ? (
              <>
                <line x1={layout.COL_STUDIO + CW} y1={layout.studioMY} x2={layout.COL_CREATIVE} y2={layout.creativeMY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
                <line x1={layout.COL_CREATIVE + CW} y1={layout.creativeMY} x2={layout.COL_OPS} y2={layout.opsMY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
                <line x1={layout.COL_OPS + CW} y1={layout.opsMY} x2={layout.spineX} y2={layout.opsMY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
                <line x1={layout.spineX} y1={layout.topMY} x2={layout.spineX} y2={layout.botMY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
                {teamMembers.map((_, i) => (
                  <line key={i} x1={layout.spineX} y1={layout.memberY(i) + CH / 2} x2={layout.COL_TEAM} y2={layout.memberY(i) + CH / 2} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
                ))}
              </>
            ) : (
              <>
                <line x1={layout.spineX} y1={layout.studioMY} x2={layout.spineX} y2={layout.creativeMY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
                <line x1={layout.spineX} y1={layout.creativeMY} x2={layout.spineX} y2={layout.opsMY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
                <line x1={layout.spineX} y1={layout.opsMY} x2={layout.spineX} y2={layout.spineBotY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
                {layout.lanes.map((p, i) => (
                  <line key={i} x1={layout.spineX} y1={p.y} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
                ))}
              </>
            )}

            {/* BLOCKS */}
            {blocks}

            {/* CARDS */}
            {layout.mode === "desktop" ? (
              <>
                {/* Studio: logo-only card on desktop */}
                <StudioCard x={layout.COL_STUDIO} y={layout.STUDIO_Y} />
                {card(layout.COL_CREATIVE, layout.CREATIVE_Y, creative, hov === creative.name, 22)}
                {card(layout.COL_OPS,      layout.OPS_Y,      ops,     hov === ops.name,     22)}
                {teamMembers.map((m, i) => card(layout.COL_TEAM, layout.memberY(i), m, hov === m.name, 18))}
              </>
            ) : (
              <>
                {/* Studio: logo-only card on mobile too */}
                <StudioCard x={layout.centerX - CW / 2} y={layout.STUDIO_Y} />
                {card(layout.centerX - CW / 2, layout.CREATIVE_Y, creative, hov === creative.name, 22)}
                {card(layout.centerX - CW / 2, layout.OPS_Y,      ops,     hov === ops.name,     22)}
                {card(layout.gridLeftX,  layout.gridRow1Y, teamMembers[0], hov === teamMembers[0].name, 18)}
                {card(layout.gridRightX, layout.gridRow1Y, teamMembers[1], hov === teamMembers[1].name, 18)}
                {card(layout.gridLeftX,  layout.gridRow2Y, teamMembers[2], hov === teamMembers[2].name, 18)}
                {card(layout.gridRightX, layout.gridRow2Y, teamMembers[3], hov === teamMembers[3].name, 18)}
              </>
            )}
          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "64px" }}>
          <a
            href="/team"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.55)", fontSize: "13px", fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-dm)", transition: "all 0.22s", letterSpacing: "0.02em" }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.22)"; el.style.color = "rgba(255,255,255,0.88)"; el.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.1)";  el.style.color = "rgba(255,255,255,0.55)"; el.style.background = "rgba(255,255,255,0.02)"; }}
          >
            Meet the full team
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}