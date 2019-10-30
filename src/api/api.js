/**
 * 所有模块接口列表
 */
import axios from '../request/http' // 导入http中创建的axios实例

//设置接口地址
axios.defaults.baseURL = process.env.VUE_APP_BASEURL

//系统模快
const systemModule = {
    //登录
    login (params) {
        return axios.post(`login`, params)
    }
}

//质检模块
const qualityControl = {
    //商品管理
    goodsManage: {
        //列表、查询
        getList (params) {
            return axios.post(`/goodList`, params)
        }
    }
}

//导出接口
export default {
    systemModule,
    qualityControl
}
