const { createPathArr } = require('../lib/utils')

describe('测试 createPathArr 函数', () => {
  test('抛出类型错误', () => {
    expect(createPathArr).toThrow(TypeError)
  })

  test('传入空字符串', () => {
    expect(createPathArr('')).toEqual([])
  })

  test('传入不带后缀参数', () => {
    expect(createPathArr('app')).toEqual(['/app'])
    expect(createPathArr('/app')).toEqual(['/app'])
    expect(createPathArr('app/')).toEqual(['/app'])
    expect(createPathArr('/app/')).toEqual(['/app'])
  })

  test('传入带后缀参数', () => {
    expect(createPathArr('/app.vue')).toEqual(['/app'])
    expect(createPathArr('app.vue')).toEqual(['/app'])
    expect(createPathArr('app.vue/')).toEqual(['/app'])
    expect(createPathArr('/app.vue/')).toEqual(['/app'])
    expect(createPathArr('/app/.vue')).toEqual(['/app'])
    expect(createPathArr('/app/.vue.vue')).toEqual(['/app', '/app/.vue'])
  })

  test('传入错误路径', () => {
    expect(createPathArr('app//')).toEqual(['/app'])
    expect(createPathArr('/app//')).toEqual(['/app'])
    expect(createPathArr('/app/detail//')).toEqual(['/app', '/app/detail'])
    expect(createPathArr('///')).toEqual([])
  })

  test('传入多级路径', () => {
    expect(createPathArr('app/detail')).toEqual(['/app', '/app/detail'])
    expect(createPathArr('/app/detail')).toEqual(['/app', '/app/detail'])
    expect(createPathArr('/app/_detail/')).toEqual(['/app', '/app/_detail'])

    expect(createPathArr('/app/detail/my-app')).toEqual(['/app', '/app/detail', '/app/detail/my-app'])
  })
})