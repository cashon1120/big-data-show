import React, {Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import axios from '../utils/request'
import {apiUrl, duration} from '../config/index'

import Wrapper from './Wrapper'

class Car extends Component {
  constructor(props) {
    super()
    this.state = {
      firstLoad: true
    }
  }

  componentDidMount() {
    this.getData()
  }
  colors = [
    '#d223e7',
    '#4962FC',
    '#02CBF9',
    '#189CBF',
    '#12ED93',
    '#3FD0F9'
  ]
  getData() {
    axios
      .get(apiUrl.safe)
      .then(res => {
        const data = res.data.data
        data.forEach((item, index) => {
          item.itemStyle = {
            color: this.colors[index],
            fontSize: 12
          }
        })
        this.setState({data: res.data.data, firstLoad: false})
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

  getOption = () => {
    const {data} = this.state
    let option = {
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '主动安全占比',
          type: 'pie',
          radius: '50%',
          center: [
            '48%', '36%'
          ],
          label: { 
            normal: {
              show: true,
              textStyle: {
                fontSize: 12
              },
            }
          },
          data
        }
      ]
    };
    return option;
  }

  render() {
    return <Wrapper title="主动安全占比" height='20vh' firstLoad={this.state.firstLoad}>
      <ReactEcharts option={this.getOption()}/>
    </Wrapper>
  }
}

export default Car