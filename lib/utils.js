const fs = require('fs-extra')
const chalk = require('chalk')

const log = console.log

const errorLog = chalk.bold.red

const successLog = chalk.bold.green

const infoLog = chalk.bold.blue

/**
 * 根据路径字符串生成路径数组
 * @param {string} pathStr 路径字符串
 * @example
 * // return ['/app', '/app/detail']
 * createPathArr('app/detail')
 * @returns {array} 包含各层级路径的数组
 */
function createPathArr(pathStr) {
  return pathStr
    .replace(/.vue$/, '')
    .split('/')
    .filter(p => p)
    .map(p => '/' + p)
    .map((path, index, paths) => {
      if (index) {
        let result = ''
        for (let i = 0; i <= index; i++) {
          result += paths[i]
        }
        return result
      }
      return path
    })
}

function copyFile (src, dest) {
  if (fs.existsSync(dest)) {
    log(errorLog(`${dest} 已存在\n`))
    return
  }

  fs.copySync(src, dest)
  log(successLog(`生成 ${dest} 成功咯\n`))
}

module.exports = {
  createPathArr,
  log,
  errorLog,
  successLog,
  infoLog,
  copyFile
}