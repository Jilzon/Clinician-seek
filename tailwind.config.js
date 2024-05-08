/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: '1.25rem'
    },
    extend: {
      screens: {
        '2xl': '1280px',
      },
      colors: {
        clr: {
          btn: '#82C29B',
          title: '#018893',
          nav: '#1C3C70',
          gray1: '#828282',
          footer1: '#16747B',
          footer2: '#2B6367',
        },
        clr_title: '#018893',
        clr_nav: '#1C3C70',
        clr_gray1: '#828282',
        clr_heading: {
          700: "#018893"
        },
        content: {
          500: "#2B3D67"
        }
      },
      borderRadius: {
        btn: '1.563rem',
      },
      minHeight: {
        btn: '3rem',
      },
      fontSize: {
        '88px': ['5.5rem', '105%'],
        '44px': ['4.125rem', '105%'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'home-bg': "url('/images/top-bg.svg')",
      }
    }
  },
  plugins: []
};
