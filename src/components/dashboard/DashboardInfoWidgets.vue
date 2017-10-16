<template>
  <div class="row dashboard-info-widgets">
    <div class="col-md-6 col-xl-3">
    <vuestic-widget class="info-widget">
      <div class="info-widget-inner">
        <div class="stats">
          <div class="stats-number">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            4
          </div>
          <div class="stats-title">Production Sites</div>
        </div>
      </div>
    </vuestic-widget>
  </div>
  <div class="col-md-6 col-xl-3">
    <vuestic-widget class="info-widget">
      <div class="info-widget-inner">
        <div class="stats">
          <div class="stats-number">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            10
          </div>
          <div class="stats-title">Distribution Sites</div>
        </div>
      </div>
    </vuestic-widget>
  </div>

  </div>
</template>

<script>
  export default {
    name: 'dashboard-info-widgets',
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
