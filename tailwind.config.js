module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Can be 'media', 'class', or false
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
          '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
          '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
          '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
          '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
          '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
          '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
          '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
          '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
          '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
          '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
        },
        jumpAndShake: {
          '0%, 100%': { transform: 'translateY(0) translate(1px, 1px) rotate(0deg)' },
          '5%': { transform: 'translateY(0) translate(-2px, -2px) rotate(-0.5deg)' },
          '20%': { transform: 'translateY(0) translate(-4px, -4px) rotate(1deg)' },
          '30%': { transform: 'translateY(0) translate(4px, 4px) rotate(-0.5deg)' },
          '40%': { transform: 'translateY(0) translate(2px, -3px) rotate(0.5deg)' },
          '50%': { transform: 'translateY(-40px) translate(-2px, 3px) rotate(-0.5deg)' },
          '60%': { transform: 'translateY(0) translate(-4px, 2px) rotate(0deg)' },
          '70%': { transform: 'translateY(0) translate(4px, 2px) rotate(-0.5deg)' },
          '80%': { transform: 'translateY(0) translate(-2px, -2px) rotate(0.5deg)' },
          '90%': { transform: 'translateY(0) translate(2px, 3px) rotate(0deg)' },
          '95%': { transform: 'translateY(0) translate(-2px, -2px) rotate(0deg)' },
        },
        eggShake: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '10%': { transform: 'translateX(-1px) rotate(-1deg)' },
          '20%': { transform: 'translateX(2px) rotate(1deg)' },
          '30%': { transform: 'translateX(-3px) rotate(-1.5deg)' },
          '40%': { transform: 'translateX(3px) rotate(1.5deg)' },
          '50%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '60%': { transform: 'translateX(2px) rotate(1deg)' },
          '70%': { transform: 'translateX(-1px) rotate(-0.5deg)' },
          '80%': { transform: 'translateX(1px) rotate(0.5deg)' },
          '90%': { transform: 'translateX(-2px) rotate(-1deg)' },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        shake: 'shake 0.5s infinite',
        eggShake: 'eggShake 3s infinite',
        jumpAndShake: 'jumpAndShake 6s infinite',
        fadeOut: 'fadeOut 0.7s',
      },
      fontFamily: {
        sans: ['"Press Start 2P"', 'cursive'], // Added fallback font 'cursive'
      },
      colors: {
        customLightBlue: '#9ac4f8',
        customDarkBlue: '#0e172c',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
