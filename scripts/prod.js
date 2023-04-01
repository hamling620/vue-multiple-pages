const inquirer = require('inquirer')
const execa = require('execa')
const { separator, log } = require('./constants')
const { getEntry } = require('../build/utils')

const packages = [...Object.keys(getEntry())]

if (!packages.length) {
  return log('不合法目录，请检查src/pages/*/index.ts', 'warning')
}

const allPackages = [...packages, 'all']

// 用户交互
inquirer.prompt([
  {
    type: 'checkbox',
    message: '请选择要启动的项目',
    name: 'devLists',
    choices: allPackages,
    validate (value) {
      return !value.length ? new Error('至少选择一个项目启动') : true
    },
    filter (value) {
      return value.includes('all') ? packages : value
    }
  }
]).then(res => {
  const message = `当前选中Package: ${res.devLists.join(' , ')}`
  log(message, 'success')
  runParaller(res.devLists)
})

// 调用打包命令
async function runParaller (packages) {
  const message = `开始启动: ${packages.join('-')}`
  log(message, 'success')
  log('\nplease waiting some times...', 'success')
  await build(packages)
}

// 打包函数
async function build (buildLists) {
  const stringLists = buildLists.join(separator)
  await execa('webpack', ['--config', './build/webpack.prod.js'], {
    stdio: 'inherit',
    env: {
      packages: stringLists
    }
  })
}
