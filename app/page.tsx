"use client";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Walkthroughs from "./components/Walkthroughs";
import RecentWork from "./components/RecentWork";
import Thesis from "./components/Thesis";
import Solutions from "./components/Solutions";
import HowWeWork from "./components/HowWeWork";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import FAQ from "./components/FAQ";
import LogoStrip from "./components/Logostrip";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";

const SECTION_OFFSET = 96;

export default function Home() {
  return (
    <main style={{ background: "#080808", minHeight: "100vh" }}>
      <Analytics />
      <Nav />

      <section id="top" style={{ scrollMarginTop: SECTION_OFFSET }}>
        <Hero />
      </section>

      <section id="work" style={{ scrollMarginTop: SECTION_OFFSET }}>
        <RecentWork />
        <Walkthroughs />
      </section>

      <section id="thesis" style={{ scrollMarginTop: SECTION_OFFSET }}>
        <Thesis />
      </section>

      <section id="how-we-work" style={{ scrollMarginTop: SECTION_OFFSET }}>
        <HowWeWork />
      </section>

      <section id="solutions" style={{ scrollMarginTop: SECTION_OFFSET }}>
        <Solutions />
      </section>

      <section id="testimonials" style={{ scrollMarginTop: SECTION_OFFSET }}>
        <Testimonials />
      </section>

      <section id="team" style={{ scrollMarginTop: SECTION_OFFSET }}>
        <Team />
      </section>

      <section id="faq" style={{ scrollMarginTop: SECTION_OFFSET }}>
        <FAQ />
      </section>

      <LogoStrip />
      <Footer />
    </main>
  );
}