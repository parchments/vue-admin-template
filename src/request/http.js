/**
 * 封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../router/index'
import store from '../store/index'
import { Message } from 'element-ui'

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
let toLogin = () => {
    localStorage.removeItem('token')
    router.push({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}


// 创建axios实例
let instance = axios.create({
    timeout: 30000//请求超时时间
})

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        //设置统一请求头

        //token
        let phSessionToken = ''
        if (localStorage.getItem('token')) {
            phSessionToken = localStorage.token
        } else {
            phSessionToken = ''
        }
        //设置请求头
        config.headers = {
            'Content-Type': 'application/json',
            'phSessionToken': phSessionToken
        }
        return config
    },
    error => Promise.error(error)
)

/**
 * 请求失败后的错误统一处理
 * param {Number} status 请求失败的状态码
 */

//后台沟通状态码规范
let errorHandle = (status, other) => {
    //状态码判断
    switch (status) {
        //400: 客户端请求的语法错误，服务器无法理解
        case 400:
            console.log('400客户端请求的语法错误，服务器无法理解')
            break
        case 401:
            Message({ message: '登录过期，请重新登录', type: 'error' })
            setTimeout(() => {
                toLogin()//跳转到登录
            }, 3000)
            break
        //404请求不存在
        case 404:
            Message({ message: '请求的资源不存在', type: 'error' })
            break
        case 408:
            Message({ message: '网络延时，请稍后', type: 'error' })
            setTimeout(() => {
                toLogin()//跳转到登录
            }, 30000)
            break
        //500
        case 500:
            Message({ message: '网络异常，请重新登录', type: 'error' })
            setTimeout(() => {
                toLogin()//跳转到登录
            }, 30000)
            break
        default:
            console.log(other)
    }
}

//响应拦截器
instance.interceptors.response.use(
    //请求成功
    res => {
        if (res.status === 200) {
            //Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。
            return Promise.resolve(res)
        } else {
            console.log("响应拦截器失败")
            //Promise.reject(reason)方法返回一个带有拒绝原因reason参数的Promise对象。
            return Promise.reject(res)
        }
    },
    //请求失败
    error => {
        //return Promise.reject(error)
        const { response } = error
        if (response) {
            //请求已发出，但是不在2xx的范围    ------错误处理、token过期等
            errorHandle(response.status, response.data.message)
            return Promise.reject(response)
        } else {
            Message({
                message: '网络异常，即将前往登录页',
                type: 'error'
            })
            setTimeout(() => {
                //跳转到登录
                toLogin()
            }, 5000)
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            //store.commit('changeNetwork', false)
        }
    }
)

export default instance
