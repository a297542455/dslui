<!--

 -
 - @author wujiajin
 - Description: 上传组件
 - Changelog:
 - Revision 1.0 2021-03-7 wujiajin
 - - 初始化
 -->
<template>
  <div>
    <div class="upload-content">
      <div
        v-for="(file, index) in fileList"
        :key="index"
        class="upload-thumbnail"
      >
        <img v-if="file && !checkVideo(file.url)" :src="file.url">
        <video v-else :src="file.url" width="150" height="150" />

        <div class="upload-actions">
          <span
            v-if="index > 0 && !isdisabled"
            class="upload-preview"
            @click="handleUp(index)"
          >
            <i class="el-icon-back" />
          </span>
          <span class="upload-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in" />
          </span>
          <span
            v-if="!isdisabled"
            class="upload-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" />
          </span>
          <span
            v-if="!isdisabled"
            class="upload-delete"
            @click="handleRemove(file, fileList)"
          >
            <i class="el-icon-delete" />
          </span>

          <span
            v-if="index < fileList.length - 1 && !isdisabled"
            class="upload-preview"
            @click="handleDown(index)"
          >
            <i class="el-icon-right" />
          </span>
        </div>
      </div>

      <el-upload
        v-if="!hideUpload"
        :show-file-list="false"
        list-type="picture-card"
        :auto-upload="true"
        :action="uploadurl"
        :limit="limit"
        :disabled="isdisabled"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :accept="accept"
      >
        <i slot="default" class="el-icon-plus" />
      </el-upload>
    </div>

    <el-dialog :append-to-body="true" :modal-append-to-body="true" :visible.sync="dialogVisible">
      <video
        v-if="checkVideo(dialogImageUrl)"
        width="300"
        height="300"
        :src="dialogImageUrl"
        controls="controls"
      />
      <img v-else width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { defaultuploadurl } from '../../api/common'
export default {
  name: 'CommonUpload',
  props: {
    limit: {
      type: Number,
      default: 5
    },
    model: {
      type: Object,
      default: () => {}
    },
    field: {
      type: String,
      default: () => ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    reload: {
      type: Boolean,
      default: true
    },
    uploadurl: {
      type: String,
      default: defaultuploadurl
    },
    maxSize: {
      type: Number,
      default: 0
    },
    minSize: {
      type: Number,
      default: 0
    },
    fileType: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''

    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      init: false,
      loading: null,
      filelength: 0
    }
  },
  computed: {
    isdisabled() {
      return this.disabled
    },
    hideUpload() {
      return this.filelength >= this.limit
    }
  },
  watch: {
    model: {
      handler(val) {
        if (val[this.field] && (!this.init || this.disabled)) {
          this.fileList = val[this.field].map((elm) => {
            const { url } = elm
            return { url, name: url }
          })
          // this.init = this.filelength > 0
          this.filelength = this.fileList.length
          console.log('fileList', this.fileList)
        }
      },
      deep: true,
      immediate: true
    },
    reload: {
      handler(val) {
        console.log('reload.handler=', val)
        if (this.model) {
          this.fileList = this.model[this.field].map((elm) => {
            const { url } = elm
            return { url, name: url }
          })
          this.init = true
          this.filelength = this.fileList.length
          console.log('fileList', this.fileList)
        }
      },
      deep: true
    }
  },

  mounted() {
    console.log('upload.mounted.reload=', this.reload)
  },
  destroyed() {
    this.fileList = []
  },

  methods: {
    beforeUpload(file) {
      this.loading = this.$loading({ fullscreen: true })

      const { maxSize, minSize, fileType } = this

      let isType = true
      let isMin = true
      let isMax = true

      if (minSize > 0) {
        isMin = file.size / 1024 / 1024 > minSize
        if (!isMin) {
          this.$message.error(`上传图片大小不能超过 ${minSize}MB!`)
          this.loading.close()
        }
      }

      if (maxSize > 0) {
        isMax = file.size / 1024 / 1024 < maxSize
        if (!isMax) {
          this.$message.error(`上传图片大小不能超过 ${maxSize}MB!`)
          this.loading.close()
        }
      }

      if (fileType) {
        const fileTypes = fileType.split('|')
        isType = fileTypes.some(elm => file.type.indexOf(elm) > 0)
        if (isType) {
          this.$message.error('格式错误')
          this.loading.close()
        }
      }

      return isMin && isMax && isType
    },
    handleSuccess(response, file, fList) {
      const { fileList } = this
      let webUrl = response.data.webUrl

      const re = new RegExp('^(https)://', 'i')

      const match = re.test(webUrl)

      if (!match) {
        webUrl = `https://${webUrl}`
      }

      fileList.push({
        // url: `http://${response.data.webUrl}`,
        url: `${webUrl}`,
        name: `${webUrl}`
      })
      this.$set(this, 'fileList', fileList)
      this.loading.close()
      this.filelength = fList.length
      this.$emit('onChange', [...this.fileList])
      this.model[this.field] = [...this.fileList]
    },
    handleChange(file, fileList) {
      // const newfilelist = fileList.map(elm => {
      //   const { name, url, status } = elm
      //   return { name, url, status }
      // })
      // this.$emit('onChange', [...newfilelist])
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter((elm) => elm.name !== file.name)

      this.filelength = this.fileList.length

      // if (this.filelength === 0) {
      //   this.init = false
      // }

      this.$emit('onChange', [...this.fileList])
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },

    handleDown(index) {
      const newfilelist = [...this.fileList]
      const ofile = { ...newfilelist[index] }
      newfilelist[index] = { ...newfilelist[index + 1] }
      newfilelist[index + 1] = ofile
      this.fileList = [...newfilelist]
      this.$emit('onChange', [...this.fileList])
    },
    handleUp(index) {
      const newfilelist = [...this.fileList]
      const ofile = { ...newfilelist[index] }
      newfilelist[index] = { ...newfilelist[index - 1] }
      newfilelist[index - 1] = ofile
      this.fileList = [...newfilelist]
      this.$emit('onChange', [...this.fileList])
    },
    checkVideo(url) {
      return /\.(mp4|ogg)$/.test(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.upload {
  &-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  &-thumbnail {
    position: relative;
    width: 150px;
    height: 150px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-thumbnails {
    display: flex;
    justify-content: flex-start;
  }

  &-actions {
    opacity: 0;
    &:hover {
      opacity: 1;
    }
    border-radius: 5px;
    background: rgba($color: #000000, $alpha: 0.5);
    width: 150px;
    height: 150px;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
