import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1c1f24",
        paper: "#f7f7f5",
        line: "#e6e4de",
        accent: "#2f6f4f",
        warn: "#b45309",
      },
    },
  },
  plugins: [],
};
export default config;
