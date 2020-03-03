import React, {Component} from 'react'
import Wrapper from './Wrapper'
import axios from '../utils/request'
import {apiUrl, duration} from '../config/index'

class Running extends Component {
  constructor(props) {
    super()
    this.state = {
      onLine: '--',
      all: '--'
    }
  }

  componentDidMount() {
    this.getData()
    this.getOnline()
  }

  getOnline() {
    axios
      .get(apiUrl.running)
      .then(res => {
        this.setState({onLine: res.data.data.sum})
        setTimeout(() => {
          this.getOnline()
        }, duration);
      })
      .catch(() => {
        setTimeout(() => {
          this.getOnline()
        }, duration);
      })
  }
  getData() {
    axios
      .get(apiUrl.car)
      .then(res => {
        this.setState({all: res.data.data.sum})
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
    const {onLine, all} = this.state
    return <Wrapper title="运行概况">
      <div className="flex-container">
        <div className="flex-1">
          <div className="count-box">车辆总数<span>{all}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="count-box">在线车辆<span>{onLine}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  }
}

export default Running