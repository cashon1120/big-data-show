import React, {Component} from 'react'

class Wrapper extends Component {

  render() {
    const {title, children, height, firstLoad, isMap} = this.props

    return <div className="wrapper">
      <h2>
        <span>{title}</span>
      </h2>
      <div className="content" style={{
        height
      }}>
        {isMap ? children : null}
        {firstLoad ? <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            : isMap ? null : children}
      </div>

    </div>
  }

}

export default Wrapper
