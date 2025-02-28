console.log("Using postcss.config.js");

module.exports = {
  plugins: [
    // require('@tailwindcss/postcss')({
    //   config: require('path').resolve(__dirname, 'tailwind.config.js')
    // }),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
