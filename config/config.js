'use strict'
let config = {
	/*
	 * 后台返回状态码
	 * RET_CODE: 0代表失败  1代表成功
	 */
    RET_CODE: {
        SUCCESS_CODE: 1,//后台返回成功的状态码
        ERROR_CODE: 0,//后台返回失败的状态码
    },
    //分页设置
    paginationParams: {
        pageSize: 5,//每页的数量
        pageNo: 1,//当前页码
        size: 5,//当前页的数量
        total: 0, //总条数
        pages: 0,//总页码数
    }
}
export default config
