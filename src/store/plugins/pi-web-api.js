import axios from 'axios'

const piwebapi = store => {
  var webId = 'E0QlqvSyIj702xjP96PHIItwfDcPMgup5xGpSQANOitmSQU0FUVVJOMDM4XFZJVEVOU1xWSVRFTlNcRlJJRVNMQU5EIFBST1ZJTkNFXDAxIFBST0RVQ1RJT04gU0lURVNcUFJPRFVDVElPTiBTSVRFIE5PT1JEQkVSR1VNXERJU1RSSUJVVElPTlxQSVBFU1xQSVBFIEZSLVBOQl8tVFIyMQ'
  axios.get('https://saturn039.osiproghack.int/piwebapi/streamsets/' + webId + '/plot').then(data => {
    console.log(data)
    store.dispatch('staticData/loadStatic', data);
  })
}

export default piwebapi
