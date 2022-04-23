module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  darkMode: "class",
  variants: {
    backgroundColor: ["dark"],
    borderColor: ["dark"],
    textColor: ["dark"],
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
