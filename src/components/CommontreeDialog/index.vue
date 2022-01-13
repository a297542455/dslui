<template>

  <el-dialog
    title="新增"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    show-close
  >

    <el-tree
      ref="tree"
      :default-checked-keys="defaultCheckedKeys"
      show-checkbox
      default-expand-all
      :node-key="nodeKey"
      highlight-current
      :check-strictly="checkStrictly"
      :data="items"
      :props="defaultProps"
      @check-change="handleCheckChange"
    />
    <div>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="handleClose">返回</el-button>
    </div>
  </el-dialog>

</template>

<script>
export default {
  name: 'CommontreeDialog',
  components: {
  },
  props: {
    nodeKey: {
      type: String,
      default: 'id'
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: () => []
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'name'
        }
      }
    }
  },
  data() {
    return {
      infoData: {
      }

    }
  },
  watch: {

  },
  mounted() {
  },
  methods: {
    handleCheckChange() {},
    onSubmit() {
      const nodes = this.$refs.tree.getCheckedNodes()
      this.$emit('getNodes', nodes)
      this.handleClose()
    },
    handleClose() {
      this.infoData = {}
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>
