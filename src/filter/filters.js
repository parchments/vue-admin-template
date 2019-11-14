import moment from "moment" // 导入格式化时间的模块

//格式化时间
let formatDate = (dateStr, formatStr = "YYYY-MM-DD HH:mm:ss") => {
	return moment(dateStr).format(formatStr)
}
	
export { formatDate }