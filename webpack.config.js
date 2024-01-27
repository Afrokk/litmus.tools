const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.csv$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      Pages: path.resolve(__dirname, "src/pages/"),
      Utilities: path.resolve(__dirname, "src/utils/"),
      Components: path.resolve(__dirname, "src/components/"),
      Styles: path.resolve(__dirname, "src/styles/"),
      Assets: path.resolve(__dirname, "src/assets/"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
  },
};
