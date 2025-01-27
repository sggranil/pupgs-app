import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#800",
        bgSecondary: "#ffc627",
        bgWhite: "#ffffff",
        bgBlack: "#000000",
        textPrimary: "#800",
        textSecondary: "#ffc627",
        textWhite: "#ffffff",
        textBlack: "#000000",
      },
    },
  },
  plugins: [],
} satisfies Config;
