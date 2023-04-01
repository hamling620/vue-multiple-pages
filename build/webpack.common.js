const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const { srcPath, distPath } = require('./config')
const { setEntry, setHtmlPlugin, setEnv } = require('./utils')

const isProd = process.env.envMode === 'production'
console.log('isProd', isProd)

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
    extensions: ['.ts', '.vue', '.tsx','.js'] // js不能省略
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }],
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
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
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
      filename: '[name]/[name].[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ...setEnv()
      },
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
}

// sideEffects记得要忽略*.vue文件，否则样式会被tree-shaking
