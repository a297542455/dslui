<template>
  <div>
    <form-md>
      <common-form ref="form" :items="items" :model="infoData">
        <template v-slot:test>
          这就是一个插槽
        </template>
      </common-form>
    </form-md>
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
          span: 24,
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
          span: 24,
          field: 'tenantId',
          label: '租户id',
          placeholder: '租户id',
          class: 'lxl-qslc',
          validate: 'required',
          rules: [
            { required: true, message: '请输入租户id', trigger: 'blur' }
          ]
        },
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
        }, {
          labelWidth: '150px',
          span: 24,
          itemspan: 8,
          hide: false,
          field: 'isCommission1',
          label: '是否只对专员可见',
          type: 'select',
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
          hide: true,
          field: 'isCommission2',
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
        }, {

          field: 'isCommission3',
          type: 'slot',
          label: '这是一个插槽',
          slotID: 'test'
        },
        {
          labelWidth: '150px',
          span: 24,
          itemspan: 8,
          field: 'isCommission4',
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
        {
          labelWidth: '150px',
          span: 24,
          itemspan: 8,
          limit: 1,
          field: 'pic',
          label: '背景图',
          class: 'lxl-qslc',
          type: 'upload',
          accept: 'png',

          onChange: (e) => {
            console.log('onChange pic', e)
            // if (e.length) {
            //   this.detail.photos = e[0].url
            //   this.$set(this.detail, 'pic', e)
            // } else {
            //   this.detail.photos = ''
            //   this.detail.pic = []

            //   console.log(this.detail)
            // }
          },
          desc: '不传为默认图，建议尺寸750X1580'
        }
      ]
    }
  },
  created() {
    console.log('success')
  }
}
</script>

<style lang="scss">
html,
body,
#app,
.home {
  height: 100%;
}
#app {
  height: 100vh;
}
</style>
