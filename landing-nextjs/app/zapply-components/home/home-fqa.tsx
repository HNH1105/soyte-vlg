"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export function FAQSection() {
  const t = useTranslations("faq"); 
  const [openId, setOpenId] = useState<string | null>("accordion-faq-body-1");

  const faqs: FAQItem[] = [
    { id: "1", question: t("is-it-free"), answer: t("is-it-free-asw") },
    { id: "2", question: t("do-i-need-an-account"), answer: t("do-i-need-an-account-asw") },
    { id: "3", question: t("is-my-data-safe"), answer: t("is-my-data-safe-asw") },
    { id: "4", question: t("how-does-the-ai-customize-my-cv"), answer: t("how-does-the-ai-customize-my-cv-asw") },
  ];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-500 lg:mb-16 dark:text-gray-400 sm:text-xl">
            {t("description")}
          </p>
        </div>
        <div id="accordion-faq" data-accordion="collapse">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <h3 id={`accordion-faq-heading-${faq.id}`}>
                <button
                  type="button"
                  className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-900 bg-white border border-gray-200 ${
                    faq.id === "1" ? "rounded-t-lg" : ""
                  } ${faq.id === "4" && openId !== `accordion-faq-body-${faq.id}` ? "rounded-b-lg" : ""} dark:bg-gray-700 dark:text-white dark:border-gray-600 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-lg transition-all duration-300 ease-in-out`}
                  onClick={() => toggleAccordion(`accordion-faq-body-${faq.id}`)}
                  aria-expanded={openId === `accordion-faq-body-${faq.id}`}
                  aria-controls={`accordion-faq-body-${faq.id}`}
                >
                  <span>{faq.question}</span>
                  <svg
                    data-accordion-icon
                    className={`w-6 h-6 shrink-0 ${openId === `accordion-faq-body-${faq.id}` ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </h3>
              <div
                id={`accordion-faq-body-${faq.id}`}
                className={openId === `accordion-faq-body-${faq.id}` ? "" : "hidden"}
                aria-labelledby={`accordion-faq-heading-${faq.id}`}
              >
                <div
                  className={`p-5 bg-white border border-t-0 border-gray-200 dark:bg-gray-700 dark:border-gray-600 shadow-sm ${
                    faq.id === "4" && openId === `accordion-faq-body-${faq.id}` ? "rounded-b-lg" : ""
                  } hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-md transition-all duration-300 ease-in-out`}
                >
                  <p className="text-gray-500 dark:text-gray-400">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:scale-105"
            aria-label="Contact us for more questions"
          >
            {t("contact-text")}
          </Link>
        </div>
      </div>
    </section>
  );
}