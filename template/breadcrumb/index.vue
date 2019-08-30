<template>
  <div class="bcg-breadcrumb" v-if="isBreadcrumbShow">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        v-if="item.isCurShow"
        :to="item.clickable ? replacePath(item.path) : ''"
        :key="index">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import breadcrumbs from "./breadcrumb.config"

export default {
  name: 'Breadcrumb',

  computed: {
    isBreadcrumbShow () {
      return this.breadcrumbData && this.breadcrumbData.length && this.curBreadcrumb.isShow
    },

    breadcrumbData () {
      return this.$store.state.breadcrumb.breadcrumbData
    },

    curBreadcrumb () {
      return this.breadcrumbData[this.breadcrumbData.length - 1]
    }
  },

  methods: {
    replacePath (path) {
      return path
        .split('/')
        .map(item =>
          item.startsWith('_')
           ? this.$route.params[item.substring(1)]
              : item)
        .join('/')
    }
  }
}
</script>

<style lang="less">
.bcg-breadcrumb {
  .el-breadcrumb {
    width: 100%;
    height: 56px;
    line-height: 56px;
    padding-left: 20px;
    background: #fff;
  }
}
</style>
