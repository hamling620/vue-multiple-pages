const path = require('path')

const srcPath = path.join(__dirname, '../src')
const distPath = path.resolve(__dirname, '../dist')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  srcPath,
  distPath,
  isDev
}
