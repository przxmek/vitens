<template>
  <div class="charts-page">

    <div class="row">
      <div class="col-md-12">
        <!--<vuestic-widget class="chart-widget" headerText="Line Chart">-->
          <line-chart v-bind:chart-data="series" type="line" :height="200"></line-chart>
        <!--</vuestic-widget>-->
      </div>
    </div>

  </div>
</template>

<script>
  import LineChart from './LineChart'

  export default {
    name: 'charts',
    components: {
      LineChart
    },
    computed: {
      series () {
        return {
          labels: this.$store.state.staticData.labels,
          datasets: [
            {
              lineTension: 0,
              label: "Some pipe",
              strokeColor: 'green',
              fill: true,
              data: this.$store.state.staticData.series
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss">
  .widget.chart-widget {
    .widget-body {
      height: 550px;
    }
  }
</style>
