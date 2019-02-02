import React, { Component } from 'react'

class Timer extends Component {
  render() {
    return (
      <div>
        <div className='timer-text'>Time Remaining:</div>
        <div className='timer-value'>{this.props.value}</div>
      </div>
    )
  }
}

export default Timer
