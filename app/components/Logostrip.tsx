"use client";

import Image from "next/image";

type Logo = {
  name: string;
  src: string;
  w: number;
  url: string;
};

const logos: Logo[] = [
  {
    name: "Composio",
    src: "/logos/white/Composio.svg",
    w: 150,
    url: "https://www.linkedin.com/company/composiohq/",
  },
  {
    name: "DocUnlock",
    src: "/logos/white/docunlock.svg",
    w: 120,
    url: "https://www.linkedin.com/company/docunlock-ai",
  },
  {
    name: "Niural",
    src: "/logos/white/niural.svg",
    w: 160,
    url: "https://www.linkedin.com/company/niural/",
  },
  {
    name: "reAlpha",
    src: "/logos/white/realpha.svg",
    w: 135,
    url: "https://www.linkedin.com/company/realpha-homes/",
  },
  {
    name: "SecurityPal",
    src: "/logos/white/SecurityPal.svg",
    w: 185,
    url: "https://www.linkedin.com/company/securitypalhq/",
  },
  {
    name: "Thera",
    src: "/logos/white/thera.svg",
    w: 120,
    url: "https://www.linkedin.com/company/getthera/",
  },
  {
    name: "Aleph",
    src: "/logos/white/aleph.svg",
    w: 115,
    url: "https://www.linkedin.com/company/getaleph/",
  },
];

function Strip({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="logoStrip" aria-hidden={ariaHidden ? "true" : undefined}>
      {logos.map((logo) => (
        <a
          key={logo.name}
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="logoItem"
          title={`Visit ${logo.name}`}
        >
          <div className="logoBox" style={{ width: `${logo.w}px` }}>
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              className="logoImg"
              sizes="200px"
            />
          </div>
        </a>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="logoMarquee">
      <div className="logoContainer">
        <div className="logoKicker">TRUSTED BY TEAMS AT</div>

        <div className="logoRow">
          <div className="logoMarqueeInner">
            <Strip />
            <Strip ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}