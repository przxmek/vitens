<template>
  <div id="app" class="app">
    <layout></layout>
  </div>
</template>

<script>
  import Layout from 'components/layout/Layout'
  import VuesticPreLoader from './components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'

  export default {
    name: 'app',
    components: {
      VuesticPreLoader,
      Layout
    },
    computed: {
      isAuth () {
        return this.$route.path.match('auth')
      }
    }
  }
</script>

<style lang="scss">
  @import "sass/main";
  body {
    height: 100%;
    .app {
      height: 100%;
    }
  }
</style>
