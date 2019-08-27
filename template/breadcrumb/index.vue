<template>
  <div class="bcg-breadcrumb" v-if="isBreadcrumbShow">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :to="item.clickable ? replacePath(item.path) : ''"
        :key="index">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Breadcrumb',

  computed: {
    ...mapState('breadcrumb',['breadcrumbData']),
    
    breadcrumbs () {
      return Array.isArray(this.breadcrumbData) ? this.breadcrumbData.filter(crumb=>crumb.isShow) : []
    },

    isBreadcrumbShow () {
      return this.breadcrumbs && this.breadcrumbs.length
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
