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
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        "bg-lightblue": "#E4EFF6", 
        "bg-darkblue": "#65BFFF",
        "darkblue": "#003554",
        "darkblue2": "#003554",
        "light-yellow": "#FDFFD1",
        "hl-orange": "#FDBA3F",
      },
    },
  },
  plugins: [],
} satisfies Config;
