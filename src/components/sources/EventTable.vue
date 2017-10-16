<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <widget headerText="Events">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
            <tr>
              <td>Start time</td>
              <td>End time</td>
              <td>Name</td>
              <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="event in eventData" :class="{'table-success': event.IsAcknowledged}">
              <td>{{event.StartTime}}</td>
              <td>{{event.EndTime}}</td>
              <td>{{event.Name}}</td>
              <td>
                <button v-if="!event.IsAcknowledged" class="btn btn-primary btn-micro" @click="acceptEvent(event)">Accept</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </widget>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Widget from '../vuestic-components/vuestic-widget/VuesticWidget'

export default {
  props: ['webId'],
  components: {Widget},
  data () {
    return {
      eventData: []
    }
  },
  methods: {
    acceptEvent(event) {
      axios.put('https://saturn039.osiproghack.int/piwebapi/eventframes/' + event.WebId + '/acknowledge').then(e => {
        console.log("patched")
      })
      console.log(event)
    },
    loadEvents(id) {
      var asset = this.$store.state.staticData.assetsFlatMap[id]
      axios.get('https://saturn039.osiproghack.int/piwebapi/elements/?path=' + asset.path + '\\Distribution\\Quality').then(qualityElement => {
        axios.get('https://saturn039.osiproghack.int/piwebapi/elements/' + qualityElement.data.WebId + '/eventframes?startTime=*-1d').then(data => {
          this.eventData = data.data.Items
        })
      })
    }
  },
  mounted () {
//    this.loadEvents(this.webId)
  },
  watch: {
    webId (id)   {
      this.loadEvents(id)
    }
  }
}

</script>
