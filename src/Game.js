import React, { Component } from 'react'
import './App.css'
import Number from './Number'
import Target from './Target'
import Timer from './Timer'
//https://medium.freecodecamp.org/do-you-want-to-learn-more-about-react-lets-build-and-then-play-a-game-218e0da5be44
const randomNumberBetween = (min, max) => {
  const random = Math.random()
  return Math.floor(random * (max - min) + min)
}

class Game extends Component {
  static bgColors = {
    playing: '#ccc',
    won: 'green',
    lost: 'red'
  }

  static gameStatusEnum = {
    new: 'new',
    won: 'won',
    playing: 'playing',
    lost: 'lost'
  }

  state = {
    gameStatus: Game.gameStatusEnum.new, //new, playing, won, lost
    remainingSeconds: this.props.initialSeconds,
    selectedIds: []
  }

  challengeNumbers = Array.from({ length: this.props.challengeSize }).map(() =>
    randomNumberBetween(...this.props.challengeRange)
  )

  isNumberAvailable = numberIndex =>
    this.state.selectedIds.indexOf(numberIndex) === -1

  render() {
    return (
      <div className='game'>
        <div className='help'>
          Pick 4 numbers that sum to the target in 15 seconds
        </div>
        <Target
          gameStatus={this.state.gameStatus}
          challengeNumbers={this.challengeNumbers}
          challengeSize={this.props.challengeSize}
        />
        <div className='challenge-numbers'>
          {this.challengeNumbers.map((value, index) => (
            <Number
              key={index}
              id={index}
              value={
                this.state.gameStatus === Game.gameStatusEnum.new ? '?' : value
              }
              clickable={this.isNumberAvailable(index)}
            />
          ))}
        </div>
        <div className='footer'>
          {this.state.gameStatus === Game.gameStatusEnum.new ? (
            <button>Start</button>
          ) : (
            <Timer value={this.state.remainingSeconds} />
          )}
          {['won'].includes(this.state.gameStatus) && (
            <button>Play Again</button>
          )}
        </div>
      </div>
    )
  }
}

export default Game
