module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E8F4F9",
          200: "#AFD3E2",
          300: "#8CBBCF",
          400: "#19A7CE",
          500: "#158BA9",
          600: "#146C94",
          700: "#10526E",
          800: "#0B3949",
        },
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "30px",
        "3xl": "36px",
        "4xl": "48px",
      },
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [],
};
