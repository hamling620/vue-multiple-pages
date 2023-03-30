const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./config')

module.exports = {
  entry: {
    'pageOne': path.join(srcPath, 'pages/pageOne/index.js'),
    'pageTwo': path.join(srcPath, 'pages/pageTwo/index.js')
  },
  output: {
    filename: '[name]/[name].[contenthash:8].js',
    path: path.resolve(distPath)
  },
  resolve: {
    alias: {
      '@': srcPath
    }
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          { 
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'pageOne/index.html',
      chunks: ['pageOne']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'pageTwo/index.html',
      chunks: ['pageTwo']
    })
  ]
}
