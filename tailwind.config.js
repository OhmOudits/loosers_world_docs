/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#374151",
            h1: {
              color: "#111827",
            },
            h2: {
              color: "#111827",
            },
            h3: {
              color: "#111827",
            },
            strong: {
              color: "#111827",
            },
            code: {
              color: "#111827",
              backgroundColor: "#f3f4f6",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
              "&::before": {
                content: '""',
              },
              "&::after": {
                content: '""',
              },
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "#f8fafc",
              color: "#374151",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              margin: "1.5rem 0",
              border: "1px solid #e5e7eb",
            },
            "pre code": {
              backgroundColor: "transparent",
              borderWidth: "0",
              borderRadius: "0",
              padding: "0",
              color: "#374151",
              fontSize: "0.875rem",
              lineHeight: "1.7142857",
            },
          },
        },
        invert: {
          css: {
            color: "#d1d5db",
            h1: {
              color: "#fff",
            },
            h2: {
              color: "#fff",
            },
            h3: {
              color: "#fff",
            },
            strong: {
              color: "#fff",
            },
            code: {
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
            pre: {
              backgroundColor: "#111827",
              color: "#d1d5db",
              margin: "1.5rem 0",
              border: "1px solid #374151",
            },
            "pre code": {
              backgroundColor: "transparent",
              color: "#d1d5db",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
