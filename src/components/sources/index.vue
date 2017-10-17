<template>
  <div>
    <sources-info-widgets :asset="asset"></sources-info-widgets>
    <vuestic-widget class="chart-widget">
      <line-chart v-if="series" v-bind:chart-data="series" :height="120"></line-chart>
    </vuestic-widget>
    <event-table :web-id="webId"></event-table>
  </div>

</template>

<script>
  import SourcesInfoWidgets from './SourcesInfoWidgets'
  import LineChart from '../statistics/charts/LineChart'
  import axios from 'axios'
  import moment from 'moment'
  import EventTable from './EventTable'

  export default {
    props: ['webId'],
    components: {SourcesInfoWidgets, LineChart, EventTable},
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
              label: "Total Flow",
              borderColor: this.$store.getters.palette.primary,
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
