import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
       animation: {
        "spin-slow": "spin 6s linear infinite",
      },
      fontFamily: {
        opensanshebrew: ["Open Sans Hebrew", "sans-serif"], // Define the custom font
      },
      boxShadow: {
        "lg-light":
          "0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)",
      },
    },
  },
  plugins: [require("flowbite-typography"), flowbite.plugin()],
} satisfies Config;
