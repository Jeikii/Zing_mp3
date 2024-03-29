/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './public/index.html'],
  theme: {
    extend: {
      backgroundColor: {
        'main-100': '#3A3344',
        'main-200': '#231B2E',
        'main-300': '#170F23',
        'main-400': '#130c1c',
        'main-500': '#9B4DE0',
        'overlay-30': 'rgba(0,0,0,.3)',
      },
      colors: {
        'main-100': '#3A3344',
        'main-200': '#231B2E',
        'main-300': '#170F23',
        'main-400': '#130c1c',
        'main-500': '#9B4DE0',
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
        'slide-right-2': {
          '0%': {
            '-webkit-transform': 'translateX(-329px);',
            transform: 'translateX(-329px);',
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
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
        'rotate-center': {
          '0%': {
            '-webkit-transform': 'rotate(0);',
            transform: 'rotate(0);',
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg);',
            transform: 'rotate(360deg);',
          },
        },
        'rotate-center-pause': {
          '0%': {
            '-webkit-transform': 'rotate(360deg);',
            transform: 'rotate(360deg);',
            'border-radius': '99999px',
          },
          '100%': {
            '-webkit-transform': 'rotate(0);',
            transform: 'rotate(0);',
          },
        },
        'scale-up-center': {
          '0%': {
            '-webkit-transform': 'scale(0);',
            transform: 'scale(0);',
          },
          '100%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);',
          },
        },
        'scale-up-image': {
          '0%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);',
          },
          '100%': {
            '-webkit-transform': 'scale(1.1);',
            transform: 'scale(1.1);',
          },
        },
        'scale-down-image': {
          '0%': {
            '-webkit-transform': 'scale(1.1);',
            transform: 'scale(1.1);',
          },
          '100%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);',
          },
        },
      },
      animation: {
        'slide-right': 'slide-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-right-2':
          'slide-right-2 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left-2': 'slide-left-2 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'rotate-center': 'rotate-center 8s linear infinite;',
        'rotate-center-pause': 'rotate-center-pause .3s linear 1 both;',
        'scale-up-center':
          'scale-up-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-up-image':
          'scale-up-image 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-down-image':
          'scale-down-image 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      },
      flex: {
        4: '4 4 0%',
        6: '6 6 0%',
        3: '3 3 0%',
        7: '7 7 0%',
      },
    },
    screens: {
      1200: '1200px',
    },
  },
  plugins: [],
}
