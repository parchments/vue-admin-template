import 'babel-polyfill' //ie空白
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Config from '../config/config' //后台返回状态码
import * as filters from './filter/filters' //全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css' //基础样式

import Api from './api/api' //导入api接口
import Axios from './request/http' //导入axios请求
Vue.use(ElementUI)

Vue.prototype.$api = Api //在vue上挂载api
Vue.prototype.$axios = Axios
Vue.prototype.$config = Config //配置信息
console.log('NODE_ENV:', process.env.NODE_ENV)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
