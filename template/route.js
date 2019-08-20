import breadcrumbs from '@/components/breadcrumb/breadcrumb.config.json'

export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    const paths = to.path
      .split('/')
      .filter(p => p)
      .map(p => '/' + p)
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
        const item = breadcrumbs.find(bread => bread.path === path)
        if (item) {
          return item
        }
        return {
          name: path.split('/').pop(),
          path,
          clickable: false,
          isShow: true
        }
      })

    store.commit('breadcrumb/setBreadcrumb', paths)
    next()
  })
}