"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import TrafficStrip from "./TrafficStrip";
import BenefitsSection from "./BenefitsSection";
import PlansSection from "./PlansSection";
import CompletePackage from "./CompletePackage";
import PaymentsSection from "./PaymentsSection";
import AudienceSection from "./AudienceSection";
import HowItWorks from "./HowItWorks";
import AboutSection from "./AboutSection";
import LocationSection from "./LocationSection";
import FAQSection from "./FAQSection";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import SideNavigation from "./SideNavigation";
import BackToTop from "./BackToTop";
import HelpBubble from "./HelpBubble";
import WhatsAppFloat, { MobileBar } from "./WhatsAppFloat";
import CookieConsent from "./CookieConsent";
import LegalModal from "./LegalModal";
import { routeItems } from "../data/content";
import { individualPlans, type Plan } from "../data/plans";

type Category = "individual" | "combo";
type Vehicle = "carro" | "moto";

export default function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState<Category>("individual");
  const [vehicle, setVehicle] = useState<Vehicle>("carro");
  const [selected, setSelected] = useState<Plan>(individualPlans[2]);
  const [activeSection, setActiveSection] = useState("inicio");
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 20);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        const marker = window.scrollY + window.innerHeight * .38;
        const current = routeItems.reduce((active, item) => {
          const section = document.getElementById(item.id);
          return section && section.offsetTop <= marker ? item.id : active;
        }, "inicio");
        setActiveSection(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!revealItems.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: .16, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [category, vehicle]);

  return (
    <>
      <Navbar menu={menu} setMenu={setMenu} scrolled={scrolled} activeSection={activeSection} />

      <main>
        <Hero />
        <TrafficStrip />
        <BenefitsSection />
        <PlansSection
          category={category}
          setCategory={setCategory}
          vehicle={vehicle}
          setVehicle={setVehicle}
          selected={selected}
          setSelected={setSelected}
        />
        <CompletePackage />
        <PaymentsSection />
        <AudienceSection />
        <HowItWorks />
        <AboutSection />
        <LocationSection />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer onLegal={setLegal} />

      <SideNavigation progress={progress} activeSection={activeSection} />
      <BackToTop />
      <HelpBubble />
      <WhatsAppFloat />
      <MobileBar />
      <CookieConsent />
      <LegalModal legal={legal} setLegal={setLegal} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DrivingSchool",
            name: "Autoescola Mais que Vencedor",
            telephone: "+55 21 97289-3743",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Av. Olímpia Silva, 181",
              addressLocality: "Queimados",
              addressRegion: "RJ",
              addressCountry: "BR",
            },
            areaServed: "Queimados, RJ",
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
