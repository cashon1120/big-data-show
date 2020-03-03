import React, {Component} from 'react'
import Wrapper from './Wrapper'
import axios from '../utils/request'
import {apiUrl, duration} from '../config/index'

class Warning extends Component {
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
      .get(apiUrl.warning)
      .then(res => {
        this.setState({
          data: res.data.data,
          firstLoad: false
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
  render() {
    const {data} = this.state
    return <Wrapper title="实时报警" height="28.2vh" firstLoad={this.state.firstLoad}>
      <div className="waring-table">
        <div className="flex-container table-tr table-th">
          <div>时间</div>
          <div>速度</div>
          <div>车牌号</div>
          <div>报警种类</div>
        </div>
        <ul>
          {data.map((item, index) => <li className="table-tr" key={index}>
            <div>{item['时间']}</div>
            <div>{item['速度']}</div>
            <div>{item['车牌号']}</div>
            <div>{item['报警种类']}</div>
          </li>)}

        </ul>
      </div>

    </Wrapper>
  }
}

export default Warning