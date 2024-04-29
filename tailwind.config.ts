import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        appear: "zoomIn 0.4s ease-out",
      },
      keyframes: {
        zoomIn: {
          "0%": { scale: "0" },
          "70%": { scale: "1.2" },
          "100%": { scale: "1" },
        },
      },
    },
  },
  plugins: [
    require("tailwind-safelist-generator")({
      patterns: ["delay-{gap}"],
    }),
  ],
};
export default config;
