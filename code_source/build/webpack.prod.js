const webpack = require('webpack')
const path = require('path')

const baseConfig = require('./webpack.base')

const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge.smart(baseConfig, {
  mode: "production",
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../../web'),
    publicPath: './web'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './'
            }
          },
          {
              loader: 'css-loader',
              options: {
                  importLoaders: 1
              }
          }, 'postcss-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './'
            }
          },
          {
              loader: 'css-loader',
              options: {
                  importLoaders: 1
              }
          }, 'postcss-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: "all",    // 只对异步引入代码起作用，设置all时并同时配置vendors才对两者起作用
      minSize: 30000,   // 引入的库大于30kb时才会做代码分割
      minChunks: 1,     // 一个模块至少被用了1次才会被分割
      maxAsyncRequests: 5,     // 同时异步加载的模块数最多是5个，如果超过5个则不做代码分割
      maxInitialRequests: 3,   // 入口文件进行加载时，引入的库最多分割出3个js文件
      automaticNameDelimiter: '~',  // 生成文件名的文件链接符
      name: true,   // 开启自定义名称效果
      cacheGroups: {  // 判断分割出的代码放到那里去
        vendors: {   // 配合chunks：‘all’使用，表示如果引入的库是在node-modules中，那就会把这个库分割出来并起名为vendors.js
            test: /[\/]node_modules[\/]/,
            priority: -10,
            filename: 'js/vendors.js'
        },
        default: {  // 为非node-modules库中分割出的代码设置默认存放名称
            priority: -20,
            reuseExistingChunk: true, // 避免被重复打包分割
            filename: 'js/common.js'
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          priority: -10,
          enforce: true
        },
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CSSSplitWebpackPlugin({
      size: 4000,
      filename: '[name]-[part].[ext]'
    })
  ]
})