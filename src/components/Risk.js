import React, {Component} from 'react'
import Wrapper from './Wrapper'
import ReactEcharts from 'echarts-for-react'
import axios from '../utils/request'
import {apiUrl, duration} from '../config/index'

class Risk extends Component {
  constructor(props) {
    super()
    this.state = {
      firstLoad: true,
      data: {
        date: {
          data: [],
          km: [],
          warning: [],
          risk: []
        }
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
        const data = {}
        res
          .data
          .data
          .forEach(item => {
            data
              .date
              .push(item['日期'])
            data
              .km
              .push(item['公里'])
            data
              .warning
              .push(item['报警'])
            data
              .risk
              .push(item['风险系数'])
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
      legend: {
        data: [
          '公里数', '报警次数', '风险系数'
        ],
        textStyle: {
          color: '#189CBF',
          fontSize: 12
        }
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '28%',
        containLabel: true
      },
      xAxis: {
        axisLabel: {
          textStyle: {
            color: '#189CBF',
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: '#174e71',
            width: 1
          }
        },
        type: 'category',
        boundaryGap: false,
        data: data.date
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#189CBF',
            fontSize: 12
          }
        },
        splitLine: {
          lineStyle: {
            color: '#174e71'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#174e71',
            width: 1
          }
        }
      },
      series: [
        {
          name: '公里数',
          type: 'line',
          stack: '总量',
          data: data.km
        }, {
          name: '报警次数',
          type: 'line',
          stack: '总量',
          data: data.warning
        }, {
          name: '风险系数',
          type: 'line',
          stack: '总量',
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