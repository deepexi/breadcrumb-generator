import qs from 'qs'
import breadcrumbs from '@/components/breadcrumb/breadcrumb.config.json'

function path2Arr(path) {
  return path.split('/').filter(p => p)
}

function matchBreadcrumbData(matchPath) {
  return path2Arr(matchPath)
    .map(path => {
      path = path.replace(/^:([^:?]+)(\?)?$/, (match, $1) => {
        return `_${$1}`
      })
      return '/' + path
    })
    .map((path, index, paths) => {
      // 第 0 个不需拼接
      if (index) {
        let result = ''
        for (let i = 0; i <= index; i++) {
          result += paths[i]
        }
        return result
      }
      return path
    })
    .map(path => {
      const item = breadcrumbs.find(bread => {
        // path 有可能拼接了 query 需要去掉才能与 to.matched 分割出的 path 匹配上
        bread.path = bread.path.replace(/\?\S+/, '')
        return bread.path === path
      })

      return item || {
        name: path.split('/').pop(),
        path,
        clickable: false,
        isShow: true
      }
    })
}

export default ({app, store}) => {
  app.router.beforeEach((to, from, next) => {
    const toPathArr = path2Arr(to.path)
    const toPathArrLength = toPathArr.length
    let matchPath = ''

    // 从 matched 中找出当前路径的路由配置
    for (let match of to.matched) {
      const matchPathArr = path2Arr(match.path)
      if (matchPathArr.length === toPathArrLength) {
        matchPath = match.path
        break
      }
    }

    const breadcrumbData = matchBreadcrumbData(matchPath)

    const query = to.query
    if (Object.keys(query).length) {
      const queryStr = qs.stringify(query)
      const lastIndex = breadcrumbData.length - 1
      const lastPath = breadcrumbData[lastIndex].path
      breadcrumbData[lastIndex].path = `${lastPath}?${queryStr}`
    }

    store.commit('breadcrumb/setBreadcrumb', breadcrumbData)
    next()
  })
}
