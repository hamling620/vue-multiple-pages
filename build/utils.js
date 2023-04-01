const glob = require('glob')
const path = require('path')
const { srcPath } = require('./config')

function setEntry () {
  const files = glob.sync(path.join(srcPath, 'pages/**/index.ts'))
  const entry = {}
  files.forEach(file => {
    const ret = file.match(/src\/pages\/(\S*)\/index\.ts$/)
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
  const files = glob.sync(path.join(srcPath, 'pages/**/index.ts'))
  const plugins = []
  files.forEach(file => {
    const ret = file.match(/src\/pages\/(\S*)\/index\.ts$/)
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

function setEnv() {
  // 环境变量配置
  const envMode = process.env.envMode
  require('dotenv').config({ path: `.env` })
  require('dotenv').config({ path: `.env.${envMode}` })
  const prefixRE = /^VUE_APP_/
  const env = {}
  for (const key in process.env) {
    if (key === 'NODE_ENV' || key === 'BASE_URL' || prefixRE.test(key)) {
      env[key] = JSON.stringify(process.env[key])
    }
  }
  return env
}

module.exports = {
  setEntry,
  setHtmlPlugin,
  setEnv
}
