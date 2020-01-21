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
        return axios.post("login", params)
    },
    //商品管理
    goodsManage: {
        //列表新增
        add (params) {
            return axios.post("add", params)
        },
        edit (params) {
            return axios.post("edit", params)
        },
        //列表、查询
        getList (params) {
            return axios.post("goodList", params)
        },
        //通过id获取数据
        getDataById (params) {
            return axios.post("getDataById", params)
        },
        //批量删除
        getDataById (params) {
            return axios.post("batchEdit", params)
        }
    },
	//上传图片、文件pdf、word、excel（如果一个接口能支持）
    uploadFile(params, config) {
        return axios.post('uploadFile', params, config)
    },
    //上传（excel）
    batchImport(params, config) {
        return axios.post('batchImport', params, config)
    },
	//获取下拉仓库
	getStorehouseName(params) {
		return axios.post("getStorehouseName", params)
	}
}
//导出接口
export default {
    systemModule
}
