<template>
  <section class="wrapper">
    <canvas id="canvas"></canvas>
    <div class="login-wrapper">
      <div class="text-center">
        <img src="@/assets/images/logo.png"
             alt=""
             width="100px">
      </div>
      <el-tabs v-model="activeName"
               @tab-click="tabHandle()">
        <!-- <el-tab-pane label="账号密码登录"
                     name="first"> -->
        <el-form v-model="accountForm"
                 class="mar-t-30">
          <div class="mar-b-30 form-item">
            <label class="icon-box">
              <i class="iconfont icon-f-user"></i>
            </label>
            <el-input v-model="accountForm.account"
                      placeholder="输入账号"
                      clearable></el-input>
          </div>
          <div class="mar-b-30 form-item form-item-code">
            <label class="icon-box">
              <i class="iconfont icon-f-password"></i>
            </label>
            <el-input v-model="accountForm.password"
                      type="password"
                      @keyup.enter.native="accountLoginHandle"
                      placeholder="密码"
                      clearable></el-input>
            <router-link to="/forgotPassword"
                         style="display: none">忘记密码</router-link>
          </div>
          <div class="mar-b-15 text-center">
            <el-button @click="accountLoginHandle()"
                       :loading="accountLoadingBtn"
                       type="primary"
                       style="width: 100%">登录</el-button>
          </div>
        </el-form>
      </el-tabs>
    </div>
  </section>
</template>

<script>
export default {
  name: "login",
  data () {
    //验证新密码
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"))
      } else if (value.length < 6) {
        callback(new Error("请输入6-20位密码"))
      } else {
        if (this.editPasswordForm.editPassword2 !== "") {
          this.$refs.editPasswordForm.validateField("editPassword2")
        }
        callback()
      }
    }
    //验证再次输入密码
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("再次输入密码不能为空"))
      } else if (value.length < 6) {
        callback(new Error("请输入6-20位密码"))
      } else if (value !== this.editPasswordForm.editPassword) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      SUCCESS_CODE: 1, //请求成功的值
      SSXT: "ssxt", //系统名称
      activeName: "first", //默认tab显示index
      userName: "", //账号
      userPassword: "", //密码
      accountLoadingBtn: false, //账号密码登录按钮loading
      codeLoadingBtn: false, //短信验证按钮loading
      accountForm: {
        //账号表单
        account: "admin",
        password: "111111"
      }
    }
  },
  mounted() {
	var canvas = document.getElementById('canvas')
	var context = canvas.getContext('2d')
	var W = window.innerWidth
	var H = window.innerHeight
	canvas.width = W
	canvas.height = H
	var fontSize = 18
	var colunms = Math.floor(W/fontSize)
	var drops = []
	for(var i = 0; i<colunms; i++){
		drops.push(0)
	}
	var str = 'javascript html5 canvas'
	
	// function draw(canvas,context,W,H,fontSize,colunms,str,drops){
		
	// }
	// function randColor (){
	// 	var r = Math.floor(Math.random() * 256)
	// 	var g = Math.floor(Math.random() * 256)
	// 	var b = Math.floor(Math.random() * 256)
	// 	return "rgb(" + r + "," + g + "," + b + ")"
	// }
	// draw()
	setInterval(()=>{
		context.fillStyle = 'rgba(0,0,0,0.05)'
		context.fillRect(0,0,W,H)
		context.font = '0' + fontSize + 'px 微软雅黑'
		context.fillStyle = '#00cc33'
		for(var i = 0; i<colunms; i++){
			var index = Math.floor(Math.random() * str.length)
			var x = i * fontSize
			var y = drops[i] * fontSize
			context.fillText(str[index],x,y)
			if(y >= canvas.height && Math.random() > 0.99){
				drops[i] = 0
			}else{
				drops[i]++
			}
		}
	},30)
  },
  created () {
    //针对点击浏览器的回退按钮时，若回退到的当前页面是登录页面，则清空localStorage的数据
    //window.location.href.indexOf('login') !=-1
    if (this.$route.path === '/login') {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('functions')
    }
  },
  methods: {
    //账号密码登录
    accountLoginHandle () {
      //登录成功
      this.$message({
        type: "success",
        message: '登录成功'
      })
      //跳转到首页
      this.$router.push("/summarys/index")
      return false
	  
	  
      //验证账号密码
      if (this.accountForm.account === "" || this.accountForm.password === "") {
        this.$message({
          type: "error",
          message: "账号或者密码不能为空"
        })
        return false
      } else {
        //如果本地有token，则先清除token再登录
        if (localStorage.token) {
          localStorage.removeItem("token")
        }
        //请求登录参数
        let params = {
          account: this.accountForm.account, //账号
          password: this.accountForm.password, //密码
        }
        this.successFunc(params) //执行验证通过函数
      }
    },
    //验证通过函数
    successFunc (params) {
      this.accountLoadingBtn = true //账号登录按钮loading
      //请求登录接口
      this.$api.systemModule.login(params)
        .then(res => {
          if (res.data.retcode === this.SUCCESS_CODE) {
            const token = res.data.data.phSessionToken //获取token
            localStorage.setItem("token", token) //把token存储到localStorage
            let params = {
              phSessionToken: token
            }
            //校验
            this.$api.systemModule.userValidator(params)
              .then(res => {
                if (res.data.retcode === this.SUCCESS_CODE) {
                  let data = res.data.data
                  //如果他是为空的话，传给vuex store就是为假，反之则为真，所以为空的时候就取反
                  this.$store.dispatch("commitToken", token)
                  //存在localStorage
                  localStorage.setItem("userInfo", JSON.stringify(data))
                  let params = {
                    phSessionToken: token
                  }
                  this.queryUserAllInfo(params)
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else if (res.data.retcode === 201) {
            this.accountLoadingBtn = false
            this.$message({
              type: "error",
              message: res.data.retmsg
            })
            //如果首次登录系统，重置密码
            this.editPasswordWrapper = true
          } else {
            this.$message({
              type: "error",
              message: res.data.retmsg
            })
            this.accountLoadingBtn = false //账号登录按钮loading
          }
        })
        .catch(err => {
          console.log(err)
          this.accountLoadingBtn = false //账号登录按钮loading
        })
    }
  }
}
</script>
<style scoped>
#canvas{
	background: #111;
	z-index: 1;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
.wrapper {
  min-height: 100%;
  width: 100%;
  background-color: #e9e9e9;
  overflow: hidden;
}
.login-wrapper {
  position: relative;
  width: 400px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
  z-index: 2;
}
.form-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
}
.form-container {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  padding: 10px 30px 20px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-sizing: border-box;
}
</style>
