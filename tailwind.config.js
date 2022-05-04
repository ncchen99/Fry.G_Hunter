module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "google-map": "23.813rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
