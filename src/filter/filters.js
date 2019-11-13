import moment from "moment" // 导入格式化时间的模块

// 定义全局的时间过滤器
// Vue.filter("dateFormat", function (dateStr, formatStr = "YYYY-MM-DD HH:mm:ss") {
// 	// 在过滤器的处理函数中，最后，必须 return才是一个合法的过滤器
// 	return moment(dateStr).format(formatStr)
// })
let formatDate = (dateStr, formatStr = "YYYY-MM-DD HH:mm:ss") => {
	return moment(dateStr).format(formatStr)
}
	
export { formatDate }