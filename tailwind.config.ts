import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "forest-night": "#0B1410",
        canopy: "#14231B",
        "deep-forest": "#244333",
        moss: "#74866A",
        "matcha-mist": "#B8C7A3",
        "warm-cream": "#F2EEE3",
        paper: "#FCFAF5",
        ink: "#202820",
        "muted-ink": "#626B60",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
