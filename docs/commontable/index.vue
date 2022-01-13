<template>
  <div>
    <table-md>
      <common-table :index-fixed="true" :columns="columns" :data="testData" :border="true" sortable>
        <template v-slot:test>
          这就是一个插槽
        </template>
      </common-table>
    </table-md>
  </div>
</template>

<script>
import TableMd from './table.md'
export default {
  name: 'App',
  components: {
    TableMd
  },
  data() {
    return {
      testData: [],
      columns: [
        {
          prop: 'id',
          label: 'ID ',
          width: 100
        },
        {
          prop: 'bannerImg',
          label: '商品图片',
          width: 150,
          type: 'slot',
          slotID: 'bannerImg'
        },
        {
          prop: 'type',
          label: '类型',
          width: 100,
          text(res) {
            if (res.type === '1') {
              return '商品推广'
            }
            if (res.type === '2') {
              return '素材'
            }
            if (res.type === '3') {
              return '图片'
            }
            if (res.type === '4') {
              return '首页banner'
            }
          }
        },
        {
          prop: 'createUser',
          label: '创建人'
        },
        {
          prop: 'control',
          label: '操作',
          width: 150,
          align: 'left',
          headerAlign: 'left',
          fixed: 'right',
          placeholder: '请输入',
          buttons: [
            {
              text(res) {
                return res.status === '1' ? '失效' : '生效'
              },
              type: 'text',
              onClick: e => {
                console.log('按钮根据返回值修改')
              }
            },
            {
              text: '编辑',
              type: 'text',
              onClick: e => {
                console.log('delete')
              }
            },
            {
              text: '删除',
              type: 'text',
              color: '#d81919',
              onClick: e => {
                this.$confirm('确定是否删除?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                })
                  .then(() => {
                    console.log('颜色修改')
                  })
                  .catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    })
                  })
              }
            }
          ]
        }
      ]
    }
  },
  created() {
    console.log('success')
  }
}
</script>

<style lang="scss">
html,
body,
#app,
.home {
  height: 100%;
}
#app {
  height: 100vh;
}
</style>
