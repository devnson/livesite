"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Logo = {
  name: string;
  src: string;
  w: number;
  url: string;
};

const logos: Logo[] = [
  { name: "Composio",    src: "/logos/white/Composio.svg",    w: 90,  url: "https://www.linkedin.com/company/composiohq/" },
  { name: "DocUnlock",   src: "/logos/white/docunlock.svg",   w: 80,  url: "https://www.linkedin.com/company/docunlock-ai" },
  { name: "Niural",      src: "/logos/white/niural.svg",      w: 90,  url: "https://www.linkedin.com/company/niural/" },
  { name: "reAlpha",     src: "/logos/white/realpha.svg",     w: 80,  url: "https://www.linkedin.com/company/realpha-homes/" },
  { name: "SecurityPal", src: "/logos/white/SecurityPal.svg", w: 110, url: "https://www.linkedin.com/company/securitypalhq/" },
  { name: "Thera",       src: "/logos/white/thera.svg",       w: 72,  url: "https://www.linkedin.com/company/getthera/" },
  { name: "Aleph",       src: "/logos/white/aleph.svg",       w: 70,  url: "https://www.linkedin.com/company/getaleph/" },
];

function Strip({ ariaHidden, isMobile }: { ariaHidden?: boolean; isMobile: boolean }) {
  return (
    <div className="logoStrip" aria-hidden={ariaHidden ? "true" : undefined}>
      {logos.map((logo) => (
        <a
          key={logo.name}
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit ${logo.name}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
            background: "none",
            border: "none",
            borderRadius: 0,
            padding: 0,
            margin: isMobile ? "0 20px" : "0 28px",
            flexShrink: 0,
          }}
        >
          <div
            className="logoBox"
            style={{
              width: `${Math.round(logo.w * (isMobile ? 1.1 : 1.35))}px`,
              height: "28px",
            }}
          >
            <Image src={logo.src} alt={logo.name} fill className="logoImg" sizes="200px" />
          </div>
        </a>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section className="logoMarquee">
      <div className="logoContainer">
        <div className="logoKicker">TRUSTED BY TEAMS AT</div>
        <div className="logoRow">
          <div className="logoMarqueeInner">
            <Strip isMobile={isMobile} />
            <Strip ariaHidden isMobile={isMobile} />
          </div>
        </div>
      </div>
    </section>
  );
}