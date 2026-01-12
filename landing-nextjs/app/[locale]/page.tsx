"use client";
import FooterSection from "../zapply-components/footer";
import { HeroSection } from "../zapply-components/home/home-hero";
import { VendexHeaderWithUserDropdown } from "../zapply-components/menu";
import { MattersSection } from "../zapply-components/home/home-matters";
import { HowItWorksSection } from "../zapply-components/home/home-how-it-work";
import { WhatMakesUsDifferentSection } from "../zapply-components/home/home-makes-us-different";
import { CallToActionSection } from "../zapply-components/home/home-call-to-action";
import { FAQSection } from "../zapply-components/home/home-fqa";
import { TestimonialsSection } from "../zapply-components/home/home-testimonials";
export default function Home() {
  return (
    <div className="mx-auto">
      <div className=" ">
      <VendexHeaderWithUserDropdown />
      </div>
      {/* <HeroSection /> */}
      <div>
      <MattersSection />
      </div>
      <div>
      <HowItWorksSection />
      </div>
      <WhatMakesUsDifferentSection />
      <TestimonialsSection />
      <CallToActionSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
