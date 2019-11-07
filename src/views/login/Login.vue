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
        <!-- </el-tab-pane> -->
        <!--<el-tab-pane label="短信验证登录" name="second">
					    	<el-form v-model="codeForm" class="mar-t-30">
					    		<div class="mar-b-30 form-item">
					    			<label class="icon-box"><i class="iconfont icon-f-mobile"></i></label>
									<el-input v-model="codeForm.mobile" placeholder="手机号" clearable></el-input>
					    		</div>
					    		<div class="mar-b-30 form-item form-item-code">
					    			<label class="icon-box"><i class="iconfont icon-f-code"></i></label>
									<el-input v-model="codeForm.code" placeholder="验证码" clearable></el-input>
									<el-button type="button"
										v-model="codeText"
										@click="sendCode()"
										class="link-box code"
										:disabled="isDisabledCode"
										:class="{ disabled : isDisabledCode }"
										style="width: 130px; font-size: 14px;"
										>
										{{ codeText }}
									</el-button>
					    		</div>
								<div class="mar-b-15">
									<router-link to="/index" tag="div">
										<el-button @click="codeLoginHandle()" :loading="codeLoadingBtn" type="warning" round>登录</el-button>
									</router-link>
								</div>
							</el-form>
            </el-tab-pane>-->
      </el-tabs>
    </div>
    <!--首次登录系统需要修改密码-->
    <section v-if="editPasswordWrapper"
             class="form-wrapper">
      <div class="form-container"
           style="width: 390px;">
        <!--首次登录系统需要修改密码-->
        <div class="mar-t-30">
          <el-form :model="editPasswordForm"
                   ref="editPasswordForm"
                   :rules="editPasswordRules"
                   label-width="110px"
                   label-position="left">
            <el-form-item label="设置登录密码"
                          prop="editPassword">
              <el-input v-model="editPasswordForm.editPassword"
                        type="password"
                        placeholder="请输入登录密码"></el-input>
            </el-form-item>
            <el-form-item label="确认登录密码"
                          prop="editPassword2">
              <el-input @keyup.enter.native="submitEditPasswordForm('editPasswordForm')"
                        v-model="editPasswordForm.editPassword2"
                        type="password"
                        placeholder="请确认登录密码"></el-input>
            </el-form-item>
          </el-form>
          <div class="text-center mar-t-25 mar-b-20">
            <el-button type="warning"
                       @click="submitEditPasswordForm('editPasswordForm')"
                       :loading="editLoadingBtn"
                       style="width: 100%;">登录</el-button>
          </div>
        </div>
      </div>
    </section>
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
      },
      isDisabledCode: false, //发送验证码是否可点击
      time: 0, //验证码倒计时时间
      loadingBtn: false, //登录按钮loading
      codeText: "获取验证码", //验证码文字
      codeForm: {
        //验证码表单
        mobile: "",
        code: ""
      },
      //编辑密码弹窗
      editLoadingBtn: false, //修改密码按钮
      editPasswordWrapper: false,
      //编辑密码弹窗表单
      editPasswordForm: {
        editPassword: "",
        editPassword2: ""
      },
      //验证编辑密码弹窗表单
      editPasswordRules: {
        editPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        editPassword2: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
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
    //切换登录方式
    tabHandle (tab, event) {
      console.log(tab, event)
    },
    //账号密码登录
    accountLoginHandle () {
      //登录成功
      this.$message({
        type: "success",
        message: '登录成功'
      })
      //跳转到首页
      this.$router.push("/home")
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
          localStorage.removeItem("userInfo")
        }
        //请求登录参数
        let params = {
          account: this.accountForm.account, //账号
          password: this.accountForm.password, //密码
          ssxt: this.SSXT, //系统名称
          type: 1 //1为管理员   2为会员
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
    },
    //通过登录id获取权限菜单
    queryUserAllInfo (params) {
      this.$api.systemModule.queryUserAllInfo(params)
        .then(res => {
          if (res.data.retcode === this.SUCCESS_CODE) {
            let data = res.data.data
            //存在localStorage
            localStorage.setItem("functions", JSON.stringify(data.functions))
            //登录成功
            this.$message({
              type: "success",
              message: '登录成功'
            })
            this.accountLoadingBtn = false
            //跳转到首页
            this.$router.push("/manage/dashboard")
            if (data.functions.length === 0) {
              setTimeout(() => {
                this.$message({
                  type: "error",
                  message: '请联系管理员配置本账号权限'
                })
              }, 2000)
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取验证码
    sendCode () {
      this.time = 5 //设置倒计时时长
      const mobile = this.codeForm.mobile
      //验证后发送请求
      if (mobile) {
        let reg = /^1[3456789]\d{9}$/
        if (reg.test(mobile)) {
          //请求验证码接口
          this.$api.systemModule
            .sendCode(mobile, 2) //用途 1注册2找回密码3登录
            .then(res => {
              if (res.data.retcode === this.SUCCESS_CODE) {
                console.log(res.data)
                this.$message({
                  type: "success",
                  message: res.data.retmsg
                })
                this.timer()
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err.data.retmsg
              })
            })
        } else {
          this.$message({
            type: "error",
            message: "请输入有效的手机号码"
          })
        }
      } else {
        this.$message({
          type: "error",
          message: "手机号不能为空"
        })
      }
    },
    //倒计时
    timer () {
      if (this.time > 1) {
        this.time--
        this.isDisabledCode = true
        this.codeText = this.time + "s后重新获取"
        setTimeout(this.timer, 1000)
      } else {
        this.isDisabledCode = false
        this.time = 0
        this.codeText = "重新获取验证码"
      }
    },
    //短信验证登录
    codeLoginHandle () {
      //验证账号密码
      if (this.codeForm.mobile === "" || this.codeForm.code === "") {
        this.$message({
          type: "error",
          message: "手机号或者验证码不能为空"
        })
        return false
      } else {
        //请求登录参数
        let params = {
          account: this.codeForm.account, //手机号
          code: this.codeForm.code //验证码
        }
        this.successFunc(params, this.codeLoadingBtn)//执行验证通过函数
      }
    },
    //确定修改密码
    submitEditPasswordForm (formName) {
      //后台要求传的参数
      let params = {
        account: this.accountForm.account, //账号
        pwd: this.editPasswordForm.editPassword, //密码
        rePwd: this.editPasswordForm.editPassword2 //再次密码
      }
      this.editLoadingBtn = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          //请求修改密码接口
          this.$api.systemModule.changePassword(params)
            .then(res => {
              if (res.data.retcode === this.SUCCESS_CODE) {
                this.editLoadingBtn = false
                this.$message({
                  type: "success",
                  message: res.data.retmsg
                })
                this.accountForm.password = this.editPasswordForm.editPassword2
                //显示用账号密码登录
                this.editPasswordWrapper = false
              } else {
                this.editLoadingBtn = false
                this.editPasswordForm = {
                  editPassword: "",
                  editPassword2: ""
                }
                this.$message({
                  type: "error",
                  message: res.data.retmsg
                })
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: res.data.retmsg,
                type: "error"
              })
            })
        } else {
          this.editLoadingBtn = false
          return false
        }
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
