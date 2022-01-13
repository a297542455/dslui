<!--

 -
 - @author wujiajin
 - Description: 上传按钮
 - Changelog:
 - Revision 1.0 2021-03-7 wujiajin
 - - 初始化
 -->
<template>
  <div class="upload-btn">
    <el-upload
      :show-file-list="false"
      v-bind="$attrs"
      :auto-upload="true"
      :action="uploadurl"
      :file-list="fileList"
      :on-success="handleSuccess"
      :before-upload="beforeuploadFunc"
      :on-error="handleError"
      :data="importsdata"
    >
      <el-button v-if="!loading" slot="default" size="small" plain type="primary"><slot /></el-button>
      <el-button v-else size="small" plain type="primary" :loading="loading">上传中</el-button>

    </el-upload>

  </div>
</template>
<script>
export default {
  name: 'CommonUploadbutton',
  props: {
    buttontext: {
      type: String,
      default: ''
    },
    uploadurl: {
      type: String,
      default: ''
    },
    importsdata: {
      type: Object,
      default: () => {}
    }, beforeupload: {
      type: Function,
      default: () => {
      }
    }

  },
  data() {
    return {
      dialogImageUrl: '',
      loading: false,
      dialogVisible: false,
      disabled: false,
      fileList: []
    }
  },
  methods: {
    beforeuploadFunc() {
      this.beforeupload()
      this.loading = true
    },
    handleSuccess(val) {
      console.log(val)
      this.loading = false

      this.$emit('uploadSuccess', val)
      if (val.status === 200 || val.code === '200') {
        this.$message({ type: 'success', message: '导入成功' })
        this.loading = false
        return
      }

      this.$message(val.msg ? val.msg : '导入失败')
      this.loading = false
    },
    handleError() {
      this.$message('导入失败')
      this.loading = false
    }

  }
}
</script>

<style lang="scss" scoped>
.upload-btn {
  margin: 0 10px;
}
</style>
