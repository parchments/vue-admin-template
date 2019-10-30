<template>
  <el-menu :collapse="false"
           :router="true"
           :default-active="$route.fullPath"
           class="nav-menu"
           mode="vertical"
           @select="handleSelect"
           background-color="#202c3a"
           text-color="#fff"
           active-text-color="#ffd04b">
    <!--页面刷新会保存状态$route.path-->
    <el-submenu index="1">
      <template slot="title">我的工作台</template>
      <el-menu-item index="/summary">功能描述</el-menu-item>
      <el-menu-item index="/doc">文档地址</el-menu-item>
      <el-menu-item index="/good-list">商品列表</el-menu-item>
    </el-submenu>
    <div class="fixed-text">
      <div>技术支持</div>
      <div>developer: parchments</div>
    </div>
  </el-menu>
</template>
<script>
export default {
  name: 'navMenu',
  methods: {
    handleSelect (key, keyPath) {
      //console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
.nav-menu {
  width: 200px;
  height: 100%;
  .fixed-text {
    position: absolute;
    left: 0;
    bottom: 80px;
    width: 100%;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
</style>
<style lang="css">
.el-submenu .el-menu {
  border: none;
  overflow: hidden;
}
</style>