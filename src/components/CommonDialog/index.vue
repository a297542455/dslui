<template>

  <el-dialog
    title="新增"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    show-close
  >
    <div class="commondialog-header">
      <el-steps v-if="stepArr.length > 0" :active="active" finish-status="success" align-center>

        <el-step v-for="item in stepArr" :key="item.title" :title="item.title" />
      </el-steps>
    </div>

    <common-form ref="form" :items="items" :model="infoData">
      <template v-for="item in slotItem" v-slot:[item.slotID]="slotProps">
        <slot :name="item.slotID" :item="slotProps.item" />
      </template>
    </common-form>
    <div v-if="btns.length > 0">

      <el-button v-for="(item) in btns" :key="item.label" type="primary" @click="handler(item)">{{ item.label }}</el-button>
    </div>
    <div v-else>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="handleClose">返回</el-button>
    </div>
  </el-dialog>

</template>

<script>
import CommonForm from '../CommonForm'
export default {
  name: 'CommonDialog',
  components: {
    CommonForm
  },
  props: {
    stepArr: {
      type: Array,
      default: () => []
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    defaultData: {
      type: Object,
      default: () => {}

    },
    items: {
      type: Array,
      default: () => []
    }, active: {
      type: Number,
      default: 0
    },
    btnItems: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      infoData: {
      }

    }
  },
  computed: {
    slotItem() {
      const itmes = this.items.filter(e => e.type === 'slot')
      console.log(itmes)
      return itmes
    },
    btns() {
      const { btnItems } = this
      return Object.values(btnItems)
    }
  },
  watch: {
    defaultData: {
      handler(val) {
        this.infoData = { ...this.infoData, ...val }
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    handler({ callback, ...attr }) {
      callback({ ...attr })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const parmas = { ...this.infoData }
          if (parmas.id) {
            this.$emit('update', parmas)
          } else {
            this.$emit('save', parmas)
          }
          this.handleClose()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose() {
      this.infoData = {}
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.commondialog-header {
  width: 100%;
  margin-bottom: 20px;
}
</style>
