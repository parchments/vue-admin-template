(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e53b89ee"],{"01b0":function(t,e,s){"use strict";var a=s("2f01"),o=s.n(a);o.a},"2f01":function(t,e,s){},"9d64":function(t,e,s){t.exports=s.p+"assets/img/logo.82b9c7a5.png"},ede4:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"wrapper"},[s("canvas",{attrs:{id:"canvas"}}),s("div",{staticClass:"login-wrapper"},[t._m(0),s("el-tabs",{on:{"tab-click":function(e){return t.tabHandle()}},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[s("el-form",{staticClass:"mar-t-30",model:{value:t.accountForm,callback:function(e){t.accountForm=e},expression:"accountForm"}},[s("div",{staticClass:"mar-b-30 form-item"},[s("label",{staticClass:"icon-box"},[s("i",{staticClass:"iconfont icon-f-user"})]),s("el-input",{attrs:{placeholder:"输入账号",clearable:""},model:{value:t.accountForm.account,callback:function(e){t.$set(t.accountForm,"account",e)},expression:"accountForm.account"}})],1),s("div",{staticClass:"mar-b-30 form-item form-item-code"},[s("label",{staticClass:"icon-box"},[s("i",{staticClass:"iconfont icon-f-password"})]),s("el-input",{attrs:{type:"password",placeholder:"密码",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.accountLoginHandle(e)}},model:{value:t.accountForm.password,callback:function(e){t.$set(t.accountForm,"password",e)},expression:"accountForm.password"}}),s("router-link",{staticStyle:{display:"none"},attrs:{to:"/forgotPassword"}},[t._v("忘记密码")])],1),s("div",{staticClass:"mar-b-15 text-center"},[s("el-button",{staticStyle:{width:"100%"},attrs:{loading:t.accountLoadingBtn,type:"primary"},on:{click:function(e){return t.accountLoginHandle()}}},[t._v("登录")])],1)])],1)],1),t.editPasswordWrapper?s("section",{staticClass:"form-wrapper"},[s("div",{staticClass:"form-container",staticStyle:{width:"390px"}},[s("div",{staticClass:"mar-t-30"},[s("el-form",{ref:"editPasswordForm",attrs:{model:t.editPasswordForm,rules:t.editPasswordRules,"label-width":"110px","label-position":"left"}},[s("el-form-item",{attrs:{label:"设置登录密码",prop:"editPassword"}},[s("el-input",{attrs:{type:"password",placeholder:"请输入登录密码"},model:{value:t.editPasswordForm.editPassword,callback:function(e){t.$set(t.editPasswordForm,"editPassword",e)},expression:"editPasswordForm.editPassword"}})],1),s("el-form-item",{attrs:{label:"确认登录密码",prop:"editPassword2"}},[s("el-input",{attrs:{type:"password",placeholder:"请确认登录密码"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitEditPasswordForm("editPasswordForm")}},model:{value:t.editPasswordForm.editPassword2,callback:function(e){t.$set(t.editPasswordForm,"editPassword2",e)},expression:"editPasswordForm.editPassword2"}})],1)],1),s("div",{staticClass:"text-center mar-t-25 mar-b-20"},[s("el-button",{staticStyle:{width:"100%"},attrs:{type:"warning",loading:t.editLoadingBtn},on:{click:function(e){return t.submitEditPasswordForm("editPasswordForm")}}},[t._v("登录")])],1)],1)])]):t._e()])},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-center"},[a("img",{attrs:{src:s("9d64"),alt:"",width:"100px"}})])}],r={name:"login",data:function(){var t=this,e=function(e,s,a){""===s?a(new Error("密码不能为空")):s.length<6?a(new Error("请输入6-20位密码")):(""!==t.editPasswordForm.editPassword2&&t.$refs.editPasswordForm.validateField("editPassword2"),a())},s=function(e,s,a){""===s?a(new Error("再次输入密码不能为空")):s.length<6?a(new Error("请输入6-20位密码")):s!==t.editPasswordForm.editPassword?a(new Error("两次输入密码不一致!")):a()};return{SUCCESS_CODE:1,SSXT:"ssxt",activeName:"first",userName:"",userPassword:"",accountLoadingBtn:!1,codeLoadingBtn:!1,accountForm:{account:"admin",password:"111111"},isDisabledCode:!1,time:0,loadingBtn:!1,codeText:"获取验证码",codeForm:{mobile:"",code:""},editLoadingBtn:!1,editPasswordWrapper:!1,editPasswordForm:{editPassword:"",editPassword2:""},editPasswordRules:{editPassword:[{required:!0,validator:e,trigger:"blur"}],editPassword2:[{required:!0,validator:s,trigger:"blur"}]}}},mounted:function(){var t=document.getElementById("canvas"),e=t.getContext("2d"),s=window.innerWidth,a=window.innerHeight;t.width=s,t.height=a;for(var o=18,r=Math.floor(s/o),i=[],n=0;n<r;n++)i.push(0);var d="javascript html5 canvas";setInterval((function(){e.fillStyle="rgba(0,0,0,0.05)",e.fillRect(0,0,s,a),e.font="0"+o+"px 微软雅黑",e.fillStyle="#00cc33";for(var n=0;n<r;n++){var c=Math.floor(Math.random()*d.length),l=n*o,m=i[n]*o;e.fillText(d[c],l,m),m>=t.height&&Math.random()>.99?i[n]=0:i[n]++}}),30)},created:function(){"/login"===this.$route.path&&(localStorage.removeItem("token"),localStorage.removeItem("userInfo"),localStorage.removeItem("functions"))},methods:{tabHandle:function(t,e){console.log(t,e)},accountLoginHandle:function(){return this.$message({type:"success",message:"登录成功"}),this.$router.push("/home"),!1},successFunc:function(t){var e=this;this.accountLoadingBtn=!0,this.$api.systemModule.login(t).then((function(t){if(t.data.retcode===e.SUCCESS_CODE){var s=t.data.data.phSessionToken;localStorage.setItem("token",s);var a={phSessionToken:s};e.$api.systemModule.userValidator(a).then((function(t){if(t.data.retcode===e.SUCCESS_CODE){var a=t.data.data;e.$store.dispatch("commitToken",s),localStorage.setItem("userInfo",JSON.stringify(a));var o={phSessionToken:s};e.queryUserAllInfo(o)}})).catch((function(t){console.log(t)}))}else 201===t.data.retcode?(e.accountLoadingBtn=!1,e.$message({type:"error",message:t.data.retmsg}),e.editPasswordWrapper=!0):(e.$message({type:"error",message:t.data.retmsg}),e.accountLoadingBtn=!1)})).catch((function(t){console.log(t),e.accountLoadingBtn=!1}))},queryUserAllInfo:function(t){var e=this;this.$api.systemModule.queryUserAllInfo(t).then((function(t){if(t.data.retcode===e.SUCCESS_CODE){var s=t.data.data;localStorage.setItem("functions",JSON.stringify(s.functions)),e.$message({type:"success",message:"登录成功"}),e.accountLoadingBtn=!1,e.$router.push("/manage/dashboard"),0===s.functions.length&&setTimeout((function(){e.$message({type:"error",message:"请联系管理员配置本账号权限"})}),2e3)}})).catch((function(t){console.log(t)}))},sendCode:function(){var t=this;this.time=5;var e=this.codeForm.mobile;if(e){var s=/^1[3456789]\d{9}$/;s.test(e)?this.$api.systemModule.sendCode(e,2).then((function(e){e.data.retcode===t.SUCCESS_CODE&&(console.log(e.data),t.$message({type:"success",message:e.data.retmsg}),t.timer())})).catch((function(e){t.$message({type:"error",message:e.data.retmsg})})):this.$message({type:"error",message:"请输入有效的手机号码"})}else this.$message({type:"error",message:"手机号不能为空"})},timer:function(){this.time>1?(this.time--,this.isDisabledCode=!0,this.codeText=this.time+"s后重新获取",setTimeout(this.timer,1e3)):(this.isDisabledCode=!1,this.time=0,this.codeText="重新获取验证码")},codeLoginHandle:function(){if(""===this.codeForm.mobile||""===this.codeForm.code)return this.$message({type:"error",message:"手机号或者验证码不能为空"}),!1;var t={account:this.codeForm.account,code:this.codeForm.code};this.successFunc(t,this.codeLoadingBtn)},submitEditPasswordForm:function(t){var e=this,s={account:this.accountForm.account,pwd:this.editPasswordForm.editPassword,rePwd:this.editPasswordForm.editPassword2};this.editLoadingBtn=!0,this.$refs[t].validate((function(t){if(!t)return e.editLoadingBtn=!1,!1;e.$api.systemModule.changePassword(s).then((function(t){t.data.retcode===e.SUCCESS_CODE?(e.editLoadingBtn=!1,e.$message({type:"success",message:t.data.retmsg}),e.accountForm.password=e.editPasswordForm.editPassword2,e.editPasswordWrapper=!1):(e.editLoadingBtn=!1,e.editPasswordForm={editPassword:"",editPassword2:""},e.$message({type:"error",message:t.data.retmsg}))})).catch((function(t){console.log(t),e.$message({message:res.data.retmsg,type:"error"})}))}))}}},i=r,n=(s("01b0"),s("6691")),d=Object(n["a"])(i,a,o,!1,null,"38beea48",null);e["default"]=d.exports}}]);