/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './public/index.html'],
  theme: {
    extend: {
      backgroundColor: {
        'main-100': '#e7ecec',
        'main-200': '#dde4e4',
        'main-300': '#ced9d9',
        'main-400': '#c0d8d8',
        'main-500': '#0e8080',
      },
      colors: {
        'main-100': '#e7ecec',
        'main-200': '#dde4e4',
        'main-300': '#ced9d9',
        'main-400': '#c0d8d8',
        'main-500': '#0e8080',
      },
      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-500px);',
            opacity: 0,
            transform: 'translateX(-500px);',
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            opacity: 1,
            transform: 'translateX(0);',
          },
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': 'translateX(500px);',
            transform: 'translateX(500px);',
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);',
          },
        },
        'slide-left-2': {
          '0%': {
            '-webkit-transform': 'translateX(500px);',
            transform: 'translateX(500px);',
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);',
          },
        },
      },
      animation: {
        'slide-right': 'slide-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left-2': 'slide-left-2 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      },
    },
  },
  plugins: [],
}
