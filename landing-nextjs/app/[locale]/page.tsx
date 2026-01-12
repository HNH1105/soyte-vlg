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
    <div className="mx-auto min-h-screen flex flex-col">
      <div className=" ">
        <VendexHeaderWithUserDropdown />
      </div>
      {/* <HeroSection /> */}
      <div>
        {/* <MattersSection /> */}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-5">
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-green-600 rounded-full animate-spin"></div>
        </div>
        {/* Text */}
        <div className="text-gray-500 text-sm tracking-widest uppercase">
          Web is building
        </div>
      </div>
      {/* <div>
      <HowItWorksSection />
      </div> */}
      {/* <WhatMakesUsDifferentSection />
      <TestimonialsSection />
      <CallToActionSection />*/}
      {/* <FAQSection />  */}
      <FooterSection />
    </div>
  );
}
