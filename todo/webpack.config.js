const path = require("path");
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {

  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build")
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    new HtmlWebPackPlugin({
        
      template: './public/index.html', 
      filename: 'index.html' 
    })
  ],
  devServer: {
    host : 'localhost',
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot : true,
    compress: true,
    port: 3000,
    open : true,
  },
  // devServer: {
  //   host : '127.0.0.1',
  //   contentBase: path.join(__dirname, "/public/"),
  //   compress: true,
  //   hot : true,
  //   inline: true,
  //   port: 9000,
  //   open : true
  // },
};