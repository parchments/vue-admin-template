import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "*", //输错路由回首页
        redirect: "/404",
        hidden: true,
        meta: {
			title: "输错路由回首页",
            keepAlive: false,
            level: 0 //判断是否缓存 0为不缓存 1为缓存 2为详情页
        }
    },
    {
        path: "/", //默认路由
        redirect: "/login",
        hidden: true,
        meta: {
			title: "默认路由",
            keepAlive: false,
            level: 0
        }
    },
    //登录
    {
        path: "/login",
        name: "login",
        component: r => require.ensure([], () => r(require("../views/login/Login.vue")), "Login"),
        hidden: true,
        meta: {
			title: "登录",
            keepAlive: false,
            level: 0
        }
    },
    //404
    {
        path: "/404",
        name: "notFound",
        component: r => require.ensure([], () => r(require("../views/error/NotFound.vue")), "NotFound"),
        hidden: true,
        meta: {
			title: "404",
            keepAlive: false,
            level: 0
        }
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        redirect: '/summarys/index',
        hidden: true,
        meta: {
			title: "首页",
            keepAlive: false,
            level: 0
        }
    },
    {
        path: "/home",
        component: Home,
        iconCls: "fa el-icon-s-data",
		hidden: false,
		meta: {
			title: "框架简介",
            keepAlive: false,
            level: 0
		},
        children: [
            {
                path: "/summarys/index",
                component: () => import("../views/summarys/index.vue"),
                name: "summarys",
				hidden: false,
                meta: {
					title: "框架简介",
					keepAlive: false,
					level: 0
                }
            }
        ]
    },
    {
        path: "/home",
        component: Home,
        iconCls: "fa el-icon-s-data",
		hidden: false,
		meta: {
			title: "列表详情",
            keepAlive: false,
            level: 0
		},
        children: [
			{
				path: "/goods/goodsList",
				component: () => import("../views/goods/goodsList.vue"),
				name: "goodsList",
				hidden: false,
				meta: {
					title: "列表",
					keepAlive: false,
					level: 0
				}
			},
			{
				path: "/goods/goodsList/goodsDetail",
				component: () => import("../views/goods/goodsDetail.vue"),
				name: "goodsDetail",
				hidden: true,
				meta: {
					title: "详情",
					parentPath: "/goods/goodsList",
					parentTitle: "商品列表",
					keepAlive: false,
					level: 0
				}
			}
        ]
    },
    {
        path: "/home",
        component: Home,
        iconCls: "fa el-icon-s-data",
		hidden: false,
		meta: {
			title: "上传导入",
            keepAlive: false,
            level: 0
		},
        children: [
            {
                path: "/upload/index",
                component: () => import("../views/upload/index.vue"),
                name: "upload",
				hidden: false,
                meta: {
					title: "自定义上传导入",
					keepAlive: false,
					level: 0
                }
            }
        ]
    },
    {
        path: "/home",
        component: Home,
        iconCls: "fa el-icon-s-data",
		hidden: false,
		meta: {
			title: "表单校验",
            keepAlive: false,
            level: 0
		},
        children: [
            {
                path: "/formValidation/index",
                component: () => import("../views/formValidation/index.vue"),
                name: "formValidation",
				hidden: false,
                meta: {
					title: "校验动态下拉",
					keepAlive: false,
					level: 0
                }
            }
        ]
    },
]

const router = new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    routes
});

//全局路由守卫、路由拦截
// router.beforeEach((to, from, next) => {
//     const isLogin = localStorage.token ? true : false;
//     if (to.path === "/login" || to.path === "/forgotPassword") {
//         next();
//     } else {
//         isLogin ? next() : next("/");
//     }
// });

export default router;
