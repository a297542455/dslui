<!--
 - @author wujiajin
 - Description: 输入组件
 - Changelog:
 - Revision 1.0 2021-3-4 wujiajin
 - - 初始化
 -->
<template>
  <div v-if="commonItems && commonItems.length && !commonItems[1].deleteFlag" class="item-flexRow">
    <div v-for="(item, index) in commonItems" :key="index">
      <div v-if="item.kinds=='label'" style="width: 80px; text-again"><label style="color: red">*</label>{{ item.text }}</div>
      <el-input
        v-else-if="item.kinds=='input'"
        ref="insert"
        v-model.trim="item.text"
        class="item-value"
        :oninput="item.oninput"
        :placeholder="item.placeholder"
        :type="item.type"
        :maxlength="item.maxlength"
        :minlength="item.minlength"
        :clearable="item.clearable || true"
        :disabled="item.disabled"
        @change="changeInput"
        @keyup.enter="handleInput"
        @input="inputValue"
      />
      <el-input-number
        v-else-if="item.kinds=='step'"
        v-model.trim="item.text"
        class="item-step"
        :min="item.min"
        @change="changeNum"
      />

      <el-button
        v-else-if="item.kinds=='button'"
        type="primary"
        @click="handleDelete"
      >删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonInsert',
  props: {
    insertItems: {
      type: Array,
      default: () => []
    },
    insertIndex: {
      type: Number,
      default: () => 0
    }
  },

  data() {
    return {
      commonItems: []
    }
  },
  watch: {

  },
  mounted() {
    if (this.insertItems) {
      console.log('this.insertItems===', this.insertItems)
      const obj = JSON.parse(JSON.stringify(this.insertItems))
      this.commonItems = obj
    }
  },
  methods: {
    // 点击后查询的事件
    handleInput(text) {
      this.$emit('click', this.text === null ? (this.text = '') : this.text)
    },
    changeInput(text) {
      this.$emit('change', this.text === null ? (this.text = '') : this.text)
    },
    inputValue(text) {
      console.log('inputValue=', text)
      this.$emit('update:value', this.text)
      this.$emit('input', this.text === null ? (this.text = '') : this.text)
      // 回调
      console.log('回调.commonItems', this.commonItems)
      this.$emit('listen-insert', this.commonItems, this.insertIndex)
    },
    clear() {
      this.inputObj.text = ''
      this.$emit('click', '')
    },
    clearText() {
      this.inputObj.text = ''
    },

    changeNum() {
      // 回调
      this.$emit('listen-insert', this.commonItems, this.insertIndex)
    },

    handleDelete() {
      console.log('handleDelete=', this.insertIndex)
      // 回调
      this.$emit('listen-delete', this.insertIndex)
    },

    check() {
      console.log('check')
    }
  }
}
</script>

<style>
.item-flexRow {
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  /* width: 96%; */
  align-items: center;
  justify-content: space-between;
}
.item-value {
  width: 160px;
  margin-right: 24px;
}
.item-step {
  width: 120px;
  margin-right: 24px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
