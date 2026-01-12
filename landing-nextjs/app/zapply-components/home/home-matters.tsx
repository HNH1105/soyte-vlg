"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ReasonItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

export function MattersSection() {
  const t = useTranslations("why-this-matters"); 

  const reasons: ReasonItem[] = [
    {
      icon: (
        <svg
          className="w-6 h-6 text-primary-700 dark:text-primary-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      title: t("generic-isnt-getting-you-interviews.title"),
      description: t("generic-isnt-getting-you-interviews.description"),
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-primary-700 dark:text-primary-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 19L5 5M15 9.34V6a3 3 0 0 0-6 0v6a3 3 0 0 0 2.83 3v1.18A2 2 0 0 1 9 19m6 0a2 2 0 0 0 2-2v-2.18a3 3 0 0 0-.83-2.1"
          />
        </svg>
      ),
      title: t("your-voice-lost-in-translation.title"),
      description: t("your-voice-lost-in-translation.description"),
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-primary-700 dark:text-primary-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2m4.24 1.76l1.42-1.42M21 12h-2M19.24 19.24l-1.42-1.42M12 21v-2M4.76 19.24l1.42-1.42M3 12h2M4.76 4.76l1.42 1.42M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
          />
        </svg>
      ),
      title: t("we-fix-that-automatically.title"),
      description: t("we-fix-that-automatically.description"),
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
            {t("description")}
          </p>
        </div>
        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <img
              className="w-full rounded-lg shadow-md"
              src="/images/huenguyenhoang.jpg"
              alt="Frustrated job seeker overwhelmed by generic applications"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6 md:pl-4 pl-4 pr-4">
            <div className="space-y-4">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 mt-[6px] rounded-full bg-primary-100 dark:bg-primary-900 shadow flex-shrink-0 mr-4">
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{reason.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{reason.description}</p>
                  </div>
                </div>
              ))}
              <div className="flex sm:items-start items-center w-full">
                <div className="w-full text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">👉 {t("ready-to-stand-out")}</h3>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Link
                href="#generate-form"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
                aria-label="Generate my custom application"
              >
                {t("generateLinkText")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}