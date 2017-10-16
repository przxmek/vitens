<template>
  <div class="leaflet-map">
  </div>
</template>

<script>
  import 'leaflet-map'
  import * as L from 'leaflet'
  import OpenLayers from 'ol'
  import proj4 from 'proj4'
  export default {
    name: 'leaflet-map',
    props: [ 'assets' ],
    data () {
      return {
        map: null
      }
    },
    mounted () {
//    L.Icon.Default.imagePath = 'assets/vendor/leaflet' TODO: make it work with webpack
      L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.0.3/dist/images'

      this.map = L.map(this.$el).setView([51.505, -0.09], 13)

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map)

      if (this.assets.length > 0) {
        console.log(this.assets)
        this.assets.forEach(asset => {
          L.marker([asset.lat, asset.lng]).addTo(this.map)
            .bindPopup(asset.name)
            .openPopup()
        })
        this.map.fitBounds(this.assets.map(e => [e.lat, e.lng]))
      }
    },
    watch: {
      assets: function (data) {
        data.forEach(asset => {
          L.marker([asset.lat, asset.lng]).addTo(this.map)
            .bindPopup(asset.name)
            .openPopup()
        })
        this.map.fitBounds(data.map(e => [e.lat, e.lng]))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../node_modules/leaflet/dist/leaflet.css";
  @import "../../../sass/_variables.scss";

  .leaflet-map {
    height: 100%;
  }
</style>
