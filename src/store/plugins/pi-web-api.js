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
  var prodPayload = {
    "Production": {
      "Method": "GET",
      "Resource": "https://saturn039.osiproghack.int/piwebapi/elements/E0QlqvSyIj702xjP96PHIItwaSVck2uy5xGpbgANOimkwAU0FUVVJOMDM4XENPTk5FQ1RQT0lOVFxWSVRFTlNcRlJJRVNMQU5EIFBST1ZJTkNFXDAxIFBST0RVQ1RJT04gU0lURVM"
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

  var distPayload = {
    "Distribution": {
      "Method": "GET",
      "Resource": "https://localhost/piwebapi/elements/E0QlqvSyIj702xjP96PHIItwmyZck2uy5xGpbgANOimkwAU0FUVVJOMDM4XENPTk5FQ1RQT0lOVFxWSVRFTlNcRlJJRVNMQU5EIFBST1ZJTkNFXDAyIERJU1RSSUJVVElPTiBTSVRFUw"
    },
    "DistributionSites": {
      "Method": "GET",
      "Resource": "$.Distribution.Content.Links.Elements",
      "ParentIds": [
        "Distribution"
      ]
    },
    "DistributionSitesAttributes": {
      "Method": "GET",
      "RequestTemplate": {
        "Resource": "$.DistributionSites.Content.Items[*].Links.Attributes"
      },
      "ParentIds": [
        "DistributionSites"
      ]
    }
  }

  axios.post('https://saturn039.osiproghack.int/piwebapi/batch', prodPayload).then(response => {
    let promises = []
    for (const site of response.data['ProductionSitesAttributes'].Content.Items) {
      for (const attr of site.Content.Items) {
        if (attr.Type === "OSIsoft.AF.Asset.AFFile")
          continue
        const url = attr.Links.EndValue
        let getPromise = axios.get(url)
        promises.push(getPromise.then(r => {
          attr.Value = r.data
        }))
      }
    }

    axios.all(promises).then(r => {
      store.dispatch('staticData/loadStatic', response.data)
    })
  });
}

export default piwebapi
