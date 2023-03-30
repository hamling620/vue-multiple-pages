const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {
  mode: 'development',
  stats: 'errors-only',
  devServer: {
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
