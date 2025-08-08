import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary:"#377771",
        secondary:"#219ebc",
        tertiary:"#dda15e",
        myBlue: "#00b4d8",
        myBlue2: "#0077b6",
        myBrown: "#e09f3e",  
        myYellow: "#fdc500", 
      },
    },
  },
  plugins: [],
};
export default config;
