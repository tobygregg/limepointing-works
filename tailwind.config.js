/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────
//  LimePointing Works – Tailwind config
//  Brand colours live here. Change them once and rebuild:
//    npm install   (first time only)
//    npm run build
// ─────────────────────────────────────────────────────────────
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Deep navy – the painted site sign in their profile photo
        navy: {
          950: '#0a1024',
          900: '#121a38',
          800: '#1b2550',
          700: '#263266',
          600: '#3a4884',
        },
        // Lime putty – the cured lime mortar and pale stone in the logo photo (#d6cab4, #b7ac95)
        putty: {
          50: '#faf7f1',
          100: '#f3eee3',
          200: '#e9e1d0',
          300: '#d6cab4',
          400: '#b7ac95',
          500: '#978c75',
          600: '#766b58',
          700: '#5a5144',
        },
        // Granite blue-grey – the stones in their walls
        granite: {
          300: '#aab4c3',
          400: '#8794a8',
          500: '#6f7c91',
        },
        // Warm sand – freshly pointed lime joints; small accents only
        sand: {
          300: '#e8d6ad',
          400: '#d6b77a',
          500: '#bf9a52',
        },
      },
      fontFamily: {
        display: ['"Young Serif"', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,26,56,.06), 0 14px 34px -16px rgba(18,26,56,.22)',
        lift: '0 2px 4px rgba(18,26,56,.06), 0 26px 50px -18px rgba(18,26,56,.34)',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        kenburns: { from: { transform: 'scale(1.02)' }, to: { transform: 'scale(1.12)' } },
        draw: { to: { strokeDashoffset: '0' } },
        rise: { from: { opacity: '0', transform: 'translateY(22px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        kenburns: 'kenburns 18s ease-out forwards',
        draw: 'draw 1.4s .9s cubic-bezier(.65,0,.35,1) forwards',
        rise: 'rise .8s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};
