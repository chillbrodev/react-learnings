import React, { Component } from 'react'

class Title extends Component {
  render() {
    return (
      <div>
        <div className='title'>
          Welcome to Sum it Up!
          <br />
          RULES:
          <br />
          Select up to {this.props.answerSize} numbers to make a sum.
          <br />
          Sums made in a row result in a streak.
          <br />
          The longer the streak the higher the score!
          <br />
        </div>
        <div className='footer'>
          <button className='btn' onClick={this.props.showGameComponent}>
            Play Game
          </button>
          <button className='btn' onClick={this.props.showLeaderboardComponent}>
            Show Leaderboard
          </button>
        </div>
      </div>
    )
  }
}

export default Title
