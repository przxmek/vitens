<template>
  <div class="leaflet-map">
  </div>
</template>

<script>
  import 'leaflet-map'
  import * as L from 'leaflet'

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

      console.log(this.assets)
    },
    watch: {
      assets: function (data) {
        console.log(data)
        data.forEach(asset => {
          L.marker([asset.lat, asset.lng]).addTo(this.map)
            .bindPopup(asset.name)
            .openPopup()
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../../node_modules/leaflet/dist/leaflet.css";
  @import "../../../sass/_variables.scss";

  .leaflet-map {
    height: 100%;
  }
</style>
