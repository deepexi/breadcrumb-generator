# breadcrumb-generator

[![NPM Download](https://img.shields.io/npm/dm/%40deepexi-devops/bcg)](https://img.shields.io/npm/dm/%40deepexi-devops/bcg)
[![NPM Version](https://img.shields.io/npm/v/%40deepexi-devops/bcg)](https://www.npmjs.com/package/bcg)
[![Bulid status](https://travis-ci.org/deepexi/d-breadcrumb.svg?branch=master)](https://travis-ci.org/deepexi/d-breadcrumb)
[![Github Start](https://img.shields.io/github/stars/deepexi/d-breadcrumb?style=social)](https://github.com/deepexi/d-breadcrumb)

配合 [@femessage/create-nuxt-app](https://github.com/FEMessage/create-nuxt-app) 使用的面包屑工具，快速生成页面与配置面包屑数据

## 目录

- [安装](#安装)
- [命令与选项](#命令与选项)
- [配置说明](#配置说明)
- [例子](#例子)
- [动态面包屑](#动态面包屑)

## 安装

```bash
yarn global add @deepexi-devops/bcg
# or
npm install --global @deepexi-devops/bcg
```

[⬆ Back to Top](#table-of-contents)

## 命令与选项

### init

初始化面包屑，将会生成面包屑相关文件，包括面包屑组件、json配置文件、vuex相关文件、plugin相关文件

### new

生成页面并配置面包屑数据，默认基础路径为 src/pages，可通过 -b 选项修改

```bash
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

由于面包屑数据是通过 vuex 管理的，所以动态设置也是非常方便，仅需调用设置面包屑数据的 mutation 设置相应数据即可

- 修改某个面包屑显示名称

假设有一个参数为 type 的动态路由，我们生成这个页面，并且设置面包屑名称为 "动态_类型"

![new-_type](http://tva1.sinaimg.cn/large/007X8olVly1g6b4fg7v6fj30ge0ay3zb.jpg)

在刚刚生成的 _type.vue 中动态设置这个名称

![set-type](http://tva1.sinaimg.cn/large/007X8olVly1g6b43bexksj30jw09g0t0.jpg)

查看效果

![set-type-result](http://tva1.sinaimg.cn/large/007X8olVly1g6b43r95d6j30d2086mx8.jpg)


- 修改整个面包屑数组

我们也可以动态修改整个面包屑数组

这么做的话有一点需要注意：**就是要将原数据复制一份进行修改，否则就变成直接修改 state 了，将会报 vuex 相关错误**

![set-breadcrumb-data](http://tva1.sinaimg.cn/large/0060lm7Tly1g658ppwul8j30r10f0ta7.jpg)

查看效果

![set-breadcrumb-data-result](http://tva1.sinaimg.cn/large/0060lm7Tly1g658teb09bj30ns09qmy0.jpg)

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
<tr><td align="center"><a href="http://levy.work"><img src="https://avatars1.githubusercontent.com/u/26338853?s=460&v=4" width="100px;" alt="OuZuYu"/><br /><sub><b>OuZuYu</b></sub></a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
