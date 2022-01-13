<template>
  <div>
    <guide-md />
  </div>
</template>

<script>
import GuideMd from './guide.md'
export default {
  name: 'App',
  components: {
    GuideMd
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
