<template>
  <div style="margin-top: 30px">
	<!-- 上传图片 -->
    <div class="fl">
		<el-upload action="/"
				 :show-file-list="false"
				 :before-upload="beforeAvatarUpload"
				 :http-request="uploadFile">
			<img v-if="samplePicture" :src="samplePicture">
			<el-button v-else class="pad-30 bor-1">
			  <i v-if="!samplePicture" class="el-icon-plus" style="font-size: 30px;"></i>
			  <i v-if="samplePicture" class="el-icon-loading"></i>
			  <p class="mar-t-5">上传 图片，大小不超过2M</p>
			</el-button>
		</el-upload>
	</div>
	<!-- 上传excel -->
	<div class="fl mar-l-20">
		<el-upload action="/"
					 :show-file-list="false"
					 :before-upload="beforeBatchInExcel"
					 :http-request="batchInFileExcel">
			<el-button :loading="importLoaing" class="pad-30">
				<i class="el-icon-plus" style="font-size: 30px;"></i>
				<p class="mar-t-5">上传excel，大小不超过2M</p>
				</el-button>
		</el-upload>
	</div>
	<!-- 上传pdf -->
	<div class="fl mar-l-20" style="width: 350px;">
		<el-upload
			:show-file-list="false"
			:before-upload="beforeAvatarUploadPdf"
			:http-request="uploadFilePdf"
			:limit="1"
			action="/"
			multiple>
			<el-button class="pad-30">
				<i class="el-icon-plus" style="font-size: 30px;"></i>
				<p class="mar-t-5">上传 pdf、word，大小不超过10M</p>
			</el-button>
		  </el-upload>
	</div>
  </div>
</template>
<script>
	export default {
	  name: 'upload',
	  data(){
		return {
			samplePicture: "",//图片回选地址
			importLoaing: false,//上传loading  避免重复上传
		}
	  },
	  methods: {
		//***********************************备注：根据业务进行抽离 ********************************
		
		// **************上传图片*****************
		// 自定义上传文件方法
		uploadFile(file) {
		  return this.$message.error("请配置接口!");
		  let params = new FormData();
		  params.append("picture", file.file); //后台需要传这picture流
		  let config = {
			contentType: false,
			processData: false,
			headers: {
			  "Content-Type": "multipart/form-data" //后台接收类型是form-data
			  // "Content-Type": "application/x-www-form-urlencoded"
			}
		  };
		  //请求接口  可在api.js中自定义
		  this.$api.systemModule.uploadFile(params, config)
			.then(res => {
			  if (res.data.code === this.$config.RET_CODE.SUCCESS_CODE) {
				console.log(res.data.data)
				this.$message.success("上传成功");
			  } else {
				this.$message.error(res.data.retmsg);
			  }
			})
			.catch(err => {
			  console.log(err);
			});
		},
		//上传图片前校验
		beforeAvatarUpload(file) {
		  console.log(file.type);
		  const isJPG = /^image\/(jpeg|png|jpg|gif)$/g.test(file.type);
		  const isLt2M = file.size / 1024 / 1024 < 2;
		  if (!isJPG) {
			this.$message.error("上传图片只能是图片格式!");
		  }
		  if (!isLt2M) {
			this.$message.error("上传图片大小不能超过 2MB!");
		  }
		  return isJPG && isLt2M;
		},
		
		// ******************上传excel*************
		//上传excel
		batchInFileExcel(file) {
			return this.$message.error("请配置接口!");
		    let params = new FormData();
		    params.append("file", file.file); //后台需要传这file流
		    let config = {
		      contentType: false,
		      processData: false,
		      headers: {
		        "Content-Type": "multipart/form-data" //后台接收类型是form-data
		        // "Content-Type": "application/x-www-form-urlencoded"
		      }
		    };
		    this.importLoaing = true;
		    //上传回选
		    this.$api.systemModule.uploadFile(params, config)
		      .then(res => {
		        if (res.data.code === this.$config.RET_CODE.SUCCESS_CODE) {
		          let data = res.data.data;
		          this.$message.success("上传成功");
		        } else {
		          return this.$message.error("上传失败，请选择excel格式文件重新上传");
		        }
		        this.importLoaing = false;
		      })
		      .catch(err => {
		        this.importLoaing = false;
		        return this.$message.error("上传失败，请选择excel格式文件重新上传");
		        console.log(err);
		      });
		  },
		  //上传excel前校验
		  beforeBatchInExcel(file) {
		    const isExcel = file.type === ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "application/vnd.ms-excel");
		    const isLt2M = file.size / 1024 / 1024 < 2;
		    if (!isExcel) {
		      this.$message.error("上传文件只能是 excel 格式!");
		    }
		    if (!isLt2M) {
		      this.$message.error("上传文件大小不能超过 2MB!");
		    }
		    return isExcel && isLt2M;
		  },
		  
		  // **************上传pdf****************
		  //上传pdf
		  uploadFilePdf(file) {
			return this.$message.error("请配置接口!");
			let params = new FormData()
			params.append('file',file.file)
			let config = {
			  'contentType': false,
			  'processData': false,
			  headers: {
				//'Content-Type': 'multipart/form-data',
				'Content-Type': 'application/x-www-form-urlencoded'
			  }
			}
			this.$api.systemModule.uploadFile(params,config)
			  .then(res => {
				if(res.data.retcode === this.$config.RET_CODE.SUCCESS_CODE){
				  this.$message.success(res.data.retmsg)
				}else{
				  this.$message.error(res.data.retmsg)
				}
			  }).catch(err => {
				console.log(err)
			  })
		  },
		  //上传附件前的检验
		  beforeAvatarUploadPdf(file) {
			//let filetypes = ["txt", "doc", "xls", "pdf", "docx", "xlsx"]
			let filetypes = ["pdf","doc","docx"]
			let filename = file.name
			let fileted = filename.replace(/.+\./, "")
			const isLt10M = file.size / 1024 / 1024 < 10
			let isTYPE = filetypes.includes(fileted)
			if (!isLt10M) {
			  this.$message.error("上传文件大小不能超过 10MB!")
			}
			if (!isTYPE) {
			  this.$message({
				type: 'error',
				message: '上传文件类型只能是pdf或者word格式!'
			  })
			}
			return isTYPE && isLt10M
		  }
	  }
	}
</script>
