import React, { Component } from 'react'

class Leaderboard extends Component {
  render() {
    return (
      <div>
        Welcome to the Leaderboard
        <br />
        <div className='footer'>
          <button className='btn' onClick={this.props.showTitleComponent}>
            Go to Menu
          </button>
        </div>
      </div>
    )
  }
}

export default Leaderboard
