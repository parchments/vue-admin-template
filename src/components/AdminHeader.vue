<template>
  <section class="header">
    <div class="logo">
      <img src="@/assets/images/logo.png"
           alt="">
      <span>vue-admin-template</span>
    </div>
    <div class="nav-button">
	  <a href="https://github.com/parchments/vue-admin-template" target="_blank" style="color: #fff;" class="pad-10">
		  <i class="el-icon-star-off"></i> gitHub
	  </a>
      <span @click="logout"
            class="pad-10">
        <i class="el-icon-switch-button"></i> 退出
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'adminHeader',
  methods: {
    //退出登录
    logout () {
      //定义token退出值
      localStorage.removeItem("token") //清除token
      this.$router.push("/")
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #202c3a;
  color: #fff;
  .logo {
    display: inline-block;
    vertical-align: middle;
    img {
      width: 30px;
      vertical-align: inherit;
    }
  }
  .nav-button {
    float: right;
    span {
      cursor: pointer;
    }
  }
}
</style>