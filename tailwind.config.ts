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
        appear: "zoomIn 0.8s cubic-bezier(0.01, 1, 0.22, 1)",
      },
      keyframes: {
        zoomIn: {
          "0%": { scale: "0" },
          "100%": { scale: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
