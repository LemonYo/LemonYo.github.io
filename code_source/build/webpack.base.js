const webpack = require('webpack')
const path = require('path')
const htmlWebpackplugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    main: './code_source/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 2 * 1024,
          outputPath: 'images'
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 2 * 1024,
          outputPath: 'fonts'
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.join(__dirname, "./code_source/src"),
      views: path.join(__dirname, "./code_source/views")
    }
  },
  plugins: [
    new htmlWebpackplugin({
      template: './code_source/index.html'
    })
  ]
}