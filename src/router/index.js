import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * 官方 component: () => import('../views/login/Login')
 * webpack懒加载  component: r => require.ensure([], () => r(require('../views/login/Login')), 'Login'),
 * import加载所有 import Login from '../views/login/Login'
 */

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login/Login'),
        meta: {
            keepAlive: false,
            title: '登录'
        }
    },
    {
        path: '*',//输错路由前往404
        redirect: '/404',
        meta: {
            keepAlive: false,
            title: '404'
        }
    },
    {
        path: '/404',
        name: 'notFound',
        component: () => import('../views/error/NotFound'),
        meta: {
            keepAlive: false,
            title: '404'
        }
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/summary',
        component: () => import('../views/home/Index'),
        meta: {
            keepAlive: false,
            title: '首页'
        },
        children: [
            {
                path: '/summary',
                name: 'summary',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('../views/Summary'),
                meta: {//缓存、路由元信息、元字段
                    keepAlive: false,
                    title: '概述',
                    //requiresAuth: true
                }
            },
            {
                path: '/doc',
                name: 'doc',
                component: () => import('../views/Doc'),
                meta: {
                    keepAlive: false,
                    title: '文档'
                }
            },
            {
                path: '/good-list',
                name: 'goodList',
                component: () => import('../views/good-list/GoodList'),
                meta: {
                    keepAlive: false,
                    title: '商品列表'
                },
                children: []
            },
            {
                path: '/good-list/good-detail',
                name: 'goodDetail',
                component: () => import('../views/good-list/GoodDetail'),
                meta: {
                    keepAlive: false,
                    title: '商品详情',
                    parentPath: '/good-list',
                    parentTitle: '商品列表'
                }
            }
        ]
    }
]

const router = new VueRouter({
    // 	mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router
