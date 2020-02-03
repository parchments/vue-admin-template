<template>
  <section class="layout-container">
    <admin-header></admin-header>
    <section class="layout-container">
      <el-aside class="aside">
        <el-menu :default-active="$route.fullPath"
        		 :unique-opened="true"
        		 router
        		 element-loading-text="拼命加载中"
        		 element-loading-spinner="el-icon-loading"
        		 element-loading-background="#304156">
          <!-- $router.options.routes到时候可以从后台动态获取菜单 -->
          <template v-for="(item, index) in $router.options.routes">
        	<template>
        	  <el-submenu v-if="item.children && !item.hidden" :key="index" :index="index + ''">
        		<template slot="title">{{ item.meta.title }}</template>
        		<div v-for="(child, index) in item.children" :index="child.path" :key="child.path">
        		  <template v-if="child.children">
        			<el-submenu :index="index + ''">
        			  <template slot="title">{{ child.meta.title }}</template>
        			  <el-menu-item v-for="grandson in child.children" :index="`${grandson.path}`" :key="grandson.path">{{ grandson.meta.title }}</el-menu-item>
        			</el-submenu>
        		  </template>
        		  <el-menu-item :index="`${child.path}`" :key="child.path" v-if="!child.children && !child.hidden">{{ child.meta.title }}</el-menu-item>
        		</div>
        	  </el-submenu>
        	  <el-menu-item v-if="!item.children && !item.hidden" :key="index" :index="item.path">{{ item.meta.title }}</el-menu-item>
        	</template>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="main-container">
        <div class="pad-t-10 pad-b-30 pad-l-10">
			<!-- 面包屑可抽成一个组件 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in levelList" :key="item.path" class="el-breadcrumb__inner">
              <router-link v-if="item.meta.parentPath" :to="item.meta.parentPath" class="set-hover-color">
                {{item.meta.parentTitle}}
                <i class="el-icon-arrow-right" style="margin: 0 6px;color: #C0C4CC;"></i>
              </router-link>
              <span else :to="item.path">{{item.meta.title}}</span>
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
    // console.log('路由', this.$router.options.routes)
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
        return item.path !== '/home'
      })
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