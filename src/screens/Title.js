import React, { Component } from 'react'

class Title extends Component {
  render() {
    return (
      <div>
        Welcome to Sum it Up! Rack up as many correct sums as possible in the
        time limit. Sums made in a row result in a streak. The longer the streak
        the higher the score multiplier! Are you ready?
        <br />
        <button className='btn' onClick={this.props.showGameComponent}>
          Play Game
        </button>
        <br />
        <button className='btn' onClick={this.props.showLeaderboardComponent}>
          Show Leaderboard
        </button>
      </div>
    )
  }
}

export default Title
