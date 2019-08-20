# breadcrumb-generator
[![NPM Download](https://img.shields.io/npm/dm/bcg)](https://www.npmjs.com/package/bcg)
[![NPM Version](https://img.shields.io/npm/v/bcg)](https://www.npmjs.com/package/bcg)
[![Github Start](https://img.shields.io/github/stars/OuZuYu/breadcrumb-generator?style=social)](https://github.com/OuZuYu/breadcrumb-generator)

配合 [@femessage/create-nuxt-app](https://github.com/FEMessage/create-nuxt-app) 使用的面包屑工具，快速生成页面与配置面包屑数据

## 目录
- [安装](#安装)
- [命令与选项](#命令与选项)
- [配置说明](#配置说明)
- [例子](#例子)
- [动态面包屑](#动态面包屑)


## 安装
```sh
yarn global add bcg
```

[⬆ Back to Top](#table-of-contents)


## 命令与选项
### init
初始化面包屑，将会生成面包屑相关文件，包括面包屑组件、json配置文件、vuex相关文件、plugin相关文件

### new
生成页面并配置面包屑数据，默认基础路径为 src/pages，可通过 -b 选项修改
```sh
# 生成 src/pages/app/detail.vue
bcg new app/detail.vue

# or

bcg new app/detail

# 生成 src/views/app/detail.vue
bcg new app/detail.vue -b src/views

# or

bcg new app/detail -b src/views
```

[⬆ Back to Top](#table-of-contents)

## 配置说明
```javascript
  [{
    "clickable": false, // 是否可点击跳转
    "isShow": true, // 该路径下是否显示面包屑
    "name": "应用", // 显示的面包屑名称
    "path": "/app" // 路径
  }]
```

## 例子
首先使用 [@femessage/create-nuxt-app](https://github.com/FEMessage/create-nuxt-app) 生成一个 nuxt 项目


第一步：初始化，生成相关文件

![init-command](http://tva1.sinaimg.cn/large/0060lm7Tly1g654cjwojsj30jq04eglv.jpg)

可以看到文件已经生成了

![component](http://tva1.sinaimg.cn/large/0060lm7Tly1g653tm5sxej308n0423yd.jpg)

![plugin](http://tva1.sinaimg.cn/large/0060lm7Tly1g653tmb9tpj308q04ujr9.jpg)

![store](http://tva1.sinaimg.cn/large/0060lm7Tly1g653trjq50j307l03bdfn.jpg)


第二步：配置 plugin

![set-plugin](http://tva1.sinaimg.cn/large/0060lm7Tly1g653xq2ukzj30ho0d00tf.jpg)

第三步：在 layout 引入面包屑组件

![import-component](http://tva1.sinaimg.cn/large/0060lm7Tly1g6541ezti1j30la0cnq3w.jpg)

![use-component](http://tva1.sinaimg.cn/large/0060lm7Tly1g6542b4hebj30kl07n0t7.jpg)

第四步：生成一个页面

![new-command](http://tva1.sinaimg.cn/large/0060lm7Tly1g654fvu5w5j30ht0c575f.jpg)

可以看到页面与配置已经生成了


![page](http://tva1.sinaimg.cn/large/0060lm7Tly1g654gryzazj308f0350sj.jpg)

![comfiguration](http://tva1.sinaimg.cn/large/0060lm7Tly1g654hhnd4uj30ea0hcaay.jpg)

第五步：启动项目，打开 /app/detail/my-app 查看效果

![result](http://tva1.sinaimg.cn/large/0060lm7Tly1g654se568ag30l2099dix.gif)


[⬆ Back to Top](#table-of-contents)

## 动态面包屑

有时候需要动态设置面包屑数据（比如使用动态路由时）

由于面包屑数据是通过 vuex 管理的，所以设置动态面包屑也是非常方便，仅需调用设置面包屑数据的 mutation 设置相应数据即可

如下例子展示加一个首页的面包屑数据

![set-breadcrumb-data](http://tva1.sinaimg.cn/large/0060lm7Tly1g658ppwul8j30r10f0ta7.jpg)


![set-breadcrumb-data-result](http://tva1.sinaimg.cn/large/0060lm7Tly1g658teb09bj30ns09qmy0.jpg)


[⬆ Back to Top](#table-of-contents)
