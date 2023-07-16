const path = require('path');

module.exports = {
  entry: "./assets/js/application.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./src"),
    filename: "main.js"
  },
  devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
