const chalk = require('chalk')

const error = chalk.bold.red
const warning = chalk.hex('#FFA500')
const success = chalk.green

const maps = {
  error,
  warning,
  success
}

const separator = '*'

const log = (message, type) => {
  console.log(maps[type](message))
}

module.exports = {
  separator,
  log
}
