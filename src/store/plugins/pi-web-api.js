import axios from 'axios'

const piwebapi = store => {
  // var webId = 'E0QlqvSyIj702xjP96PHIItwfDcPMgup5xGpSQANOitmSQU0FUVVJOMDM4XFZJVEVOU1xWSVRFTlNcRlJJRVNMQU5EIFBST1ZJTkNFXDAxIFBST0RVQ1RJT04gU0lURVNcUFJPRFVDVElPTiBTSVRFIE5PT1JEQkVSR1VNXERJU1RSSUJVVElPTlxQSVBFU1xQSVBFIEZSLVBOQl8tVFIyMQ'
  // axios.get('https://saturn039.osiproghack.int/piwebapi/streamsets/' + webId + '/plot').then(data => {
  //   console.log(data)
  //   store.dispatch('staticData/loadStatic', data);
  // })

  load(store);
}

const load = (store) => {
  var payload = {
    "Production": {
      "Method": "GET",
      "Resource": "https://saturn039.osiproghack.int/piwebapi/elements/E0QlqvSyIj702xjP96PHIItwcDcPMgup5xGpSQANOitmSQU0FUVVJOMDM4XFZJVEVOU1xWSVRFTlNcRlJJRVNMQU5EIFBST1ZJTkNFXDAxIFBST0RVQ1RJT04gU0lURVM"
    },
    "ProductionSites": {
      "Method": "GET",
      "Resource": "$.Production.Content.Links.Elements",
      "ParentIds": [
        "Production"
      ]
    },
    "ProductionSitesAttributes": {
      "Method": "GET",
      "RequestTemplate": {
        "Resource": "$.ProductionSites.Content.Items[*].Links.Attributes"
      },
      "ParentIds": [
        "ProductionSites"
      ]
    }
  }

  axios.post('https://saturn039.osiproghack.int/piwebapi/batch', payload).then(response => {
    store.dispatch('staticData/loadStatic', response.data)
  })
}

export default piwebapi