<template>
  <div>
    <vuestic-widget class="col-sm-12 map-widget">
      <leaflet-map :assets="assets"></leaflet-map>
    </vuestic-widget>
    <vuestic-widget class="chart-widget">
      <line-chart v-bind:chart-data="series" type="line" :height="200"></line-chart>
    </vuestic-widget>
  </div>

</template>

<script>
  import LeafletMap from '../maps/leaflet-maps/LeafletMap'
  import LineChart from '../statistics/charts/LineChart'

  export default {
    props: ['webId'],
    components: {LeafletMap, LineChart},
    mounted() {
      console.log(this.webId)
    },
    computed: {
      assets() {
        return this.$store.state.staticData.assets
      }
    }
  }
</script>

<style>
  .map-widget {
    height: 300px;
  }
</style>
