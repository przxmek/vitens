<template>
  <vuestic-widget class="col-sm-12 widget-viewport-height" headerText="Leaflet Maps">
    <leaflet-map :assets="assets"></leaflet-map>
  </vuestic-widget>
</template>

<script>
  import LeafletMap from '../maps/leaflet-maps/LeafletMap'
  export default {
    props: ['webId'],
    components: { LeafletMap },
    mounted () {
      console.log(this.webId)
    },
    computed: {
      assets () {
        return this.$store.state.staticData.assets
      }
    }
  }
</script>

<style lang="scss">
</style>
