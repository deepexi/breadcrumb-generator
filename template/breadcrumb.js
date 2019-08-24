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
  }
}