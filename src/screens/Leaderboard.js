import React, { Component } from 'react'

class Leaderboard extends Component {
  render() {
    return (
      <div>
        Welcome to the Leaderboard
        <br />
        <button className='btn' onClick={this.props.showTitleComponent}>
          Go to Menu
        </button>
      </div>
    )
  }
}

export default Leaderboard
