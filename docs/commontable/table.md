## Table

<slot></slot>



### 参数
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| columns     | 表单项         | Array | [] | [] |
| data | 绑定数据  | Object|any | {}  |
| sortable | 真实节点  | element | - | - |
| index-fixed | 真实节点  | element | - | - |


### columns
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |---------- |---------- |
| prop | 参数名 | string |— |— |
| label | 名称 | string |— |— |
| width | 长度 | number |— |— |
| text | 指定返回值 | function |— |— |
| buttons | 按钮 | array |— |— |

### 配置项说明
### 例子


```html
<template>
  <div>
      <common-table :index-fixed="true" :columns="columns" :data="data.results" :border="true" sortable> 
      </common-table>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
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
