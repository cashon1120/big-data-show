import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import Wrapper from './Wrapper'
import axios from '../utils/request'
import {apiUrl, duration, echartsConfig} from '../config/index'
const React = require('react')
class Car extends React.Component {
  constructor(props) {
    super()
    this.state = {
      firstLoad: true,
      data: {
        hours: [],
        count: []
      }
    }
  }

  componentDidMount() {
    this.getData()
  }
  getData() {
    axios
      .get(apiUrl.today)
      .then(res => {
        const hours = []
        const count = []
        res.data.data.forEach(item => {
          hours.push(item['小时'])
          count.push(item['报警总数'])
        })

        this.setState({
          firstLoad: false,
          data: {
            hours,
            count
          }
        })
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

  getOption() {
    const {data} = this.state
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '1%',
        right: '1%',
        top: '5%',
        bottom: '30%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.hours,
        axisLine: {
          lineStyle: {
            color: '#174e71',
            width: 1
          }
        },
        axisLabel: echartsConfig.axisLabel,
        splitLine: echartsConfig.splitLine
      },
      yAxis: {
        axisLine: echartsConfig.axisLine,
        axisLabel: echartsConfig.axisLabel,
        splitLine: echartsConfig.splitLine,
        type: 'value'
      },
      series: [
        {
          data: data.count,
          type: 'bar',
          color: '#02CBF9',
          barWidth: 6,
        }
      ]
    };
    return option
  }

  render() {
    return <Wrapper title="24小时报警统计" height='20vh' firstLoad={this.state.firstLoad}>
      <ReactEchartsCore echarts={echarts} option={this.getOption()}/>
  </Wrapper>
  }
}

export default Car