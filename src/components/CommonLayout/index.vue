<!--

  -
  - @author: wu jiajin
  - @description 内容布局组件
  -
  - Changelog:
  - Revision 1.0 2021-03-04 wujiajin
  - - 初始化
  -->
<template>
  <section class="su-layout">
    <aside
      v-if="$slots.aside"
      class="su-layout-aside"
      :style="`width:${asidewidth}`"
    >
      <div v-if="$slots.aside" class="su-layout-aside-content">
        <div v-if="$slots.asideheader" class="su-layout-aside-header">
          <slot name="asideheader" />
        </div>
        <div v-if="$slots.asidetitle" class="su-layout-aside-title">
          <slot name="asidetitle" />
        </div>
        <slot name="aside" />
      </div>
    </aside>

    <section
      v-if="$slots.action || $slots.filter || $slots.main || $slots.footer"
      class="su-layout-content"
      :style="`margin-left:${$slots.aside?asidewidth:0}`"
    >
      <header
        v-if="$slots.filter"
        class="su-layout-filter"
      >
        <slot name="filter" />
      </header>

      <section
        v-if="$slots.action || $slots.main || $slots.top"
        class="su-layout-main-wrapper"
      >

        <div
          v-if="$slots.top"
          class="su-layout-top"
        >
          <slot name="top" />
        </div>

        <div
          v-if="$slots.action"
          class="su-layout-action"
        >
          <slot name="action" />
        </div>

        <div
          v-if="$slots.main"
          class="su-layout-main"
        >
          <slot name="main" />
        </div>
      </section>

      <footer
        v-if="$slots.footer"
        class="su-layout-footer"
      >
        <slot name="footer" />
      </footer>
    </section>

    <div
      v-if="$slots.default"
      class="su-layout-default"
    >
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: 'CommonLayout',
  props: {
    /**
     * 边栏宽度
     */
    asidewidth: {
      type: String,
      default: '310px'
    }
  }
}
</script>

<style lang="sass" scoped>
.su-layout
  flex: auto
  background-color: #fff
  overflow: auto
  position: relative
  height: 100%

  .su-layout-aside
    width: 30%
    background-color: #fff
    position: absolute
    top: 0
    left: 0
    bottom: 0
    z-index: 9
    overflow-y: auto
    overflow-x: hidden
    padding: 10px 0 0 10px
    box-sizing: border-box

    & + .su-layout-content
      margin-left: 20px

    &-content
      height: 100%
      background: white
      overflow-x: hidden
      // box-shadow: $--su-layout-shadow

    &-header
      padding: 12px 0px 20px 12px

    &-title
      height: 52px
      background: #fff
      font-size: 14px
      font-weight: bolder
      text-align: left
      padding: 0 0 0 16px
      color:#000
      line-height: 52px

  .su-layout-content
    height: 100%
    padding: 10px 10px 0 10px
    box-sizing: border-box
    overflow: hidden
    display: flex
    flex-direction: column
    // border-radius: 32px

  .su-layout-filter
    margin-bottom: 20px
    flex: none
    overflow: hidden

    .el-form-item
      margin-bottom: 20px

  .su-layout-main-wrapper
    background-color: #fff
    // box-shadow: $--su-layout-shadow
    display: flex
    flex-direction: column
    padding: 20px 0 20px

    flex: auto
    overflow: hidden

  .su-layout-top
    flex: none
    margin-bottom: 20px
    > div
      display: flex
      justify-content: center

  .su-layout-action
    flex: none
    padding: 0 20px
    margin-bottom: 20px
    > div
      display: flex
      justify-content: space-between

  .su-layout-main
    flex: auto
    overflow: auto
    // padding: 0 20px

  .su-layout-footer
    background-color: #fff
    // box-shadow: $--su-layout-shadow
    text-align: right
    flex: none
    overflow: hidden
    padding: 12px 20px 12px
    // margin-top: $--su-layout-space

  .su-layout-default
    flex: auto

    &:first-child
      padding: 20px

</style>
