import React, { Component } from 'react'

class Title extends Component {
  render() {
    return (
      <div>
        <div className='title'>Welcome to Sum it Up!</div>
        <div className='menu-buttons'>
          <button className='btn' onClick={this.props.showGameComponent}>
            Play Game
          </button>
          <button className='btn' onClick={this.props.showLeaderboardComponent}>
            Leaderboard
          </button>
        </div>
      </div>
    )
  }
}

export default Title
