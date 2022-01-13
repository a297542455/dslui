<!--
 - @author wujiajin
 - Description: 输入组件
 - Changelog:
 - Revision 1.0 2021-3-4 wujiajin
 - - 初始化
 -->
<template>
  <el-input-number
    v-model.trim="text"
    v-bind="$attrs"

    onmouseover="this.title=this.value"
    @change="change"
    @keyup.enter="handleClick"
    @input="input"
    @focus="handleFocus"
  />
</template>

<script>
export default {
  name: 'CommonNumberInput',
  // 传入的placeholder
  props: {

    disabled: {
      type: Boolean,
      default: false
    },

    value: {
      type: Number,
      default: 0
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
