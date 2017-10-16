<template>
  <div class="row dashboard-info-widgets">
    <vuestic-widget class="col-md-6 map-widget">
      <leaflet-map :assets="assets.productionSites"></leaflet-map>
    </vuestic-widget>

    <div class="col-sm-12 col-md-6">

      <div class="row">
        <div class="col-sm-12 col-md-6 col-xl-6">
          <vuestic-widget class="info-widget">
            <div class="info-widget-inner">
              <div class="stats">
                <div class="stats-number">
                  <div v-if="kpi[0].value != null && kpi[0].previous != null">
                    <i v-if="kpi[0].previous < kpi[0].value" class="ion ion-arrow-up-c text-primary stats-icon"></i>
                    <i v-if="kpi[0].previous > kpi[0].value" class="ion ion-arrow-down-c text-primary stats-icon"></i>
                  </div>
                  <p>{{kpi[0].value}}</p>
                </div>
                <div class="stats-title">{{kpi[0].name}}</div>
              </div>
            </div>
          </vuestic-widget>
        </div>

        <div class="col-sm-12 col-md-6 col-xl-6">
          <vuestic-widget class="info-widget">
            <div class="info-widget-inner">
              <div class="stats">
                <div class="stats-number">
                  <div v-if="kpi[1].value != null && kpi[1].previous != null">
                  <i v-if="kpi[1].previous < kpi[1].value" class="ion ion-arrow-up-c text-primary stats-icon"></i>
                  <i v-if="kpi[1].previous > kpi[1].value" class="ion ion-arrow-down-c text-primary stats-icon"></i>
                  </div>
                  <p>{{kpi[1].value}}</p>
                </div>
                <div class="stats-title">{{kpi[1].name}}</div>
              </div>
            </div>
          </vuestic-widget>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 col-md-6 col-xl-6">
          <vuestic-widget class="info-widget">
            <div class="info-widget-inner">
              <div class="stats">
                <div class="stats-number">
                  <div v-if="kpi[2].value != null && kpi[2].previous != null">
                  <i v-if="kpi[2].previous < kpi[2].value" class="ion ion-arrow-up-c text-warning stats-icon"></i>
                  <i v-if="kpi[2].previous > kpi[2].value" class="ion ion-arrow-down-c text-primary stats-icon"></i>
                  </div>
                  <p>{{kpi[2].value}}</p>
                </div>
                <div class="stats-title">{{kpi[2].name}}</div>
              </div>
            </div>
          </vuestic-widget>
        </div>

        <div class="col-sm-12 col-md-6 col-xl-6">
          <vuestic-widget class="info-widget">
            <div class="info-widget-inner">
              <div class="stats">
                <div class="stats-number">
                  <div v-if="kpi[3].value != null && kpi[3].previous != null">
                  <i v-if="kpi[3].previous < kpi[3].value" class="ion ion-arrow-up-c text-primary stats-icon"></i>
                  <i v-if="kpi[3].previous > kpi[3].value" class="ion ion-arrow-down-c text-primary stats-icon"></i>
                  </div>
                  <p>{{kpi[3].value}}</p>
                </div>
                <div class="stats-title">{{kpi[3].name}}</div>
              </div>
            </div>
          </vuestic-widget>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
  import LeafletMap from '../maps/leaflet-maps/LeafletMap'

  export default {
    name: 'dashboard-info-widgets',
    components: {LeafletMap},
    props: ['asset'],
    computed: {
      assets () {
        return this.$store.state.staticData.assets
      },
      kpi() {
        return [
        {
          name: 'Total flow',
          value: 1497.69,
          previous: null,
          uom: ''
        },
        {
          name: 'Conductivity',
          value: 512,
          previous: 500,
          uom: 'μS/cm'
        },
        {
          name: 'Acidity (pH)',
          value: 7.71,
          previous: 7.80,
          uom: ''
        },
        {
          name: 'Turbidity',
          value: 0.17,
          previous: 0.17,
          uom: 'NTU'
        }
      ]}
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

  .stats-number, .stats-title {
    line-height: 1;
  }

  .info-widget-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;

    &.has-chart {
      justify-content: space-between;
    }

    .stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  .stats-number {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 2.625rem;
    margin-bottom: 0.5rem;

    .stats-icon {
      font-size: 1.5625rem;
      position: absolute;
      top: 0.625rem;
      left: -1.25rem;

      &.icon-wide {
        left: -1.875rem;
      }
    }
  }

</style>
