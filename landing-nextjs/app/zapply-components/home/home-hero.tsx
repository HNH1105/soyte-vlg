"use client";
import { Toast, Tooltip } from "flowbite-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiCheck, HiExclamation } from "react-icons/hi";

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  jobDesc: string;
  tone: string;
  persona: string;
  language: string;
}

interface FormPayload {
  firstName: string;
  lastName: string;
  email: string;
  jobDesc: string;
  persona: string;
  tone: string;
  language: string;
  webKey: string;
  cvFileId: string;
}

interface UploadCvResponse {
  id: string;
}

interface GenerateResponse {
  result: string;
}

// Type-safe UUID generator
const generateUUIDv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("hero");

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [cvFileId, setCvFileId] = useState<string | null>(null);
  const [webKey, setWebKey] = useState<string>("");
  const [cvFileName, setCvFileName] = useState(t("cvFileNamePlaceholder"));
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const cvUploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedWebKey = localStorage.getItem("webKey") ?? generateUUIDv4();
    localStorage.setItem("webKey", storedWebKey);
    setWebKey(storedWebKey);
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleCvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploading || !event.target.files?.[0]) return;
    // if (localStorage.getItem("generateCv") == "true") {
    //   setToast({
    //     type: "error",
    //     message:
    //       "Your account with your email already exists. Please log in to access your applications.",
    //   });
    //   return;
    // }

    const file = event.target.files[0];
    setIsUploading(true);
    setCvFileName(file.name);

    const formData = new FormData();
    formData.append("input", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/public/web/upload-cv`,
        {
          method: "POST",
          headers: {
            Accept: "text/plain",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: formData,
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `${t("errorUploadCv")} Status: ${response.status}, Message: ${errorText}`,
        );
      }

      const result: UploadCvResponse = await response.json();
      setCvFileId(result.id);
      setToast({ type: "success", message: t("toastSuccessCvUploaded") });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : t("errorUnknown");
      setToast({ type: "error", message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(webKey);
    if (isSubmitting) return;
    // if (localStorage.getItem("generateCv") == "true") {
    //   setToast({
    //     type: "error",
    //     message:
    //       "Your account with your email already exists. Please log in to access your applications.",
    //   });
    //   return;
    // }

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const formFields: FormFields = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        jobDesc: formData.get("jobDesc") as string,
        tone: formData.get("tone") as string,
        persona: formData.get("persona") as string,
        language: formData.get("language") as string,
      };

      const missingFields = Object.entries(formFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
      if (missingFields.length > 0) {
        throw new Error(
          t("errorMissingFields", { fields: missingFields.join(", ") }),
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formFields.email)) {
        throw new Error(t("errorInvalidEmail"));
      }

      if (!cvFileId) {
        throw new Error(t("errorNoCvUploaded"));
      }

      const payload: FormPayload = {
        ...formFields,
        webKey,
        cvFileId,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/public/web/generate`,
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
      console.log(response);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `${t("errorGenerateApi")} Status: ${response.status}, Message: ${errorText}`,
        );
      }

      const data: GenerateResponse = await response.json();
      console.log(data);
      if (data.result == "existed") {
        setToast({
          type: "error",
          message:
            "Your account with your email already exists. Please log in to access your applications.",
        });
      } else {
        localStorage.setItem("generateCv", "true");
        setToast({
          type: "success",
          message: t("toastSuccessApplicationGenerated"),
        });
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : t("errorUnknown");
      setToast({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    cvUploadRef.current?.click();
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12">
        <div className="text-center">
          <h1
            className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <p className="mx-auto mt-4 max-w-screen-xl text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl">
            {t("description")}
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <Link
            href="#generate-form"
            className="inline-flex w-auto cursor-pointer items-center justify-center rounded-xl bg-primary-700 px-5 py-2 text-center text-base font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary-800 hover:shadow-lg focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            aria-label={t("generateButton")}
          >
            {t("generateButton")}
          </Link>
        </div>
        <p className="mt-4 text-center text-sm">
          <Link
            href="#generate-form"
            className="text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-500"
          >
            {t("noSignupLink")}
          </Link>
        </p>
        <div
          id="generate-form"
          className="mx-auto mt-8 max-w-3xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 sm:mt-12 lg:mt-16"
        >
          <form
            id="application-form"
            className="flex flex-col gap-4"
     
          >
            <input
              type="hidden"
              name="__RequestVerificationToken"
              value="CfDJ8HYKHK8JfbJLjeo7kc4I_8b924uDKidcE-ZkBtd6Bn_GXJXcJsWOyUGh8OVaX8zA60fLMGEofSkshS8CTsuPOqvvyqW0nl79L0W_v3NRBKm1RbAHs_tPLCRMm5VLUBdzZ80VKggOCn-gdgBhvOtzyF61me95UpHL_3S9TSVzns_ctAo9GIfk39TrT2NL62Zx0w"
            />
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="w-full sm:w-1/3">
                <label
                  htmlFor="firstname-input"
                  className="text-gray-900 dark:text-gray-200"
                >
                  {t("firstNameLabel")}
                </label>
                <input
                  type="text"
                  id="firstname-input"
                  name="firstName"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-700 focus:shadow-md focus:ring-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-primary-600 dark:focus:ring-primary-600"
                  placeholder={t("firstNamePlaceholder")}
                  aria-label={t("firstNamePlaceholder")}
                  required
                />
              </div>
              <div className="w-full sm:w-1/3">
                <label
                  htmlFor="lastname-input"
                  className="text-gray-900 dark:text-gray-200"
                >
                  {t("lastNameLabel")}
                </label>
                <input
                  type="text"
                  id="lastname-input"
                  name="lastName"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-700 focus:shadow-md focus:ring-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-primary-600 dark:focus:ring-primary-600"
                  placeholder={t("lastNamePlaceholder")}
                  aria-label={t("lastNamePlaceholder")}
                  required
                />
              </div>
              <div className="w-full sm:w-1/3">
                <label
                  htmlFor="email-input"
                  className="text-gray-900 dark:text-gray-200"
                >
                  {t("emailLabel")}
                </label>
                <input
                  type="email"
                  id="email-input"
                  name="email"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-700 focus:shadow-md focus:ring-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-primary-600 dark:focus:ring-primary-600"
                  placeholder={t("emailPlaceholder")}
                  aria-label={t("emailPlaceholder")}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="job-description"
                className="text-gray-900 dark:text-gray-200"
              >
                {t("jobDescriptionLabel")}
              </label>
              <textarea
                id="job-description"
                name="jobDesc"
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-700 focus:shadow-md focus:ring-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-primary-600 dark:focus:ring-primary-600"
                placeholder={t("jobDescriptionPlaceholder")}
                rows={4}
                aria-label={t("jobDescriptionPlaceholder")}
                required
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="cv-upload"
                className="text-gray-900 dark:text-gray-200"
              >
                {t("uploadCvLabel")}
              </label>
              <input
                type="file"
                id="cv-upload"
                className="hidden"
                aria-label={t("uploadCvButton")}
                accept=".pdf,.doc,.docx"
                onChange={handleCvUpload}
                ref={cvUploadRef}
              />
              <div className="flex w-full items-center rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all duration-200 focus:shadow-md dark:border-gray-600 dark:bg-gray-700">
                <span
                  id="cv-file-name"
                  className="flex-1 truncate text-gray-900 dark:text-gray-200"
                >
                  {cvFileName}
                </span>
                <button
                  type="button"
                  id="cv-upload-button"
                  onClick={triggerFileInput}
                  disabled={isUploading}
                  className={`ml-4 rounded-xl bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700 shadow-md transition-all duration-300 ease-in-out hover:bg-primary-200 hover:shadow-lg dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800 ${
                    isUploading ? "cursor-not-allowed opacity-75" : ""
                  }`}
                >
                  {isUploading ? (
                    <div role="status" className="inline-flex items-center">
                      <svg
                        aria-hidden="true"
                        className="mr-2 h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="font-semibold">
                        {t("uploadingText")}
                      </span>
                    </div>
                  ) : (
                    t("uploadCvButton")
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="w-full sm:w-1/3">
                <label
                  htmlFor="tone-input"
                  className="flex items-center text-gray-900 dark:text-gray-200"
                >
                  {t("toneLabel")}
                  <Tooltip
                    content={t("toneTooltip")}
                    placement="top"
                    className="max-w-xs whitespace-normal break-words"
                  >
                    <span className="ml-1 cursor-pointer text-gray-500 dark:text-gray-400">
                      ⓘ
                    </span>
                  </Tooltip>
                </label>
                <input
                  type="text"
                  id="tone-input"
                  name="tone"
                  defaultValue="professional"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-700 focus:shadow-md focus:ring-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-primary-600 dark:focus:ring-primary-600"
                  placeholder={t("tonePlaceholder")}
                  aria-label={t("tonePlaceholder")}
                  required
                />
              </div>
              <div className="w-full sm:w-1/3">
                <label
                  htmlFor="persona-input"
                  className="flex items-center text-gray-900 dark:text-gray-200"
                >
                  {t("personaLabel")}
                  <Tooltip
                    content={t("personaTooltip")}
                    placement="top"
                    className="max-w-xs whitespace-normal break-words"
                  >
                    <span className="ml-1 cursor-pointer text-gray-500 dark:text-gray-400">
                      ⓘ
                    </span>
                  </Tooltip>
                </label>
                <input
                  type="text"
                  id="persona-input"
                  name="persona"
                  defaultValue="startup builder"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-700 focus:shadow-md focus:ring-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-primary-600 dark:focus:ring-primary-600"
                  placeholder={t("personaPlaceholder")}
                  aria-label={t("personaPlaceholder")}
                  required
                />
              </div>
              <div className="w-full sm:w-1/3">
                <label
                  htmlFor="language-input"
                  className="text-gray-900 dark:text-gray-200"
                >
                  {t("languageLabel")}
                </label>
                <input
                  type="text"
                  id="language-input"
                  name="language"
                  defaultValue="english"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-700 focus:shadow-md focus:ring-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-primary-600 dark:focus:ring-primary-600"
                  placeholder={t("languagePlaceholder")}
                  aria-label={t("languagePlaceholder")}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              id="submit-button"
              disabled={isSubmitting}
              className={`mx-auto mt-2 inline-flex w-[250px] items-center justify-center rounded-xl bg-primary-700 px-6 py-2 text-base font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary-800 hover:shadow-lg focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                isSubmitting ? "cursor-not-allowed opacity-75" : ""
              }`}
              aria-label={t("generateApplicationButton")}
            >
              {isSubmitting ? (
                <div role="status" className="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 animate-spin fill-white text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="font-semibold">
                    {t("generateApplicationButton")}
                  </span>
                </div>
              ) : (
                t("generateApplicationButton")
              )}
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
        </div>
      </div>
    </section>
  );
}
