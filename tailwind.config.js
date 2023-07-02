const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'light-mode': '#ffffff',
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
        primary: '#F9BE39',
      },
      keyframes: {},
      animation: {
        'spin-fast': 'spin .5s linear infinite',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '3rem',
        lg: '2rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme('fontSize.4xl'),
          fontWeight: theme('fontWeight.extrabold'),
          opacity: theme('opacity-100'),
          textColor: theme('textColor.color-bold'),
        },
        h2: {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.bold'),
          textColor: theme('textColor.color-bold'),
          textColor: theme('textColor.color-bold'),
          opacity: theme('opacity-90'),
        },
        h3: {
          fontSize: theme('fontSize.2xl'),
          fontWeight: theme('fontWeight.semibold'),
          textColor: theme('textColor.color-bold'),
          opacity: theme('opacity-90'),
        },
        h4: { fontSize: theme('fontSize.xl'), fontWeight: theme('fontWeight.medium'), opacity: theme('opacity-90') },
        h5: { fontSize: theme('fontSize.lg'), fontWeight: theme('fontWeight.normal'), opacity: theme('opacity-90') },
      });
    }),
  ],
};
