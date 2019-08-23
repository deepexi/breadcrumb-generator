export const state = () => ({
    breadcrumbData: []
})

export const mutations = {
  setBreadcrumb (state, breadcrumbData) {
    state.breadcrumbData = breadcrumbData
  }
}