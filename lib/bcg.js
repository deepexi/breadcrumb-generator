#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')

const boxen = require('boxen')
const inquirer = require('inquirer')
const commander = require('commander')
const Handlebars = require('handlebars')

const {
  createPathArr,
  log,
  errorLog,
  successLog,
  infoLog,
  copyFile
} = require('./utils')

const VUE_SUFFIX = '.vue'

const source = {
  VUE_PAGE_PATH: path.resolve(__dirname, '../template/new-page.vue'),
  BREADCRUMB_COMPONENT_PATH: path.resolve(__dirname, '../template/breadcrumb'),
  PLUGIN_PATH: path.resolve(__dirname, '../template/route.js'),
  STORE_PATH: path.resolve(__dirname, '../template/breadcrumb.js')
}

const target = {
  BREADCRUMB_COMPONENT_PATH: 'src/components/breadcrumb',
  BREADCRUMB_JSON_PATH: 'src/components/breadcrumb/breadcrumb.config.json',
  PLUGIN_PATH: 'src/plugins/route.js',
  STORE_PATH: 'src/store/breadcrumb.js'
}

function initBreadCrumbs() {
  try {
    copyFile(source.BREADCRUMB_COMPONENT_PATH, target.BREADCRUMB_COMPONENT_PATH)
    copyFile(source.PLUGIN_PATH, target.PLUGIN_PATH)
    copyFile(source.STORE_PATH, target.STORE_PATH)
  } catch (err) {
    throw err
  }
}

function generateVueFile(newPagePath) {
  try {
    if (fs.existsSync(newPagePath)) {
      log(errorLog(`${newPagePath} 已存在`))
      return
    }

    const fileName = path.basename(newPagePath).replace(VUE_SUFFIX, '')
    const vuePage = fs.readFileSync(source.VUE_PAGE_PATH, 'utf8')
    const template = Handlebars.compile(vuePage)
    const result = template({ filename: fileName })

    fs.outputFileSync(newPagePath, result)

    log(successLog('\nvue页面生成成功咯\n'))
  } catch (err) {
    throw err
  }
}

function updateConfiguration(filePath, {
  clickable,
  isShow
} = {}) {
  try {
    if (!fs.existsSync(target.BREADCRUMB_JSON_PATH)) {
      log(errorLog('面包屑配置文件不存在, 配置失败咯, 可通过 bcg init 生成相关文件'))
      return
    }

    let pathArr = createPathArr(filePath)
    const configurationArr = fs.readJsonSync(target.BREADCRUMB_JSON_PATH)

    // 如果已经有配置就过滤掉
    pathArr = pathArr.filter(pathItem => !configurationArr.some(configurationItem => configurationItem.path === pathItem))

    const questions = pathArr.map(pathItem => {
      return {
        type: 'input',
        name: pathItem,
        message: `请输入 ${pathItem} 的面包屑显示名称`,
        default: pathItem
      }
    })

    inquirer.prompt(questions).then(answers => {
      const pathArrLastIdx = pathArr.length - 1

      pathArr.forEach((pathItem, index) => {
        configurationArr.push({
          clickable: index === pathArrLastIdx ? clickable : false,
          isShow: index === pathArrLastIdx ? isShow : true,
          name: answers[pathItem],
          path: pathItem
        })
      })

      fs.writeJsonSync(target.BREADCRUMB_JSON_PATH, configurationArr, {
        spaces: 2
      })

      log(successLog('\n生成面包屑配置成功咯'))
    })
  } catch (err) {
    log(errorLog('生成面包屑配置失败咯'))
    throw err
  }
}

function generating(newPagePath, filePath) {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'clickable',
      message: '是否可点击跳转? (默认 yes)',
      default: true
    },
    {
      type: 'confirm',
      name: 'isShow',
      message: '是否展示面包屑? (默认 yes)',
      default: true
    },
    {
      type: 'confirm',
      name: 'onlyConfig',
      message: '是否仅生成配置而不生成文件? (默认 no)',
      default: false
    }
  ]).then(({ clickable, isShow, onlyConfig }) => {
    if (onlyConfig) {
      updateConfiguration(filePath, { clickable, isShow })
      return
    }

    generateVueFile(newPagePath)
    updateConfiguration(filePath, { clickable, isShow })
  })
}

const program = new commander.Command()

program
  .command('init')
  .description('初始化面包屑')
  .action(initBreadCrumbs)

program
  .version('0.1.0')
  .command('new <file-path>')
  .description('生成页面并配置面包屑，默认基础路径为 src/pages，可通过 -b 修改')
  .option('-b, --basePath <base-path>', '修改基础路径 (不要以 / 开头)')
  .action((filePath, opts) => {
    filePath = filePath.endsWith(VUE_SUFFIX) ? filePath : `${filePath}${VUE_SUFFIX}`
    const basePath = opts.basePath || 'src/pages'
    const newPagePath = path.join(basePath, filePath)

    log(
      infoLog(
        boxen(`即将配置 ${newPagePath}`, {
          padding: 1,
          margin: 1,
          borderStyle: 'round'
        })
      )
    )

    generating(newPagePath, filePath)
  })

program.parse(process.argv)

if (!process.argv.slice(2)[0]) {
  program.help()
}
