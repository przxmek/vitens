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
            <tr v-for="event in eventData" :class="{'table-success': event.IsAcknowledged, 'table-info': event.Description === 'sended' }">
              <td>{{event.StartTime}}</td>
              <td>{{event.EndTime}}</td>
              <td>{{event.Name}}</td>
              <td>
                <button v-if="!event.IsAcknowledged && event.Description !== 'sended'" class="btn btn-info btn-micro" @click="acceptEvent(event)">Accept</button>
                <button v-if="!event.IsAcknowledged && event.Description !== 'sended'" class="btn btn-primary btn-micro" @click="sendToOperation(event)">
                  <span>Send to operations</span>
                </button>
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
      axios.patch('https://saturn039.osiproghack.int/piwebapi/eventframes/' + event.WebId + '/acknowledge').then(e => {
        this.loadEvents(this.webId)
      })
      console.log(event)
    },
    sendToOperation(event) {
      axios.patch('https://saturn039.osiproghack.int/piwebapi/eventframes/' + event.WebId, {
        "Description": "sended"
      }).then(e => {
        this.loadEvents(this.webId)
      });
    },
    loadEvents(id) {
      var asset = this.$store.state.staticData.assetsFlatMap[id]
      axios.get('https://saturn039.osiproghack.int/piwebapi/elements/?path=' + asset.path + '\\Distribution\\Quality').then(qualityElement => {
        axios.get('https://saturn039.osiproghack.int/piwebapi/elements/' + qualityElement.data.WebId + '/eventframes?startTime=*-60d').then(data => {
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
