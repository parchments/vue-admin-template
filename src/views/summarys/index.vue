<template>
  <div style="text-align: center; margin-top: 30px">
    <h1 style="font-size: 30px">基础模板概述</h1>
    <table>
      <tbody>
        <tr>
          <td>作者</td>
          <td>parchments</td>
        </tr>
        <tr>
          <td>模板版本</td>
          <td>1.0.0.191027_beta</td>
        </tr>
        <tr>
          <td>vue版本</td>
          <td>vue2</td>
        </tr>
        <tr>
          <td>脚手架</td>
          <td>vue-cli4</td>
        </tr>
        <tr>
          <td>状态管理器</td>
          <td>vuex</td>
        </tr>
        <tr>
          <td>UI框架</td>
          <td>element-ui</td>
        </tr>
        <tr>
          <td>路由</td>
          <td>vue-router</td>
        </tr>
        <tr>
          <td>HTTP请求</td>
          <td>axios</td>
        </tr>
        <tr>
          <td>接口</td>
          <td>api.js</td>
        </tr>
        <tr>
          <td>环境</td>
          <td>dev test uat prod</td>
        </tr>
        <tr>
          <td>本地存储</td>
          <td>localStorage</td>
        </tr>
        <tr>
          <td>登录</td>
          <td>login</td>
        </tr>
        <tr>
          <td>动态面包屑</td>
          <td>breadcrumb</td>
        </tr>
        <tr>
          <td>列表展示</td>
          <td>搜索、弹窗、分页</td>
        </tr>
        <tr>
          <td>详情展示</td>
          <td>路由传参</td>
        </tr>
        <tr>
          <td>路由错误</td>
          <td>404</td>
        </tr>
        <tr>
          <td>兼容性</td>
          <td>ie9及以上</td>
        </tr>
        <tr>
          <td>时间格式化</td>
          <td>moment</td>
        </tr>
        <tr>
          <td>css</td>
          <td>Less</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
	export default {
	  name: 'summarys'
	}
</script>
<style lang="less" scoped>
table {
  margin: 0 auto;
  font-size: 20px;
}
tr td:first-child {
  text-align: right;
}
tr td:last-child {
  padding-left: 20px;
  text-align: left;
}
</style>
