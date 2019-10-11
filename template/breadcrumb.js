export const state = () => ({
    breadcrumbData: []
})

export const mutations = {
  setBreadcrumb (state, breadcrumbData) {
    state.breadcrumbData = breadcrumbData
  },

  setBreadcrumbName(state, {oldName, newName}) {
    let curBreadcrumb = state.breadcrumbData.find(breadcrumb => breadcrumb.name === oldName)

    curBreadcrumb && (curBreadcrumb.name = newName)
  },
  setBreadcrumbNameByPath(state, {path, name}) {
    let curBreadcrumb = state.breadcrumbData.find(
      breadcrumb => breadcrumb.path === path
    )
    curBreadcrumb && (curBreadcrumb.name = name)
  },
  setBreadcrumbNameByParams(state, routeParamsMaps) {
    state.breadcrumbData.forEach(item => {
      const lastOne = item.path.split("/").pop()
      const reg = /_(.*)+/gi
      const result = reg.exec(lastOne)
      if (result) {
        const key = result[1]
        if (Object.keys(routeParamsMaps).includes(key)) {
          item.name = routeParamsMaps[key]
        }
      }
    })
  }
}