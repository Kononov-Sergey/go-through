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
        appear: "zoomIn 0.4s ease-in-out",
      },
      keyframes: {
        zoomIn: {
          "0%": { scale: "0" },
          "70%": { scale: "1.2" },
          "100%": { scale: "1" },
        },
      },
      fontFamily: {
        "space-mono": ["Space Mono", "monospace"],
        "noto-sans": ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
