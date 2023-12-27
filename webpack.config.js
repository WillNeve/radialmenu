const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: "./src/application.js",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your HTML template file
      filename: path.resolve(__dirname, 'index.html'),    // Output filename in the root directory
      // other options...
    }),
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
