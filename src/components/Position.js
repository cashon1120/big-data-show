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
      infoWindow: null
    }
  }

  componentDidMount() {
    const AMap = window.AMap
    const map = new AMap.Map('map1', {
      zoom: 12,
      mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
    });

    const infoWindow = new AMap.InfoWindow({
      offset: new AMap.Pixel(0, -30)
    });

    this.setState({
      infoWindow,
      map
    }, () => this.getData())
  }

  markerClick(e) {
    const {infoWindow, map} = this.state
    infoWindow.setContent(e.target.content);
    infoWindow.open(map, e.target.getPosition());
  }

  getData() {
    const {map, firstLoad} = this.state
    const AMap = window.AMap
    axios
      .get(apiUrl.position)
      .then(res => {
        map.clearMap();
        var markers = res.data.data

        markers.forEach(item => {
          var marker = new AMap.Marker({
            map,
            position: [
              item.BDLongitude, item.BDLatitude
            ],
            offset: new AMap.Pixel(-10, -30)
          });
          marker.content = item.NumberPlate;
          marker.on('click', e => this.markerClick(e));
        });

        // 显示所有marker
        if (firstLoad) {
          // map.setFitView();
        }

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
    return <Wrapper title="在线位置分布" firstLoad={this.state.firstLoad} isMap={true}>
      <div id="map1" className="map-container"></div>
    </Wrapper>
  }
}

export default Risk