<template>
  <div style="margin-top: 30px">
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	  <el-form-item label="动态仓库" prop="name">
	    <el-select v-model.trim="ruleForm.name"
				 @change="changeHandle"
				 @focus="focusHandle"
				 filterable
				 placeholder="请选择仓库">
			<el-option v-for="item in targetList"
					   :key="item.warehouseId"
					   :label="item.storehouseName"
					   :value="item.storehouseName">
			</el-option>
		</el-select>
	  </el-form-item>
	  <el-form-item label="活动区域" prop="region">
	    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
	      <el-option label="区域一" value="shanghai"></el-option>
	      <el-option label="区域二" value="beijing"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item label="即时配送" prop="delivery">
	    <el-switch v-model="ruleForm.delivery"></el-switch>
	  </el-form-item>
	  <el-form-item label="活动性质" prop="type">
	    <el-checkbox-group v-model="ruleForm.type">
	      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
	      <el-checkbox label="地推活动" name="type"></el-checkbox>
	      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
	      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
	    </el-checkbox-group>
	  </el-form-item>
	  <el-form-item label="特殊资源" prop="resource">
	    <el-radio-group v-model="ruleForm.resource">
	      <el-radio label="线上品牌商赞助"></el-radio>
	      <el-radio label="线下场地免费"></el-radio>
	    </el-radio-group>
	  </el-form-item>
	  <el-form-item label="活动形式" prop="desc">
	    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
	    <el-button @click="resetForm('ruleForm')">重置</el-button>
	  </el-form-item>
	</el-form>
  </div>
</template>
<script>
  export default {
	  name: 'formValidation',
    data() {
      return {
		targetList: [],//获取的下拉
        ruleForm: {
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
		//校验提交
      submitForm(formName) {
			this.$refs[formName].validate((valid) => {
			  if (valid) {
				alert('submit!');
			  } else {
				console.log('error submit!!');
				return false;
			  }
			});
		},
		//重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		//获取焦点时获取列表
		focusHandle () {
			return this.$message.error("请配置接口!");
			//列表参数
			this.$api.systemModule.getStorehouseName()
			  .then(res => {
				let data = res.data.data
				if (res.data.retcode === this.SUCCESS_CODE) {
				  this.targetList = data
				} else {
				  this.$message({
					type: 'error',
					message: res.data.retmsg
				  })
				}
			  }).catch(err => {
				console.log(err)
			})
		},
		//选中下拉获取id
		changeHandle(){
			let obj = {}
			//这里的targetList就是遍历的数据源
			obj = this.targetList.find((item)=>{
				return item.storehouseName === this.ruleForm.name//筛选出匹配数据
			})
			console.log("获取点击的对象",obj)
			this.ruleForm.storehouseId = obj.storehouseId
		}
    }
  }
</script>
