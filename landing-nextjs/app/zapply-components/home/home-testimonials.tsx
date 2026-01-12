"use client";
import { useTranslations } from "next-intl";

interface Testimonial {
  title: string;
  text: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
    altText: string;
  };
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  const testimonials: Testimonial[] = [
    {
      title: t("testimonial-1.title"),
      text: t("testimonial-1.quote"),
      author: {
        name: t("testimonial-1.author"),
        role: t("testimonial-1.role"),
        avatarUrl: "images/bonnie-green.png",
        altText: t("testimonial-1.altText"),
      },
    },
    {
      title: t("testimonial-2.title"),
      text: t("testimonial-2.quote"),
      author: {
        name: t("testimonial-2.author"),
        role: t("testimonial-2.role"),
        avatarUrl: "images/karen-nelson.png",
        altText: t("testimonial-2.altText"),
      },
    },
    {
      title: t("testimonial-3.title"),
      text: t("testimonial-3.quote"),
      author: {
        name: t("testimonial-3.author"),
        role: t("testimonial-3.role"),
        avatarUrl: "images/jese-leos.png",
        altText: t("testimonial-3.altText"),
      },
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:px-6 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-500 lg:mb-16 dark:text-gray-400 sm:text-xl">
            {t("description")}
          </p>
        </div>
        <div className="grid gap-6 mt-8 lg:grid-cols-3 sm:mt-12 lg:mt-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="space-y-6">
              <figure className="flex flex-col h-full min-h-[200px] p-6 border-gray-100 rounded-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                <blockquote className="flex-1 text-sm text-gray-500 dark:text-gray-400">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {testimonial.title}
                  </h3>
                  <p className="my-4 line-clamp-4">{testimonial.text}</p>
                </blockquote>
                <figcaption className="flex items-center space-x-3 mt-auto">
                  <img
                    className="rounded-full w-9 h-9"
                    src={testimonial.author.avatarUrl}
                    alt={testimonial.author.altText}
                    loading="lazy"
                  />
                  <div className="space-y-0.5 font-medium dark:text-white">
                    <div>{testimonial.author.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {testimonial.author.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}