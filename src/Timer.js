import React, { Component } from 'react'

class Timer extends Component {
  render() {
    return (
      <div>
        <div className='timer-value'>Time Remaining: {this.props.value}</div>
      </div>
    )
  }
}

export default Timer
