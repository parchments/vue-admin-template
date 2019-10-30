<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 不被缓存的视图组件 -->
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="css" scoped>
#app {
  height: 100%;
}
</style>