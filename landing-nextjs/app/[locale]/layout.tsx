import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { CustomTheme } from "~/components/custom-theme";
// import { RootNavbar } from "~/components/root-navbar";
import Head from "next/head";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HNH-VLG",
  description: "",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
 
  const messages = await getMessages();
  return (
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
  );
}
