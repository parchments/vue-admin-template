<template>
  <el-pagination background
                 @size-change="sizeChangeHandle"
                 @current-change="currentChangeHandle"
                 :current-page="paginations.pageNo"
                 :total="paginations.total"
                 :page-size="paginations.pageSize"
                 :page-sizes="pages"
                 layout="total,sizes,prev,pager,next,jumper">
  </el-pagination>
</template>

<script>
export default {
  name: 'paginations',
  props: ['paginations'],
  data () {
    return {
      pages: [5, 10, 20, 50, 100]
    }
  },
  created () {
    this.$config.paginationParams = {
      pageNo: 1,
      pageSize: 5,
      total: 0,
      pages: [5, 10, 20, 50, 100]
    }
  },
  methods: {
    //当前页
    currentChangeHandle (val) {
      this.paginations.pageNo = val
      if (this.paginations.total) {//有数据才发送请求
        this.$emit('sendPaginations', val)
      }
    },
    //切换条数
    sizeChangeHandle (val) {
      this.paginations.pageSize = val
      //能通过this.paginations获取props属性
      if (this.paginations.total) {//有数据才发送请求
        this.$emit('sendPaginations', val)
      }
    }
  }
}
</script>
