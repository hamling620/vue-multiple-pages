const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const { srcPath, distPath, isDev } = require('./config')
const { setEntry, setHtmlPlugin } = require('./utils')

console.log(isDev)

module.exports = {
  entry: setEntry,
  output: {
    filename: '[name]/[name].[contenthash:8].js',
    path: path.resolve(distPath)
  },
  resolve: {
    alias: {
      '@': srcPath
    },
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: /node_modules/
      },
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
        test: /\.s?css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: false
            }
          },
          'postcss-loader',
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: path.resolve(srcPath, 'assets/scss/variable.scss')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...setHtmlPlugin(HtmlWebpackPlugin),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css'
    }),
    new webpack.DefinePlugin({
      BASE_URL: "'./'",
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: isDev
    })
  ]
}

/**
 * {
    'pageOne': path.join(srcPath, 'pages/pageOne/index.js'),
    'pageTwo': path.join(srcPath, 'pages/pageTwo/index.js')
  }
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
 */

// "sideEffects": [
//   "**/*.css",
//   "**/*.scss",
//   "**/*.vue"
// ],
