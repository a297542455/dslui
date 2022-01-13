<!--
 - @author wujiajin
 - Description: 输入组件
 - Changelog:
 - Revision 1.0 2021-3-4 wujiajin
 - - 初始化
 -->
<template>
  <el-input
    v-model.trim="text"
    :placeholder="placeholder"
    :type="type"
    :maxlength="maxlength"
    :minlength="minlength"
    :show-word-limit="showWordLimit"
    :clearable="clearable"
    :show-password="showPassword"
    :disabled="disabled"
    :size="size"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    :rows="rows"
    :autosize="autosize"
    :readonly="readonly"
    resize="none"
    :label="label"
    onmouseover="this.title=this.value"
    @change="change"
    @keyup.enter="handleClick"
    @input="input"
    @focus="handleFocus"
  />
</template>

<script>
export default {
  name: 'CommonInput',
  // 传入的placeholder
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    maxlength: {
      type: Number,
      default: 50
    },
    minlength: {
      type: Number,
      default: 0
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 2
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },

  data() {
    return {
      text: '',
      time: 0
    }
  },
  watch: {

    value: {
      handler(val) {
        this.text = val
      },
      immediate: true
    }
  },
  methods: {
    // 点击后查询的事件
    handleFocus() {
      this.$emit('focus', this.text === null ? this.text = '' : this.text)
    },
    handleClick() {
      this.$emit('click', this.text === null ? this.text = '' : this.text)
    },
    clear() {
      this.text = ''
      this.$emit('click', '')
    },
    clearText() {
      this.text = ''
    },
    // 更新keyword
    change() {
      this.$emit('change', this.text === null ? this.text = '' : this.text)
    },
    setKeyWord(text) {
      this.text = text
    },
    input() {
      this.$emit('update:value', this.text)
      this.$emit('input', this.text === null ? this.text = '' : this.text)
    }
  }
}
</script>
