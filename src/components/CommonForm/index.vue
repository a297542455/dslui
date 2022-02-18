<!--

  -
  - @author: wujiajin
  - @description 多选组件
  -
  - Changelog:
  - Revision 1.0 2020-06-03 wujiajin
  - - 初始化
  -->
<template>
  <el-form ref="form" class="commom-form" :disabled="disabled" :label-position="labelPosition" :label-width="labelWidth" :model="model" @keyup.enter.native="handlerenter">
    <el-row :gutter="33">
      <el-col v-for="item of showItems" v-show="item.shows!==undefined?item.shows:true" :key="item.field" :span="item.span || 12" :offset="item.offset" :style="item.colstyle" :class="item.class">
        <el-row :gutter="33">

          <el-col :span="item.itemspan || 24">
            <el-form-item :class="item.showRequire && 'require-label'" :prop="item.field" :label="item.label" :label-width="item.labelWidth" :rules="disabled!==true?item.rules:null">
              <el-input
                v-if="item.type === 'textarea'"
                v-model="model[item.field]"
                :readonly="item.readonly"
                :resize="item.resize"
                type="textarea"
                :autosize="{
                  minRows: item.minRows || 1,
                  maxRows: item.maxRows || 8
                }"
                :placeholder="getPlaceholder(item)"
                :maxlength="item.maxlength || 500"
                :minlength="item.minlength"
                :disabled="item.disabled || disabled"
              />
              <el-select
                v-else-if="item.type === 'select'"
                v-model.trim="model[item.field]"
                :style="item.width?(`width:${item.width}`):''"
                :placeholder="getPlaceholder(item)"
                :multiple="item.multiple || false"
                :disabled="item.disabled || disabled"
                :collapse-tags="item.collapseTags"
                :allow-create="item.allowcreate || false"
                :filterable="item.filterable!==undefined?item.filterable:true"
                @click.native="clickHandle(item)"
                @change="changeSelect(item, $event)"
              >
                <el-option v-for="(option, i) of item.options || []" :key="i" :title="option[item.labelField] || option.label" :style="{'max-width':item.optionMaxWidth}" :label="option[item.labelField] || option.label" :value="option[item.valueField] || option.value" />
              </el-select>
              <el-button v-else-if="item.type === 'button'" :type="item.buttonType || 'primary'" :icon="item.icon" :disabled="item.disabled || disabled" @click="e => handler(item.click, e)">{{ model[item.field]?model[item.field]:item.name }}</el-button>
              <el-radio-group v-else-if="item.type === 'radio'" v-model.trim="model[item.field]" @change="val => handler(item.onChange, val)">
                <el-radio v-for="option of item.options" :key="option[item.valueField] || option.value" :label="option[item.valueField] || option.value" :disabled="item.disabled || disabled || false">{{ option[item.labelField] || option.label }}</el-radio>
              </el-radio-group>
              <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model.trim="model[item.field]" @change="val => handler(item.onChange, val)">
                <el-checkbox v-for="option of item.options" :key="option[item.valueField] || option.value" :label="option[item.valueField] || option.value" :disabled="item.disabled || disabled">{{ option[item.labelField] || option.label }}</el-checkbox>
              </el-checkbox-group>
              <!-- switch按钮组 -->
              <el-switch v-else-if="item.type === 'switch'" v-model="model[item.field]" :disabled="item.disabled || disabled" @change="val => handler(item.onChange, val)" />
              <el-input-number v-else-if="item.type === 'number'" v-model.trim="model[item.field]" :min="item.min" :max="item.max" :placeholder="getPlaceholder(item)" :disabled="item.disabled || disabled" :controls="item.controls" :precision="item.precision" :step="item.step" @change="val => handler(item.change, val)" />
              <el-cascader
                v-else-if="item.type === 'cascader'"
                v-model.trim="model[item.field]"
                :filterable="item.filterable || false"
                :separator="item.separator"
                :clearable="item.clearable || true"
                :readonly="item.readonly"
                :show-all-levels="item.showAllLevels"
                :props="item.props"
                :options="item.options || []"
                :expand-trigger="item.expandTrigger || 'hover'"
                :change-on-select="item.changeOnSelect || false"
                :disabled="item.disabled || disabled"
                @change="val => handler(item.change, val)"
                @active-item-change="val => handler(item.activeItemChange, val)"
              />
              <!-- 日期选择器 -->
              <common-date
                v-else-if="item.type === 'date'"
                ref="date"
                :style="item.width?(`width:${item.width}`):''"
                :model="model"
                :disabled="item.disabled || disabled"
                :readonly="item.readonly"
                :show-future-time="item.showFutureTime"
                :field="item.field"
                :range-separator="item.rangeSeparator"
                :type="item.dateType"
                :options="item.options"
                :date-type="item.dateType"
                :value-format="item.valueFormat"
                :format="item.format"
                :placeholder="getPlaceholder(item)"
                :start-placeholder="item.startPlaceholder"
                :end-placeholder="item.endPlaceholder"
                :clearable="item.clearable || true"
                @changeDate="handleDate(item)"
                @click.native="clickHandle(item)"
              />
              <!-- 上传 -->
              <common-upload
                v-else-if="item.type === 'upload'"
                ref="upload"
                :limit="item.limit"
                :disabled="item.disabled || disabled"
                :file-table-columns="item.fileTableColumns"
                :upload-file-url="item.uploadFileUrl"
                :item="item.uploadItem"
                :upload-name="item.uploadName"
                :file-data="model[item.field]"
                :field="item.field"
                :model="model"
                :reload="item.reload"
                :uploadurl="item.uploadurl"
                :min-size="item.minSize"
                :max-size="item.maxSize"
                :accept="item.accept"

                :file-type="item.fileType"
                @removeFile="removeFile"
                @uploadSuccess="uploadSuccess"
                @onChange="item.onChange"
              />
              <div v-else-if="item.type==='slot'" :style="`width:${item.width?item.width:''}`">
                <slot :name="item.slotID" :item="item" />
              </div>
              <el-button v-else-if="item.type==='textButton'" type="primary" @click.native="clickHandle(item)">{{ item.name }}</el-button>
              <el-tooltip v-else-if="item.type === 'tooltip'" class="tooltip-item" effect="dark" :content="item.tooltipstr" placement="right">
                <el-input
                  v-model.trim="model[item.field]"
                  :show-password="isShowPassword(item.showPassword)"
                  :style="`${item.showPassword ? '-webkit-text-security:disc;text-security:disc;-mox-text-security:disc' : none }`"
                  :clearable="item.clearable || true"
                  :disabled="item.disabled || disabled"
                  :placeholder="getPlaceholder(item)"
                  :maxlength="item.maxlength || 50"
                  :minlength="item.minlength"
                  @mouseover.native="onmouseover(model[item.field])"
                  @click.native="clickHandle(item)"
                  @input="change"
                  @change="val => handler(item.change, val)"
                />
              </el-tooltip>
              <el-input
                v-else-if="item.type === 'password'"
                v-model.trim="model[item.field]"
                auto-complete="off"
                autocomplete="new-passowrd"
                show-password
                :clearable="item.clearable || true"
                :disabled="item.disabled || disabled"
                :placeholder="getPlaceholder(item)"
                :maxlength="item.maxlength || 50"
                :minlength="item.minlength"
                @mouseover.native="onmouseover(model[item.field])"
                @click.native="clickHandle(item)"
                @input="change"
                @change="val => handler(item.change, val)"
              />

              <div v-else-if="item.type === 'batch'" />
              <el-input
                v-else
                v-model.trim="model[item.field]"
                :style="`width:${item.width?item.width:''}`"
                :suffix-icon="item.suffixIcon"
                auto-complete="off"
                autocomplete="new-passowrd"
                :clearable="item.clearable || true"
                :disabled="item.disabled || disabled"
                :placeholder="getPlaceholder(item)"
                :maxlength="item.maxlength || 50"
                :minlength="item.minlength"
                :oninput="item.oninput"
                @mouseover.native="onmouseover(model[item.field])"
                @click.native="clickHandle(item)"
                @input="change"
                @change="val => handler(item.change, val)"
              />
              <label v-if="item.tag" class="tag">{{ item.tag }}</label>
            </el-form-item>
          </el-col>
          <el-col v-if="item.desc" class="desc" :span="item.descSpan || 12" :style="item.descstyle">
            <div class="desc-content" v-html="item.desc" />
          </el-col>
          <el-col v-if="item.backbtnText" class="desc" :span="item.descSpan || 12" :style="item.descstyle">
            <el-button :type="item.buttonType || 'primary'" :icon="item.icon" :disabled="false" @click="e => handler(item.backbtncClick, e)">{{ item.backbtnText }}</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import CommonDate from '../CommonDate'
import CommonUpload from '../CommonUpload'
import _ from 'lodash'

export default {
  name: 'CommonForm',
  components: {
    CommonDate,
    CommonUpload
  },
  props: {
    // 是否显示占位符
    showPlaceHolder: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    labelWidth: {
      type: String,
      default: '95px'
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    fileTableColumns: {
      type: Array,
      default: () => []
    },
    uploadItem: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      readonly: false
    }
  },

  computed: {
    showItems() {
      return this.items.filter(item => !item.hide)
    }
  },

  mounted() {
    console.log('form.items=', this.items)
    console.log('form.model=', this.model)
  },

  methods: {
    getPlaceholder(item) {
      if (!this.showPlaceHolder) {
        return ''
      }

      if (_.isEmpty(item.placeholder)) {
        return ''
      }
      return item.placeholder
    },
    isShowPassword(showPassword) {
      return navigator.userAgent.indexOf('Firefox') >= 0 && showPassword
    },
    onmouseover(val) {
      if (val) {
        event.target.title = val
      }
    },
    // 处理事件
    handler(callback = () => { }, val) {
      console.log(val)
      callback(val)
    },
    // 解决表单下拉框已选择但校验还是报错问题
    changeSelect(item, $event) {
      // 新增返回勾选项
      let tar = {}
      for (let index = 0; index < item.options.length; index++) {
        const el = item.options[index]
        if (el.value === $event) {
          tar = el
        }
      }

      if (Array.isArray($event)) {
        tar = $event
      }
      this.$refs.form.validateField(item.field, () => { })
      if (item.onChange) {
        item.onChange(item, tar)
      }
    },
    // 清除表单校验结果
    clearValidate() {
      this.$refs.form.clearValidate()
    },
    // 重置表单并清除校验结果
    resetFields() {
      this.$nextTick(() => {
        if (this.$refs.upload) {
          this.$refs.upload.forEach(item => {
            item.clearFile()
          })
        }
      })
      this.$refs.form.resetFields()
      if (this.$refs.batchForm) {
        this.$refs.batchForm[0].reset()
      }
      if (this.$refs.date) {
        this.$refs.date[0].dateValue = ''
      }
    },
    // 校验单个
    validateField(id) {
      this.$refs.form.validateField(id, () => { })
    },
    // 校验表单
    validate(callback) {
      this.$refs.form.validate((validate) => {
        if (validate) {
          if (this.$refs.batchForm) {
            this.$refs.batchForm[0].validate((e) => callback(e))
          } else {
            callback(validate)
          }
        }
      })
    },
    // 上传成功
    uploadSuccess(e) {
      this.$emit('uploadSuccess', e)
    },
    // 删除图片
    removeFile(id) {
      this.$emit('removeFile', id)
    },
    // 日历选择回调
    changeDate(value, id) {
      this.$emit('changeDate', value, id)
    },
    // 解决输入框输入不了问题
    change() {
      // this.$forceUpdate()
    },
    // 点击事件
    clickHandle(item) {
      if (item.onClick) {
        item.onClick()
      }
    },
    // 点击事件
    handleDate(item) {
      if (item.onChange) {
        item.onChange()
      }
    },
    handlerenter() {
      this.$emit('keyenter')
    },
    // 清空上传的文件
    clearUploadFile() {
      this.$refs.upload[0].clearFile()
    }
  }
}
</script>
<style lang="scss">
.commom-form .el-tooltip__popper.is-dark {
  width: 231px !important;
  font-weight: 200;
  // opacity: 0.6 !important;
  // background: #12223e !important;
  word-wrap: break-word !important;
  word-break: break-all !important;
}
</style>
<style lang="scss" scoped>
::v-deep.centerMileage {
  padding-left: 0 !important;
}

.desc {
  display: flex;
  align-items: center;
  color: #c0c4cc;
  font-size: 14px;
  height: 40px;
}
::v-deep.el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #fff;
    color: #000;
    cursor: not-allowed;
}
.tag {
  font-size: 12px;
  margin-left: 12px;
}
.require-label {
  ::v-deep .el-form-item__label::before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }

}
</style>
