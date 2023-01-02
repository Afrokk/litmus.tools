module.exports = {
  module: {
      rules: [
          {
              test: /\.csv$/,
              use: [
                  {
                      loader: 'file-loader',
                  },
              ],
          },
      ],
  },
};
