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

  test('测试 setBreadcrumbName 能找到相应面包屑数据的情况', () => {
    const state = {
      breadcrumbData: [{
        "clickable": false,
        "isShow": true,
        "name": "动态_类型",
        "path": "/_type"
      }]
    }

    setBreadcrumbName(state, {
      oldName: '动态_类型',
      newName: '类型一'
    })
    expect(state.breadcrumbData).toEqual([{
      "clickable": false,
      "isShow": true,
      "name": "类型一",
      "path": "/_type"
    }])
  })

  test('测试 setBreadcrumbName 找不到相应面包屑数据的情况', () => {
    const state = {
      breadcrumbData: [{
        "clickable": false,
        "isShow": true,
        "name": "应用",
        "path": "/app"
      }]
    }

    setBreadcrumbName(state, {
      oldName: '动态_类型',
      newName: '类型一'
    })
    expect(state.breadcrumbData).toEqual([{
      "clickable": false,
      "isShow": true,
      "name": "应用",
      "path": "/app"
    }])
  })

  test('测试 setBreadcrumbName 有多个相应面包屑数据的情况', () => {
    const state = {
      breadcrumbData: [{
        "clickable": false,
        "isShow": true,
        "name": "动态_类型",
        "path": "/_type"
      }, {
        "clickable": false,
        "isShow": true,
        "name": "动态_类型",
        "path": "/_type/_type"
      }]
    }

    setBreadcrumbName(state, {
      oldName: '动态_类型',
      newName: '类型一'
    })
    expect(state.breadcrumbData).toEqual([{
      "clickable": false,
      "isShow": true,
      "name": "类型一",
      "path": "/_type"
    }, {
      "clickable": false,
      "isShow": true,
      "name": "动态_类型",
      "path": "/_type/_type"
    }])
  })
})