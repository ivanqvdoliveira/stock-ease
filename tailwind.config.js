/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'foreground': '#0d191b',
        'primary': '#075985',
        'primary-dark': '#082f49',
        'primary-light': '#bae6fd',
        'secondary': '#1e293b',
        'secondary-dark': '#020617',
        'secondary-light': '#e2e8f0',
        'tertiary': '#27272a',
        'tertiary-dark': '#09090b',
        'tertiary-light': '#e4e4e7',
        'white': '#ffffff',
        'black': '#000000',
      },
    },
  },
  darkmode: ['class', '[data-theme="dark"]'],
  plugins: [
    require('daisyui'),
  ],
}
