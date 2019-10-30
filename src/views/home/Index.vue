<template>
  <section class="layout-container">
    <admin-header></admin-header>
    <section class="layout-container">
      <el-aside class="aside">
        <nav-menu></nav-menu>
      </el-aside>
      <el-main class="main-container">
        <div class="pad-t-10 pad-b-30 pad-l-10">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in levelList"
                                :key="item.path"
                                class="el-breadcrumb__inner">
              <router-link v-if="item.meta.parentPath"
                           :to="item.meta.parentPath"
                           class="set-hover-color">
                {{item.meta.parentTitle}}
                <i class="el-icon-arrow-right"
                   style="margin: 0 6px;color: #C0C4CC;"></i>
              </router-link>
              <router-link else
                           :to="item.path">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
      </el-main>
    </section>
  </section>
</template>

<script>
import AdminHeader from '@/components/AdminHeader'
import NavMenu from '@/components/NavMenu'
export default {
  name: 'home',
  data () {
    return {
      levelList: null//路由列表
    }
  },
  created () {
    console.log('路由', this.$route)
  },
  watch: {
    $route (to, from) {
      this.getBreadcrumb()
    }
  },
  mounted () {
    this.getBreadcrumb()
  },
  methods: {
    /**
     * 生成面包屑的方法
     */
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => {
        //console.log(item)
        return item.name !== 'home'
      })
      console.log('过滤', matched)
      const first = matched[0]
      this.levelList = matched
    }
  },
  components: {
    'admin-header': AdminHeader,
    'nav-menu': NavMenu
  }
}

</script>
<style lang="less" scoped>
.layout-container {
  position: relative;
  height: 100%;
}
.aside {
  width: 200px !important;
  position: fixed;
  top: 60px;
  height: 100%;
  z-index: 99;
}
.main-container {
  padding-top: 80px;
  margin-left: 200px;
  min-width: 1300px;
  height: 100%;
}
.set-hover-color {
  font-weight: 700 !important;
  cursor: pointer !important;
  &:hover {
    color: #409eff !important;
  }
}
.slide-fade-enter-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-active {
  transition: all 0s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>