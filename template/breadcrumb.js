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
      let lastOne = item.path.split("/").slice(-1)[0];
      let reg = /_(.*)+/gi;
      let result = reg.exec(lastOne);
      if (result) {
        let key = result[1];
        let keys = Object.keys(routeParamsMaps);
        if (keys.includes(key)) {
          item.name = routeParamsMaps[key];
        }
      }
    })
  }
}