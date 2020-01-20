<template>
  <el-table :data="tableData"
            @selection-change="selectionChangeHandle">
    <el-table-column type="selection"
                     width="100"></el-table-column>
    <el-table-column prop="name"
                     label="商品"></el-table-column>
    <el-table-column prop="code"
                     label="商品代码"></el-table-column>
    <el-table-column prop="time"
                     label="时间">
		<template slot-scope="scope">
			{{ scope.row.time | formatDate('YYYY-MM-DD HH:mm:ss')}}
		</template>
	 </el-table-column>
    <el-table-column label="操作"
                     width="200">
      <template slot-scope="scope">
        <el-button type="text"
                   size="small"
                   class="mar-r-20"
                   @click="editHandle(scope.$index, scope.row)">编辑</el-button>
        <el-button type="text"
                   size="small"
                   class="mar-r-20">
          <router-link :to="{path: '/goods/goodsList/goodsDetail',query: {code: scope.row.code}}">详情</router-link>
        </el-button>
        <el-button type="text"
                   size="small"
                   @click="singleDeleteHandle(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    //表格数据
    tableData: {
      type: Array,
      default: Object,
      required: true
    }
  },
  methods: {
    //表格全选
    selectionChangeHandle (data) {
      this.$emit('selectionChangeHandle', data)
    },
    //编辑
    editHandle (index, row) {
      this.$emit('editHandle', index, row)
    },
    //删除
    singleDeleteHandle (index, row) {
      this.$emit('singleDeleteHandle', index, row)
    }
  }
}
</script>
