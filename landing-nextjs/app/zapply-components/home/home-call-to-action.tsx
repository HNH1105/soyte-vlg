"use client";
import { Toast } from "flowbite-react";
import { useTranslations } from "next-intl";
import { FormEvent, useEffect, useState } from "react";
import { HiCheck, HiExclamation } from "react-icons/hi";

interface FormFields {
  name: string;
  email: string;
}

interface FormPayload {
  name: string;
  email: string;
  webKey?: string | null;
}

export function CallToActionSection() {
  const t = useTranslations("call-to-action");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const formFields: FormFields = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
      };

      const missingFields = Object.entries(formFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
      if (missingFields.length > 0) {
        throw new Error(`Missing fields: ${missingFields.join(", ")}`);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formFields.email)) {
        throw new Error(t("errorInvalidEmail"));
      }
      const webKey = localStorage.getItem("webKey");
      const payload: FormPayload = {
        ...formFields,
        webKey,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/public/web/register-signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/plain",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Signup Status: ${response.status}, Message: ${errorText}`,
        );
      }

      setToast({ type: "success", message: "Register successfully!" });
    } catch (error: any) {
      console.log("Error joining the beta: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cta" className="bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mb-6 text-gray-500 dark:text-gray-400 md:text-lg">
            {t("description")}
          </p>
          <form
            className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="flex-1 rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-700 focus:shadow-md focus:ring-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-primary-600 dark:focus:ring-primary-600"
              aria-label="Enter your name"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="flex-1 rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-700 focus:shadow-md focus:ring-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-primary-600 dark:focus:ring-primary-600"
              aria-label="Enter your email"
              required
            />
            <button
              type="submit"
              className={`cursor-pointer rounded-xl bg-primary-700 px-6 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary-800 hover:shadow-lg focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:px-8 ${
                isSubmitting ? "cursor-not-allowed opacity-75" : ""
              }`}
              disabled={isSubmitting}
            >
              {t("buttonText")}
            </button>
          </form>
          {toast && (
            <div className="fixed bottom-4 right-4 z-50">
              <Toast>
                <div
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
                    toast.type === "success"
                      ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                  }`}
                >
                  {toast.type === "success" ? (
                    <HiCheck className="h-5 w-5" />
                  ) : (
                    <HiExclamation className="h-5 w-5" />
                  )}
                </div>
                <div className="ms-3 text-sm font-normal">{toast.message}</div>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  aria-label="Close"
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </Toast>
            </div>
          )}
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {t("no-spam")}
          </p>
        </div>
      </div>
    </section>
  );
}
