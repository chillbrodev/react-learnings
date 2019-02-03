import React, { Component } from 'react'

class Gameover extends Component {
  render() {
    return (
      <div>
        Score screen:
        <br />
        <button className='btn' onClick={this.props.showTitleComponent}>
          Go to Menu
        </button>
        <br />
        <button className='btn' onClick={this.props.showLeaderboardComponent}>
          Show Leaderboard
        </button>
      </div>
    )
  }
}

export default Gameover
