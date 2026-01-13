"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 1800000); // 30 phút
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        background: "black",
      }}
    >
      <iframe
        src="https://docs.google.com/presentation/d/e/2PACX-1vStKyJnYlafoiIY1hbj4mdm0_DpHygpqBb8E2f2aeo9-DTyN4Jw4WwMu0IQGoeKz5EkgAkIsVq0eTNk/embed?start=true&loop=true&delayms=10000&slide=id.SLIDES_API2002261112_0"
        allowFullScreen
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
}
