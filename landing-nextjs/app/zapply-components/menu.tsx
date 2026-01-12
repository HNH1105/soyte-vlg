'use client';

import { useState, useEffect } from "react";
import { Navbar } from "flowbite-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function VendexHeaderWithUserDropdown() {
  const t = useTranslations("");
  const router = useRouter();
  const locale = useLocale();
  // const supabase = createClientComponentClient();

  const [user, setUser] = useState<any>(null);

  // Lấy user hiện tại
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { data } = await supabase.auth.getUser();
  //     setUser(data.user);
  //   };
  //   fetchUser();

  //   const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session?.user || null);
  //   });

  //   return () => listener.subscription.unsubscribe();
  // }, [supabase.auth]);

  const changeLocale = () => {
    const newLocale = locale === "en" ? "de" : "en";
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/en|^\/de/, `/${newLocale}`);
    router.replace(newPath);
  };

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  //   setUser(null);
  //   router.push("/en/auth/sign-in"); 
  // };

  return (
    <header className="dark:bg-gray-900">
      <Navbar fluid className="dark:bg-gray-900 lg:mx-auto lg:max-w-screen-xl lg:pt-5">
        <Navbar.Brand href="/">
          <img src="/images/logo.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            HNH
          </span>
        </Navbar.Brand>

        {/* <Navbar.Brand href="/en/share">
          <div className="flex gap-3">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Drive Share
            </span>
          </div>
        </Navbar.Brand> */}

        <div className="flex items-center gap-1 lg:order-2 lg:gap-3">
          {/* nút đổi ngôn ngữ */}
          <div className="mr-2 cursor-pointer" onClick={changeLocale}>
            {locale === "en" ? (
              <img src="/icon/DE-Flag-icon.png" className="-mt-px h-7 w-7" alt="German Flag" />
            ) : (
              <img src="/icon/EN-Flag-icon.png" className="-mt-px h-7 w-7" alt="English Flag" />
            )}
          </div>

          {/* Nếu user đã login */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* <span className="">{user.email}</span> */}
              <button
             
                className="rounded-xl bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
              >
                Sign out
              </button>
            </div>
          ) : (
            // Nếu chưa login
            <a
              href="/en/auth/sign-in"
              className="mr-2 inline-flex items-center rounded-xl bg-primary-700 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:mr-0 lg:px-5 lg:py-2.5"
            >
              Sign In
            </a>
          )}
        </div>
      </Navbar>
    </header>
  );
}
