import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        orange: '#F07F5E',
        navy: '#2C3E50',
        white: '#F9F9F9'
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        serif: ['"Noto Serif JP"', 'serif']
      },
      boxShadow: {
        card: '0 12px 40px rgba(44, 62, 80, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
