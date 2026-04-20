import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],

  theme: {
    extend: {
      colors: {
        dark: "#111111",
        surface: "#171717",
        card: "#1f1f1f",

        accent: "#00A19C",
        red: {
          600: "#A01020",
          700: "#8B0E15",
        },
        fuchsia: {
          100: "#F1F1F1",
          200: "#E4E4E4",
          300: "#B5DEDD",
          400: "#57C4C1",
          500: "#00A19C",
          600: "#008985",
          700: "#006D6A",
          800: "#005251",
          900: "#163938",
        },
        purple: {
          100: "#ECECEC",
          200: "#DCDCDC",
          300: "#C6C6C6",
          400: "#00A19C",
          500: "#006763",
          600: "#005A56",
          700: "#004B48",
          800: "#003E3C",
          900: "#003130",
          950: "#151515",
        },
        orange: {
          400: "#007773",
          500: "#006763",
          600: "#00514E",
        },
        teal: "#00A19C",
        muted: "#C6C6C6",
        danger: "#EF4444", // insurance flags
        warn: "#FBBF24",   // mid-tier budget
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },

      keyframes: {
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        pulseDot: {
          "0%,100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        glow: {
          "0%,100%": { boxShadow: "0 0 5px rgba(0, 161, 156, 0)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 161, 156, 0.45)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },

      animation: {
        "slide-up": "slideUp 0.4s cubic-bezier(0.19,1,0.22,1)",
        "slide-down": "slideDown 0.3s cubic-bezier(0.19,1,0.22,1)",
        "fade-in": "fadeIn 0.3s ease",
        "pulse-dot": "pulseDot 1.2s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "glow": "glow 2s ease-in-out infinite",
        "bounce-slow": "bounce 1.5s ease-in-out infinite",
      },
    },
  },

  plugins: [],
} satisfies Config;