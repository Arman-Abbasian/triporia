import {heroui} from '@heroui/theme';
/** @type {import('tailwindcss').Config} */

const withOpacity = (variable: string) => {
  return ({ opacityValue }: { opacityValue?: number }) =>
    opacityValue !== undefined
      ? `rgba(var(${variable}), ${opacityValue})`
      : `rgb(var(${variable}))`
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|input|ripple|spinner|form).js"
  ],
  theme: {
    extend: {
      colors: {
        primary: withOpacity('--color-primary'),
        secondary: withOpacity('--color-secondary'),
        success: withOpacity('--color-success'),
        warning: withOpacity('--color-warning'),
        error: withOpacity('--color-error'),
        background: withOpacity('--background-app-rgb'),
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [heroui()],
}
