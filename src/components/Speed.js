import React, {Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import Wrapper from './Wrapper'
import axios from '../utils/request'
import {apiUrl, duration, echartsConfig} from '../config/index'

class Speed extends Component {
  constructor(props) {
    super()
    this.state = {
      firstLoad: true,
      data: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios
      .get(apiUrl.speed)
      .then(res => {
        const result = res.data.data
        const data = []
        result.forEach((item, index) => {
          //data.push(item['数量'])
          data.push(index)
        })
        this.setState({data,firstLoad: false})
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
        right: '3%',
        bottom: '28%',
        top: '2%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: echartsConfig.axisLine,
        axisLabel: echartsConfig.axisLabel,
        splitLine: echartsConfig.splitLine
      },
      yAxis: {
        type: 'category',
        axisLine: echartsConfig.axisLine,
        axisLabel: echartsConfig.axisLabel,
        data: ['>90', '60-90', '30-60', '0-30']
      },
      series: [
        {
          type: 'bar',
          color: '#18D070',
          barWidth: 15,
          data
        }
      ]
    };
    return option

  }
  render() {
    return <Wrapper title="速度统计" height='22vh' firstLoad={this.state.firstLoad}>
      <ReactEcharts option={this.getOption()}/>
    </Wrapper>
  }
}

export default Speed