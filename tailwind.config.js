const { blackA, violet, mauve } = require("@radix-ui/colors");
import {
  gray,
  sky,
  teal,
  jade,
} from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...violet,
        ...mauve,
        ...gray,
        ...sky,
        ...teal,
        ...jade
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
