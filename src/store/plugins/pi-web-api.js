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
    "Root": {
      "Method": "GET",
      "Resource": "https://saturn039.osiproghack.int/piwebapi/elements/E0QlqvSyIj702xjP96PHIItwaSVck2uy5xGpbgANOimkwAU0FUVVJOMDM4XENPTk5FQ1RQT0lOVFxWSVRFTlNcRlJJRVNMQU5EIFBST1ZJTkNFXDAxIFBST0RVQ1RJT04gU0lURVM"
    },
    "Sites": {
      "Method": "GET",
      "Resource": "$.Root.Content.Links.Elements",
      "ParentIds": [
        "Root"
      ]
    },
    "SitesAttributes": {
      "Method": "GET",
      "RequestTemplate": {
        "Resource": "$.Sites.Content.Items[*].Links.Attributes"
      },
      "ParentIds": [
        "Sites"
      ]
    }
  }

  var distPayload = {
    "Root": {
      "Method": "GET",
      "Resource": "https://localhost/piwebapi/elements/E0QlqvSyIj702xjP96PHIItwmyZck2uy5xGpbgANOimkwAU0FUVVJOMDM4XENPTk5FQ1RQT0lOVFxWSVRFTlNcRlJJRVNMQU5EIFBST1ZJTkNFXDAyIERJU1RSSUJVVElPTiBTSVRFUw"
    },
    "Sites": {
      "Method": "GET",
      "Resource": "$.Root.Content.Links.Elements",
      "ParentIds": [
        "Root"
      ]
    },
    "SitesAttributes": {
      "Method": "GET",
      "RequestTemplate": {
        "Resource": "$.Sites.Content.Items[*].Links.Attributes"
      },
      "ParentIds": [
        "Sites"
      ]
    }
  }

  const batchUrl = 'https://saturn039.osiproghack.int/piwebapi/batch'

  let prod = null
  let dist = null

  let p1 = axios.post(batchUrl, prodPayload).then(async function (response) {
    for (const site of response.data['SitesAttributes'].Content.Items) {
      for (const attr of site.Content.Items) {
        if (attr.Type === "OSIsoft.AF.Asset.AFFile")
          continue
        const url = attr.Links.EndValue
        let result = await axios.get(url)
        attr.Value = result.data
      }
    }
    prod = response.data
  });

  let p2 = axios.post(batchUrl, distPayload).then(async function (response) {
    for (const site of response.data['SitesAttributes'].Content.Items) {
      for (const attr of site.Content.Items) {
        if (attr.Type === "OSIsoft.AF.Asset.AFFile")
          continue
        const url = attr.Links.EndValue
        let result = await axios.get(url)
        attr.Value = result.data
      }
    }
    dist = response.data
  });

  axios.all([p1, p2]).then(r => {
    store.dispatch('staticData/loadStatic', {prod, dist})
  })
}

export default piwebapi
