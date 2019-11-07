const webpack = require("webpack");
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

let env = process.env.NODE_ENV;
module.exports = {
	// 如果是hash模式
	publicPath: env !== "development" ? "./" : "/",
	
	// 如果是history模式
	// publicPath: env !== "development" ? "/" : "/",

	// 静态资源目录 (js, css, img, fonts)
	assetsDir: "assets",

	//关键点在这  原来的 Compiler 换成了 runtimeCompiler
	runtimeCompiler: true,

	//设置打包之后是否打包.map文件
	productionSourceMap: env !== "development" ? false : true,

	// 输出文件目录
	outputDir: "dist",
	// 让样式找到源
	css: {
		sourceMap: true
	},
	devServer: {
		port: 8083,
		host: "0.0.0.0",
		hot: true,
		open: false,
		disableHostCheck: true,
		proxy: {
			"/api": {
				target: "127.0.0.1", //对应跨域的接口
				changeOrigin: true,
				ws: false,
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	},

	chainWebpack: config => {
		config.resolve.alias.set("@", path.resolve(__dirname, "./src"));
	},

	configureWebpack: config => {
		if (env !== "development") {
			// 配置打包 压缩js
			config.plugins.push(
				new CompressionWebpackPlugin({
					algorithm: "gzip",
					test: /\.js$|\.html$|.\css/, //匹配文件名
					threshold: 10240, //对超过10k的数据压缩
					deleteOriginalAssets: false, //不删除源文件
					minRatio: 0.8
				})
			);
		}
	}
};