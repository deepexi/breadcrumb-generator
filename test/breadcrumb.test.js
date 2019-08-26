import { mutations } from '../template/breadcrumb'

const { setBreadcrumb, setBreadcrumbName} = mutations

describe('测试 mutations', () => {
  test('测试 setBreadcrumb', () => {
    const state = {
      breadcrumbData: []
    }

    const newBreadcrumbData = [
      {
        "clickable": false,
        "isShow": true,
        "name": "应用",
        "path": "/app"
      }
    ]

    setBreadcrumb(state, newBreadcrumbData)
    expect(state.breadcrumbData).toEqual(newBreadcrumbData)
  })
})