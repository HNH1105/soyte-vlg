import { useTranslations } from "next-intl";
import Link from "next/link";

const FooterSection = () => {
  const t = useTranslations(""); 

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:py-24">
   <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              {t("footer.product.title")}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a
                  href="#"
                  className="hover:underline hover:text-primary-700 dark:hover:text-primary-400"
                  aria-label={t("footer.product.links.product")}
                >
                  {t("footer.product.links.product")}
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="hover:underline hover:text-primary-700 dark:hover:text-primary-400"
                  aria-label={t("footer.product.links.about")}
                >
                  {t("footer.product.links.about")}
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="hover:underline hover:text-primary-700 dark:hover:text-primary-400"
                  aria-label={t("footer.product.links.github")}
                >
                  {t("footer.product.links.github")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              {t("footer.legal.title")}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <Link
                  href="/privacy"
                  className="hover:underline hover:text-primary-700 dark:hover:text-primary-400"
                  aria-label={t("footer.legal.links.privacy-policy")}
                >
                  {t("footer.legal.links.privacy-policy")}
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/terms"
                  className="hover:underline hover:text-primary-700 dark:hover:text-primary-400"
                  aria-label={t("footer.legal.links.terms")}
                >
                  {t("footer.legal.links.terms")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              {t("footer.contact.title")}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a
                  href={`mailto:${t("footer.contact.email")}`}
                  className="hover:underline hover:text-primary-700 dark:hover:text-primary-400"
                  aria-label={t("footer.contact.email")}
                >
                  {t("footer.contact.email")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center lg:mt-16 sm:mt-12">
          <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
            ✨ {t("footer.tagline")}
          </span>
          <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
            {t("footer.copyright", { year: 2025 })}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;