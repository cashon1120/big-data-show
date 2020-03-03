import React, {Component} from 'react'
import Wrapper from './Wrapper'
import ReactEcharts from 'echarts-for-react'
import axios from '../utils/request'
import {apiUrl, duration, echartsConfig} from '../config/index'

class Risk extends Component {
  constructor(props) {
    super()
    this.state = {
      firstLoad: true,
      data: {
        date: [],
        km: [],
        warning: [],
        risk: []
      }
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios
      .get(apiUrl.risk)
      .then(res => {
        const data = {
          date: [],
          km: [],
          warning: [],
          risk: []
        }
        res
          .data
          .data
          .forEach(item => {
            data
              .date
              .push(item['日期'])
            data
              .km
              .push(parseInt(item['公里数']))
            data
              .warning
              .push(parseInt(item['报警次数']))
            data
              .risk
              .push(parseInt(item['风险系数']))
          })
        this.setState({data, firstLoad: false})
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
        trigger: 'axis'
      },
      // legend: {   data: [     '公里数', '报警次数', '风险系数'   ],   textStyle: {     color:
      // '#189CBF',     fontSize: 12   } },
      grid: {
        left: '1%',
        right: '1%',
        top: '10%',
        bottom: '28%',
        containLabel: true
      },
      xAxis: {
        axisLabel: {
          ...echartsConfig.axisLabel
        },
        axisLine: {
          ...echartsConfig.axisLine
        },
        type: 'category',
        boundaryGap: false,
        data: data.date
      },
      yAxis: [
        {
          type: 'value',
          name: '公里数',
          position: 'left',
          nameTextStyle: echartsConfig.nameTextStyle,
          axisLabel: echartsConfig.axisLabel,
          splitLine: echartsConfig.splitLine,
          axisLine: echartsConfig.axisLine
        }, {
          type: 'value',
          name: '报警次数/风险系数',
          position: 'right',
          nameTextStyle: echartsConfig.nameTextStyle,
          axisLabel:  echartsConfig.splitLine,
          splitLine: echartsConfig.splitLine,
          axisLine: echartsConfig.axisLine
        }
      ],
      series: [
        {
          name: '公里数',
          type: 'line',
          yAxisIndex: '0',
          data: data.km
        }, {
          name: '报警次数',
          type: 'line',
          yAxisIndex: '1',
          data: data.warning
        }, {
          name: '风险系数',
          type: 'line',
          yAxisIndex: '1',
          data: data.risk
        }
      ]
    };
    return option
  }

  render() {
    return <Wrapper title="风险趋势" height='21.2vh' firstLoad={this.state.firstLoad}>
      <ReactEcharts option={this.getOption()}/>
    </Wrapper>
  }
}

export default Risk