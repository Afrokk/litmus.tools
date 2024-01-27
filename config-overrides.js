const webpack = require("webpack");
const path = require("path");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: false,
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    path: false,
    fs: false,
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.resolve.alias = {
    ...config.resolve.alias,
    Pages: path.resolve(__dirname, "src/pages/"),
    Utilities: path.resolve(__dirname, "src/utils/"),
    Components: path.resolve(__dirname, "src/components/"),
    Styles: path.resolve(__dirname, "src/styles/"),
    Assets: path.resolve(__dirname, "src/assets/"),
  };
  return config;
};
