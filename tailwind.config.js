module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
          colors: {
              primary: {
                  lightest: '#E8F4F9',
                  lighter: '#AFD3E2',
                  light: '#8CBBCF',
                  default: '#19A7CE',
                  medium: '#158BA9',
                  dark: '#146C94',
                  darker: '#10526E',
                  darkest: '#0B3949',
              },
          },
          spacing: {
              '1': '8px',
              '2': '12px',
              '3': '16px',
              '4': '24px',
              '5': '32px',
              '6': '48px',
          },
          fontSize: {
              'xs': '12px',
              'sm': '14px',
              'base': '16px',
              'lg': '20px',
              'xl': '24px',
              '2xl': '30px',
              '3xl': '36px',
              '4xl': '48px',
          },
          fontFamily: {
              'openSans': ['Open Sans', 'sans-serif'],
          }
      },
  },
  variants: {},
  plugins: [],
};
