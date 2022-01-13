<template>

  <el-dialog
    title="新增使用门店"
    :visible.sync="dialogVisible"
    width="50%"
    custom-class="region-dialog"
    :before-close="handleClose"
    show-close
  >

    <el-checkbox v-model="selectAll">全部</el-checkbox>
    <el-tree
      ref="tree"
      :data="tdata"
      show-checkbox
      default-expand-all
      node-key="name"
      highlight-current
      :props="defaultProps"
      @check="checkchange"
    />

  </el-dialog>

</template>

<script>
import sduqMethod from '../../mixin/sduqMethod'
export default {
  name: 'CommonRegionstreeDialog',
  components: {
  },
  mixins: [sduqMethod],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    defaultData: {
      type: Array,
      default: () => []
    },
    defaultUrl: {
      type: String,
      default: 'groupbuying/getOrganization'
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'operatingAreas',
        label: 'name'
      },
      treeData: [],
      allNodeKey: [],
      allNodeData: [],
      selectAll: false,
      defaultKey: [],
      tdata: [],

      loading: null

    }
  },
  watch: {
    defaultData(val) {
      if (val) {
        const nodes = val.map(res => res.bigRegionName || res.regionName)
        this.defaultKey = [...nodes]
      }
    },
    selectAll(val) {
      if (val) {
        const keys = [...this.allNodeKey]
        console.log(this.allNodeData)
        this.$refs.tree.setCheckedKeys(keys)
        const nodesdata = [...this.allNodeData]
        this.$emit('nodechange', nodesdata, true)
      } else {
        const newDatas = [...this.tdata]
        this.$emit('nodechange', [])
        this.tdata = [...newDatas]
        this.$refs.tree.setCheckedKeys([])
      }
    },
    dialogVisible(val) {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.defaultKey)
      })
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    checkchange(data, node) {
      const nodes = node.checkedNodes.map(res => {
        const isbigRegion = Object.prototype.hasOwnProperty.call(res, 'operatingAreas')
        return {
          isbigRegion,
          regionName: res.name,

          regionCode: res.num
        }
      })

      this.$emit('nodechange', nodes)
    },
    async query() {
      this.loading = this.$loading({ fullscreen: true })
      const getOrganization = this.curryingApi(this.defaultUrl, 'get')
      const res = await getOrganization()
      this.loading.close()
      this.tdata = res.data.map((res) => {
        const newres = { ...res }
        this.allNodeData.push({
          bigRegionCode: res.num,
          bigRegionName: res.name
        })
        this.allNodeKey.push(res.name)

        res.operatingAreas.forEach(elm => {
          this.allNodeKey.push(elm.name)

          this.allNodeData.push({
            regionName: elm.name,
            regionCode: elm.num
          })
        })
        newres.yyqName = res.dqName
        return newres
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body{
  overflow: auto;
  height: 50vh!important;
}
</style>
