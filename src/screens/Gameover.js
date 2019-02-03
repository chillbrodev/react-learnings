import React, { Component } from 'react'

class Gameover extends Component {
  render() {
    return (
      <div>
        Score screen:
        <br />
        <div className='footer'>
          <button className='btn' onClick={this.props.showLeaderboardComponent}>
            Show Leaderboard
          </button>
          <br />
          <button className='btn' onClick={this.props.showTitleComponent}>
            Go to Menu
          </button>
        </div>
      </div>
    )
  }
}

export default Gameover
