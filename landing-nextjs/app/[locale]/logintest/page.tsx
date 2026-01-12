"use client";

import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    window.location.href =
      "https://docs.google.com/spreadsheets/d/1KIulw7tCDEjlV8hFa3l-lmtVLGgQoo5WSzxBEEjcN9g/edit?usp=drive_link";
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      Đang chuyển hướng...
    </div>
  );
}
