"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href =
        "https://script.google.com/macros/s/AKfycbzVtFoR5XvFBXp8kvtyYiyFlLFUzgb-eX4pdHW40JPGyS3KKvozIfbL8Yz9oJIbXav4yw/exec";
    }, 2000); // 2 giây
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          {/* Vòng nền */}
          <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
          {/* Vòng quay */}
          <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-sm uppercase tracking-wider">
          Redirecting...
        </div>
      </div>
    </div>
  );
}
