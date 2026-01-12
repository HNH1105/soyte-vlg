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
            Sở Y tế Vĩnh Long
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

   
        </div>
      </Navbar>
    </header>
  );
}
