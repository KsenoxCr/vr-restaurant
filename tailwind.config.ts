import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
      },
    },
    colors: {
      white: colors.white,
      "off-white": colors.neutral[300],
      slate: colors.neutral[400],
      "light-gray": colors.neutral[600],
      gray: colors.neutral[700],
      "dark-gray": colors.neutral[800],
      dark: colors.neutral[900],
      "off-black": colors.neutral[950],
      "light-accent": colors.green[500],
      accent: colors.green[600],
      "dark-accent": colors.green[700],
      danger: colors.red[600],
      "danger-dark": colors.red[700],
    },
  },
  plugins: [],
} satisfies Config;
