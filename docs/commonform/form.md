## Form

<slot></slot>



### 参数
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| items     | 表单项         | Array | [] | [] |
| model | 绑定数据  | Object|any | {}  |
| ref | 真实节点  | element | - | - |

### items参数
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| labelWidth     | 表单项名长度         | string | '' | '95px' |
| field | 绑定数据  | string|'' | ''  |
| span | 格子布局占格数  | number | 1-22 | 8 |
| label | 表单项名  | string | - | - |
| placeholder | 提示语(type为空/number有效)  | string | - | - |
| rules | 校验规则(vue表单校验规则)  | Array | - | - |
| type | 表单项类型  | string | number/select/radio/upload/slod/timerange | - |
| dateType | 日期类型(具体请查看elememntUI)  | string | - | - |
| onChange | 回调函数()  | function | - | - |
| options | 选择项  | Array | - | - |
| hide | 是否隐藏  | bolean | - | - |
| itemspan | 表单项长度  | bolean | - | - |
| desc | 表单项说明  | bolean | - | - |

### 方法
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| resetFields | 重置 | — |
| clearValidate | 清楚验证信息 | — |
| resetFields | 重置 | — |
| validate | 校验表单 | — |
| validateField | 校验单个 | — |

### 配置项说明
### 例子


```html

<template>
  <div>
      <common-form ref="form" :items="items" :model="infoData" />
  </div>
</template>

<script>
import FormMd from './form.md'
export default {
  name: 'App',
  components: {
    FormMd
  },
  data() {
    return {
      infoData: {},
      items: [
        {
          labelWidth: '120px',
          span: 8,
          field: 'roleId',
          label: '角色id',
          placeholder: '角色id',
          class: 'lxl-qslc',
          validate: 'required',
          rules: [
            { required: true, message: '请输入角色id', trigger: 'blur' }
          ]
        },
        {
          labelWidth: '120px',
          span: 8,
          field: 'tenantId',
          label: '租户id',
          placeholder: '租户id',
          class: 'lxl-qslc',
          validate: 'required',
          rules: [
            { required: true, message: '请输入租户id', trigger: 'blur' }
          ]
        }
        {
          span: 24,
          itemspan: 8,
          field: 'timerange',
          label: '活动时间',
          labelWidth: '150px',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          type: 'date',
          dateType: 'datetimerange',
          rules: [],
          onChange(e) {
            console.log('e')
            console.log(e)
          }
        },
        {
          labelWidth: '150px',
          span: 24,
          itemspan: 8,
          hide: true,
          field: 'isHot',
          label: '是否爆款',
          type: 'radio',
          options: [
            {
              label: '是',
              value: 'Y'
            },
            {
              label: '否',
              value: 'N'
            }
          ],
          class: 'lxl-qslc'
        },
        {
          labelWidth: '150px',
          span: 24,
          itemspan: 8,
          field: 'isHot',
          label: '是否爆款',
          type: 'selsct',
          options: [
            {
              label: '是',
              value: 'Y'
            },
            {
              label: '否',
              value: 'N'
            }
          ],
          class: 'lxl-qslc'
        },
        {
          labelWidth: '150px',
          span: 24,
          itemspan: 8,
          hide: false,
          field: 'isCommission',
          label: '是否只对专员可见',
          type: 'radio',
          options: [
            {
              label: '是',
              value: 'Y'
            },
            {
              label: '否',
              value: 'N'
            }
          ],
          class: 'lxl-qslc'
        },
      ]
    }
  },
  created() {
    console.log('success')
  }
}
</script>