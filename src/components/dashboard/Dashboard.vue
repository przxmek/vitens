<template>
  <div class="dashboard">
    <dashboard-info-widgets></dashboard-info-widgets>

    <vuestic-widget class="col-sm-12 map-widget">
      <leaflet-map :assets="assets"></leaflet-map>
    </vuestic-widget>
  </div>
</template>

<script>
  import VuesticWidget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import DashboardInfoWidgets from './DashboardInfoWidgets'
  import LeafletMap from '../maps/leaflet-maps/LeafletMap'

  export default {
    name: 'dashboard',
    components: {
      VuesticWidget,
      DashboardInfoWidgets,
      LeafletMap
    },
    computed: {
      assets() {
        return this.$store.state.staticData.assets
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

  .map-widget {
    height: 500px;
  }
</style>
