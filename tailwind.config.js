// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        colors: {
    brightGreen: "#00FF84",
    accentGreen: "#10b981",
  },
  fontFamily: {
    anatson: ["Anatson ExtraExpanded", "sans-serif"],
  },
  typography: {
    invert: true,
  },
      fontFamily: {
        anatson: ["Anatson ExtraExpanded", "sans-serif"],
        moustache: ["Moustache You", "sans-serif"],
        olympic: ["Olympic", "sans-serif"],
        rouge: ["RougeVintage", "sans-serif"],
        music: ["TheMusicDemoRegular", "sans-serif"],
        unique: ["Unique Rose", "sans-serif"],
      },
      colors: {
        accentGreen: "#10b981",
        brightGreen: "#00FF84",
      },
      keyframes: {
        videoExpand: {
          "0%": { height: "100px", opacity: "0" },
          "60%": { height: "110%", opacity: "1" }, // slight overshoot
          "100%": { height: "100%", opacity: "1" },
        },
      },
      animation: {
        videoExpand: "videoExpand 1.8s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
