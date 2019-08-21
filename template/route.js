import breadcrumbs from '@/components/breadcrumb/breadcrumb.config.json'

export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    const paths = to.path
      .split('/')
      .filter(p => p)
      .map(p => '/' + p)

    const breadcrumbData = []

    for (let i = 0; i < paths.length; i++) {
      const curPath = ''
      if (i) {
        for (let j = 0; j <= i; j++) {
          curPath += paths[j]
        }
      } else {
        curPath = paths[i]
      }

      const breadcrumbObj = breadcrumbs.find(bread => bread.path === curPath)

      // 若找到对应配置直接 push 进面包屑数组
      if (breadcrumbObj) {
        breadcrumbData.push(breadcrumbObj)
      } else {
        const paramKeys = Object.keys(to.params)
        if (paramKeys.length) { // 动态路由
          for (let k = 0; k < paramKeys.length; k++) {
            const newPathArr = curPath.split('/').filter(p => p)
            newPathArr[newPathArr.length - 1] = '_' + paramKeys[k]
            const newPath =newPathArr.join('/')
            const breadcrumbItem = breadcrumbs.find(bread => bread.path === '/' + newPath)
            if (breadcrumbItem) {
              breadcrumbData.push(breadcrumbItem)
              paths[i] = '/' + newPathArr[newPathArr.length - 1]
              break
            }
          }
        } else { // 没有配置（没找到也不是动态路由）
          breadcrumbData.push({
            name: curPath.split('/').pop(),
            path: curPath,
            clickable: false,
            isShow: true
          })
        }
      }
    }
    store.commit('breadcrumb/setBreadcrumb', breadcrumbData)
    next()
  })
}