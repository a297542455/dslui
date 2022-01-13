<!--
  - @author: wujiajin
  - @description 分页器组件
  -
  - Changelog:
  - Revision 1.0 2021-03-04 wujiajin
  - - 初始化
  -->
<template>
  <div class="su-pagination flex">
    <el-pagination
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="totalCount"
      background
      @size-change="changeSize"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CommonPagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100]
      }
    },
    total: {
      type: Number || String,
      default: 0
    },
    layout: {
      type: String,
      default: 'total, sizes,prev, pager, next,slot,jumper'
    }
  },
  data: function() {
    return {
      value: this.pageSize,
      page: this.currentPage
    }
  },
  computed: {
    totalCount() {
      return parseInt(this.total)
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('update:currentPage', val)
      this.$emit('update:pageSize', this.pageSize)
      // 点击页数触发
      this.$emit('change', {
        pageNo: val,
        pageSize: this.pageSize
      })
    },
    // 更改每页显示条数
    changeSize(e) {
      this.$emit('update:currentPage', 1)
      this.$emit('update:pageSize', e)
      // 选择每页显示条数触发
      this.$emit('change', {
        pageNo: 1,
        pageSize: e
      })
    }

  }

}
</script>
