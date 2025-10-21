const path = require("path");

module.exports = {
  style: {
    postcss: {
      plugins: [
        require("@tailwindcss/postcss"),
        require("autoprefixer"),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        "@": path.resolve(__dirname, "src"),
      };
      return webpackConfig;
    },
  },
};
