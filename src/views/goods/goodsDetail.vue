<template>
  <section>
    <div class="text-center mar-t-30">
      <div class="mar-b-30">
        <img v-if="code === 'XMSJ'" width="400px" src="@/assets/images/xmsj.jpg">
        <img v-if="code === 'HWSJ'" width="400px" src="@/assets/images/hwsj.png">
        <img v-if="code === 'HMSJ'" width="400px" src="@/assets/images/hmsj.jpg">
        <img v-if="code === 'RYSJ'" width="400px" src="@/assets/images/rysj.png">
      </div>
      <div class="mar-30" style="font-size: 30px">
        当前手机是：
        <span v-if="code === 'XMSJ'">小米手机</span>
        <span v-if="code === 'HWSJ'">华为手机</span>
        <span v-if="code === 'HMSJ'">红米手机</span>
        <span v-if="code === 'RYSJ'">荣耀手机</span>
      </div>
      <el-button type="default" @click="back" round>返回列表</el-button>
    </div>
  </section>
</template>

<script>

export default {
  name: 'goodsDetail',
  data () {
    return {
      code: this.$route.query.code
    }
  },
  methods: {
    //返回列表
    back () {
      this.$router.go(-1);
    }
  }
}
</script>
