<template>
  <div>
    <vuestic-widget class="col-sm-12 map-widget">
      <leaflet-map :assets="assets.productionSites"></leaflet-map>
    </vuestic-widget>
    <vuestic-widget class="chart-widget">
      <line-chart v-if="series" v-bind:chart-data="series" :height="200"></line-chart>
    </vuestic-widget>
  </div>

</template>

<script>
  import LeafletMap from '../maps/leaflet-maps/LeafletMap'
  import LineChart from '../statistics/charts/LineChart'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    props: ['webId'],
    components: {LeafletMap, LineChart},
    data () {
      return {
        labels: [],
        dataSeries: []
      }
    },
    computed: {
      asset() {
        return this.$store.state.staticData.assetsFlatMap[this.webId]
      },
      assets() {
        return this.$store.state.staticData.assets
      },
      series () {
        return {
          labels: this.labels,
          datasets: [
            {
              lineTension: 0,
              label: "",
              borderColor: 'green',
              fill: false,
              data: this.dataSeries
            }
          ]
        }
      }
  },
    watch: {
      asset: function (data) {
        axios.get(data.links.plot).then(response => {
          var series = response.data.Items[0].Items;
          this.labels = series.map(e => moment(e.Timestamp).format("YYYY-MM-DD HH:mm"))
          this.dataSeries = series.map(e => {
            return {
              t: moment(e.Timestamp).unix(),
              y: e.Value
            }
          })
        })
      }
    }
  }
</script>

<style>
  .map-widget {
    height: 300px;
  }
</style>
