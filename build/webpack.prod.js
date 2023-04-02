const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
    // ,
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     // 第三方模块
    //     vendor: {
    //       name: 'vendor',
    //       priority: 1,
    //       test: /node_modules/,
    //       minSize: 30,
    //       minChunks: 1
    //     },
    //     // 公共模块
    //     common: {
    //       name: 'common',
    //       priority: 0,
    //       minSize: 0,
    //       minChunks: 2 // 模块最少复用过两次
    //     }
    //   }
    // }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
})
