<template>
  <section>
    <div class="error-wrapper">
      <img src="@/assets/images/404.png"
           alt="404"
           class="mar-b-25">
      <p class="mar-b-20">你的页面在沙漠里走丢了~</p>
      <p class="mar-b-25"><span style="font-size: 26px;">{{ time }}</span> 秒后将自动返回主页</p>
      <router-link to="/">
        <el-button type="primary"
                   round
                   style="background: #D39056; border-color: #D39056;">返回主页</el-button>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      time: 5
    }
  },
  created () {
    let timer = setInterval(() => {
      this.time--
      if (this.time === 1) {
        this.$router.push('/')
        clearInterval(timer)
      }
    }, 1000)
  }
}
</script>
<style lang="less" scoped>
.error-wrapper {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 70px 0 100px;
  text-align: center;
  background: #fff;
  font-size: 20px;
  color: #fff;
  p {
    color: #c67219;
  }
}
</style>
