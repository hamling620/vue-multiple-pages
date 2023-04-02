const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ElintWebpackPlugin = require('eslint-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
const webpack = require('webpack')
const { srcPath, distPath } = require('./config')
const { getEntryTemplate, setEnv } = require('./utils')
const { separator } = require('../scripts/constants')

const packages = process.env.packages.split(separator)
const { entry, htmlPlugins } = getEntryTemplate(packages)

const isProd = process.env.envMode === 'production'
console.log('isProd', isProd)

module.exports = {
  entry,
  output: {
    filename: '[name]/[name].[contenthash:8].js',
    path: path.resolve(distPath)
    // chunkFilename: '[name].[chunkhash:8].js'
  },
  resolve: {
    alias: {
      '@': srcPath
    },
    extensions: ['.ts', '.vue', '.tsx', '.js', '.mjs'] // js不能省略
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
    ...htmlPlugins,
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].[contenthash:8].css'
    }),
    // new ElintWebpackPlugin({
    //   context: srcPath,
    //   extensions: ['.ts', '.tsx', '.vue', '.js'],
    //   fix: true
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        ...setEnv()
      },
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }),
    ComponentsPlugin({
      resolvers: [VantResolver()],
      dts: 'src/components.d.ts'
    })
  ]
}

// sideEffects记得要忽略*.vue文件，否则样式会被tree-shaking
