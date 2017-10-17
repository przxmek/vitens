<template>
  <div class="row dashboard-info-widgets">
    <vuestic-widget class="col-md-6 map-widget">
      <leaflet-map :assets="assets.productionSites"></leaflet-map>
    </vuestic-widget>

    <div class="col-sm-12 col-md-6" v-if="kpi">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-xl-6" v-if="kpi.f">
          <vuestic-widget class="info-widget">
            <div class="info-widget-inner">
              <div class="stats">
                <div class="stats-number">
                  <div v-if="kpi.f.value != null && kpi.f.previous != null">
                    <i v-if="kpi.f.previous < kpi.f.value" class="ion ion-arrow-up-c text-primary stats-icon"></i>
                    <i v-if="kpi.f.previous > kpi.f.value" class="ion ion-arrow-down-c text-primary stats-icon"></i>
                  </div>
                  <p>{{kpi.f.value}}</p>
                </div>
                <div class="stats-title">{{kpi.f.name}}</div>
              </div>
            </div>
          </vuestic-widget>
        </div>

        <div class="col-sm-12 col-md-6 col-xl-6" v-if="kpi.c">
          <vuestic-widget class="info-widget">
            <div class="info-widget-inner">
              <div class="stats">
                <div class="stats-number">
                  <div v-if="kpi.c.value != null && kpi.c.previous != null">
                    <i v-if="kpi.c.previous < kpi.c.value" class="ion ion-arrow-up-c text-primary stats-icon"></i>
                    <i v-if="kpi.c.previous > kpi.c.value" class="ion ion-arrow-down-c text-primary stats-icon"></i>
                  </div>
                  <p>{{kpi.c.value}}</p>
                </div>
                <div class="stats-title">{{kpi.c.name}}</div>
              </div>
            </div>
          </vuestic-widget>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 col-md-6 col-xl-6" v-if="kpi.a">
          <vuestic-widget class="info-widget">
            <div class="info-widget-inner">
              <div class="stats">
                <div class="stats-number">
                  <div v-if="kpi.a.value != null && kpi.a.previous != null">
                    <i v-if="kpi.a.previous < kpi.a.value" class="ion ion-arrow-up-c text-warning stats-icon"></i>
                    <i v-if="kpi.a.previous > kpi.a.value" class="ion ion-arrow-down-c text-primary stats-icon"></i>
                  </div>
                  <p>{{kpi.a.value}}</p>
                </div>
                <div class="stats-title">{{kpi.a.name}}</div>
              </div>
            </div>
          </vuestic-widget>
        </div>

        <div class="col-sm-12 col-md-6 col-xl-6" v-if="kpi.t">
          <vuestic-widget class="info-widget">
            <div class="info-widget-inner">
              <div class="stats">
                <div class="stats-number">
                  <div v-if="kpi.t.value != null && kpi.t.previous != null">
                    <i v-if="kpi.t.previous < kpi.t.value" class="ion ion-arrow-up-c text-primary stats-icon"></i>
                    <i v-if="kpi.t.previous > kpi.t.value" class="ion ion-arrow-down-c text-primary stats-icon"></i>
                  </div>
                  <p>{{kpi.t.value}}</p>
                </div>
                <div class="stats-title">{{kpi.t.name}}</div>
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
      kpi () {
        if (!this.asset || !this.asset.attributes) {
          return {}
        } else {
          return {
            'f': {
              name: this.asset.attributes.totalFlow.name,
              value: this.asset.attributes.totalFlow.data.value,
              previous: this.asset.attributes.totalFlow.data.last,
              uom: this.asset.attributes.totalFlow.uom
            },
            'c': {
              name: this.asset.attributes.conductivity.name,
              value: this.asset.attributes.conductivity.data.value,
              previous: this.asset.attributes.conductivity.data.last,
              uom: this.asset.attributes.conductivity.uom
            },
            'a': {
              name: this.asset.attributes.acidity.name,
              value: this.asset.attributes.acidity.data.value,
              previous: this.asset.attributes.acidity.data.last,
              uom: this.asset.attributes.acidity.uom
            },
            't': {
              name: this.asset.attributes.turbidity.name,
              value: this.asset.attributes.turbidity.data.value,
              previous: this.asset.attributes.turbidity.data.last,
              uom: this.asset.attributes.turbidity.uom
            }
          }
        }
      }
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
