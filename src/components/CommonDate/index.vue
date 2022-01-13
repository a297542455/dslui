<!--ghts reserved.
  -
  - @author: wujiajin
  - @description 日期选择组件
  -
  - Changelog:
  - Revision 1.0 2021-03-05 wujiajin
  - - 初始化
  -->
<template>
  <div :class="minwidth ? 'su-date' : ''">
    <el-date-picker
      v-model="model[field]"
      :disabled="disabled"
      :picker-options="showFutureTime ? options : pickerOptions"
      :range-separator="rangeSeparator"
      :type="type"
      :size="size"
      :format="format"
      :clearable="clearable"
      :default-time="type == 'datetime' ? '' : ['00:00:00', '23:59:59']"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :placeholder="placeholder"
      :value-format="valueFormat"
      @change="changeDate"
    />
  </div>
</template>

<script>
export default {
  name: 'CommonDate',
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    minwidth: {
      type: Boolean,
      default: false

    },
    size: {
      type: String,
      default: 'small'
    },
    rangeSeparator: {
      type: String,
      default() {
        return '至'
      }
    },
    type: {
      type: String,
      default() {
        return 'date'
      }
    },
    valueFormat: {
      type: String,
      default() {
        return 'yyyy-MM-dd'
      }
    },
    format: {

      type: String,
      default() {
        return ''
      }
    },
    placeholder: {

      type: String,
      default() {
        return ''
      }
    },
    startPlaceholder: {
      type: String,
      default() {
        return '开始日期'
      }
    },
    endPlaceholder: {
      type: String,
      default() {
        return '结束日期'
      }
    },
    clearable: {
      type: Boolean,
      default() {
        return true
      }
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    field: {
      type: String,
      default() {
        return 'date'
      }
    },
    showFutureTime: {
      type: Boolean,
      default() {
        return false
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    options: {

      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dateValue: this.model[this.field],
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now()
        // }
      }
    }
  },
  mounted() {},
  methods: {
    changeDate(e) {
      if (this.model && this.field) {
        if (!(e instanceof Array)) {
          this.model[this.field] = e
          this.dateValue = this.model[this.field]
        }
        this.$emit('changeDate', e)
        this.$emit('update:value', e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.su-date {
  width: 100px;
}

::v-deep.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
</style>
