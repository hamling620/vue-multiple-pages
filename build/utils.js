const glob = require('glob')
const path = require('path')
const { srcPath } = require('./config')

function setEntry () {
  const files = glob.sync(path.join(srcPath, 'pages/**/index.js'))
  const entry = {}
  files.forEach(file => {
    const ret = file.match(/src\/pages\/(\S*)\/index\.js$/)
    if (ret) {
      entry[ret[1]] = {
        import: file
      }
    }
  })
  return entry
}

function getTemplate (name) {
  const files = glob.sync(path.join(srcPath, `pages/${name}/index.html`))
  if (files.length > 0) return files[0]
  return path.join(__dirname, '../public/index.html')
}

function setHtmlPlugin(HtmlWebpackPlugin) {
  const files = glob.sync(path.join(srcPath, 'pages/**/index.js'))
  const plugins = []
  files.forEach(file => {
    const ret = file.match(/src\/pages\/(\S*)\/index\.js$/)
    if (ret) {
      const name = ret[1]
      plugins.push(new HtmlWebpackPlugin({
        template: getTemplate(name),
        filename: `${name}/index.html`,
        chunks: [name]
      }))
    }
  })
  return plugins
}

module.exports = {
  setEntry,
  setHtmlPlugin
}
