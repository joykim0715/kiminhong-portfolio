import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F8F6",
        surface: "#E7ECEF",
        text: "#24323A",
        muted: "#6B8390",
        primary: "#5FA8A3",
        secondary: "#6FAED9",
        dark: "#1C2B30",
        "dark-surf": "#243238",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
};

export default config;
