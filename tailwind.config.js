console.log("Using tailwind.config.js");

// const withMT = require("@material-tailwind/react/utils/withMT");
import { mtConfig } from "@material-tailwind/react";

export default {
  content: [
    './public/src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
    },
  },
  plugins: [
    mtConfig,
  ],
};
