<template>
  <div class="editor-content">
    <div class="editor-editor"><el-input
      v-model="editorStr"
      type="textarea"
      placeholder="请输入编辑代码"
      show-word-limit
      resize="none"
      rows="6"
    /></div>
    <div>
      <div class="editor-srceen" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      editorStr: ''
    }
  }

}
</script>

<style lang="scss">
.editor {
  &-content{
    width: 100vw;
    display: flex;
    justify-content: space-between;
  }

  &-editor{
    width: 50%;
  }

  &-srceen{
    width: 50%;
  }

}
</style>
