import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ABAB5',
          dark: '#089B97',
          light: '#00D4AA',
        },
        accent: {
          DEFAULT: '#0D3B66',
          light: '#1A5276',
        },
        dark: {
          DEFAULT: '#0A0F1C',
          2: '#111827',
          3: '#1F2937',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0ABAB5 0%, #00D4AA 50%, #0D3B66 100%)',
        'gradient-teal': 'linear-gradient(135deg, #0ABAB5 0%, #00D4AA 100%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite 1s',
        'float-fast': 'float 5s ease-in-out infinite 2s',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'typing-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-30px) translateX(20px)' },
          '66%': { transform: 'translateY(20px) translateX(-15px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
