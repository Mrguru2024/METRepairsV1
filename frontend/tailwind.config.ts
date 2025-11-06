import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  important: true,
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{json}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B41E4',
        secondary: '#4AE66C',
        neutral_dark: '#0F172A',
        neutral_light: '#F8FAFC',
        accent: '#FFB020',
      },
    },
  },
  plugins: [],
};

export default config;


