import React, { Component } from 'react'

class Timer extends Component {
  render() {
    return <div className='timer-value'>{this.props.value}</div>
  }
}

export default Timer
