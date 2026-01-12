"use client";
import { useTranslations } from "next-intl";

interface FeatureItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

export function WhatMakesUsDifferentSection() {
  const t = useTranslations("what-makes-us-different"); 

  const features: FeatureItem[] = [
    {
      icon: (
        <svg className="w-8 h-8 text-primary-700 dark:text-primary-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        </svg>
      ),
      title: t("no-templates.title"),
      description: t("no-templates.description"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-700 dark:text-primary-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      title: t("tailored-for-each-job-ad.title"),
      description: t("tailored-for-each-job-ad.description"),
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-primary-700 dark:text-primary-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
        </svg>
      ),
      title: t("choose-tone-and-persona.title"),
      description: t("choose-tone-and-persona.description"),
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-primary-700 dark:text-primary-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 2 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      title: t("ats-optimized.title"),
      description: t("ats-optimized.description"),
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-6 lg:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-700 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-lg bg-primary-100 dark:bg-primary-900 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}