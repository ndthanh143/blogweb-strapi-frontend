/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    typography: (theme) => ({}),
    extend: {
      backgroundColor: {
        'dark-mode': '#181a2a',
        'toggle-light': '#e8e8ea',
        'toggle-dark': '#F9BE39',
        'search-light': '#f4f4f5',
        'search-dark': '#242535',
        'label-light': '#fcf6e4',
        'label-dark': '#1b1e35',
        'input-dark': '#181a2a',
        'footer-color': '#f6f6f7',
        'footer-color-dark': '#141624',
        'social-media': '#696A75',
        'color-primary': '#F9BE39',
        'color-primary-hover': '#ffdc39',
        'color-primary-active': '#795c1b',
      },
      textColor: {
        'color-bold': '#181A2A',
        'color-bold-dark': '#fff',
        'color-medium': '#3B3C4A',
        'color-medium-dark': '#BABABF',
        'color-thin': '#696A75',
        'color-thin-dark': '#97989F',
        'color-blur': '#97989F',
        'color-primary': '#F9BE39',
      },
      borderColor: {
        'light-mode': '#E8E8EA',
        'dark-mode': '#242535',
      },
      keyframes: {},
      animation: {
        'spin-fast': 'spin .5s linear infinite',
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    backgroundImage: {
      vi: "url('/vi.png')",
      eng: "url('/eng.png')",
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
