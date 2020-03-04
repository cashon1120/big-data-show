import Wrapper from './Wrapper'
import axios from '../utils/request'
import {apiUrl, duration} from '../config/index'
const React = require('react')
class Risk extends React.Component {
  constructor(props) {
    super()
    this.state = {
      firstLoad: true,
      map: null,
    }
  }

  componentDidMount() {
    const AMap = window.AMap
    var map = new AMap.Map("map2", {
      resizeEnable: true,
      zoom: 11,
      mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
    });

    this.setState({
      map
    }, () => {
      this.getData()
    })
  }

  heatmap = null
  getData() {
    const {map} = this.state
    axios
      .get(apiUrl.hot)
      .then(res => {
        if (this.heatmap !== null) {
          this
            .heatmap
            .setMap(null);
        }
        map.plugin(["AMap.Heatmap"], () => {
          this.heatmap = new window
            .AMap
            .Heatmap(map, {
              radius: 25,
              opacity: [0, 0.8]
            });
          const heatmapData = []
          res
            .data
            .data
            .forEach(item => {
              heatmapData.push({lng: item.Longitude, lat: item.Latitude, count: 1})
            })
          this
            .heatmap
            .setDataSet({data: heatmapData, max: 100});
        });

        this.setState({firstLoad: false})
        setTimeout(() => {
          this.getData()
        }, duration);
      })
      .catch(() => {
        setTimeout(() => {
          this.getData()
        }, duration);
      })
  }

  render() {
    return <Wrapper title='热力图' firstLoad={this.state.firstLoad} isMap={true}>
      <div id="map2" className="map-container"></div>
    </Wrapper>
  }
}

export default Risk