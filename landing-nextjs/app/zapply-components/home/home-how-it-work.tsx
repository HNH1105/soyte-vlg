"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface StepItem {
  icon: string;
  title: string;
  description: string;
}

export function HowItWorksSection() {
  const t = useTranslations("how-it-works"); 

  const steps: StepItem[] = [
    {
      icon: "🧠",
      title: t("step-1.title"),
      description: t("step-1.description"),
    },
    {
      icon: "🎭",
      title: t("step-2.title"),
      description: t("step-2.description"),
    },
    {
      icon: "✨",
      title: t("step-3.title"),
      description: t("step-3.description"),
    },
  ];

  return (
    <section id="how-it-works" className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-lg bg-primary-100 dark:bg-primary-900 shadow-sm">
                <span className="text-2xl font-bold text-primary-700 dark:text-primary-400">{step.icon}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="#generate-form"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
            aria-label="Start customizing now"
          >
            {t("callToAction")}
          </Link>
        </div>
      </div>
    </section>
  );
}