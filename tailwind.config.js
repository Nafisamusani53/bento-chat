// tailwind.config.js
export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}', // update based on your project structure
    ],
    theme: {
      extend: {
        colors: {
          light_blue: '#EFF6FF',
          grey: '#6B6B6B'
        },
      },
    },
    plugins: [],
  };
  