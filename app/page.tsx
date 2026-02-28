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
import { Analytics } from '@vercel/analytics/next';


export default function Home() {
  return (
    <main style={{ background: "#080808", minHeight: "100vh" }}>        <Analytics />
      <Analytics />
      <Nav />
      <Hero />
      <RecentWork />
      <Walkthroughs />
      <Thesis />
      <HowWeWork />
      <Solutions />
      <Testimonials />
      <Team />
      <FAQ />
      <LogoStrip />
      <Footer />
    </main>
  );
}