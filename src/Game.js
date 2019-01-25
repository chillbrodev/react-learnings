import React, { Component } from 'react'
import './App.css'
import Number from './Number'

import Timer from './Timer'
import { sampleSize, sum } from 'lodash'
// Created via https://medium.freecodecamp.org/do-you-want-to-learn-more-about-react-lets-build-and-then-play-a-game-218e0da5be44
const randomNumberBetween = (min, max) => {
  const random = Math.random()
  return Math.floor(random * (max - min) + min)
}

class Game extends Component {
  static bgColors = {
    new: 'lightblue',
    playing: 'deepskyblue',
    won: 'lightgreen',
    lost: 'lightcoral'
  }

  static gameStatusEnum = {
    new: 'new',
    won: 'won',
    playing: 'playing',
    lost: 'lost'
  }

  static getColorFromStatus = () => Game.bgColors[this.state.gameStatus]

  state = {
    gameStatus: Game.gameStatusEnum.new, //new, playing, won, lost
    remainingSeconds: this.props.initialSeconds,
    selectedIds: []
  }

  challengeNumbers = Array.from({ length: this.props.challengeSize }).map(() =>
    randomNumberBetween(...this.props.challengeRange)
  )

  target = sum(sampleSize(this.challengeNumbers, this.props.answerSize))

  componentDidMount() {
    if (this.props.autoPlay) {
      this.startGame()
    }
  }

  isNumberAvailable = numberIndex =>
    this.state.selectedIds.indexOf(numberIndex) === -1

  startGame = () => {
    this.setState({ gameStatus: Game.gameStatusEnum.playing }, () => {
      this.intervalId = setInterval(() => {
        this.setState(prevState => {
          const newRemainingSeconds = prevState.remainingSeconds - 1
          if (newRemainingSeconds === 0) {
            clearInterval(this.intervalId)
            return { gameStatus: Game.gameStatusEnum.lost, remainingSeconds: 0 }
          }
          return { remainingSeconds: newRemainingSeconds }
        })
      }, 1000)
    })
  }

  selectNumber = numberIndex => {
    this.setState(
      prevState => {
        if (prevState.gameStatus !== Game.gameStatusEnum.playing) {
          return null
        }
        const newSelectedIds = [...prevState.selectedIds, numberIndex]
        return {
          selectedIds: newSelectedIds,
          gameStatus: this.calcGameStatus(newSelectedIds)
        }
      },
      () => {
        if (this.state.gameStatus !== Game.gameStatusEnum.playing) {
          clearInterval(this.intervalId)
        }
      }
    )
  }

  calcGameStatus = newSelectedIds => {
    const sumSelected = newSelectedIds.reduce(
      (acc, curr) => acc + this.challengeNumbers[curr],
      0
    )
    if (newSelectedIds.length !== this.props.answerSize) {
      return Game.gameStatusEnum.playing
    }
    return sumSelected === this.target
      ? Game.gameStatusEnum.won
      : Game.gameStatusEnum.lost
  }

  render() {
    const { gameStatus, remainingSeconds } = this.state

    return (
      <div className='game'>
        <div className='help'>
          Pick {this.props.answerSize} numbers that sum to the target in{' '}
          {this.props.initialSeconds} seconds
        </div>
        <div
          className='target'
          style={{ backgroundColor: Game.bgColors[gameStatus] }}
        >
          {gameStatus === Game.gameStatusEnum.new ? '?' : this.target}
        </div>
        <div className='challenge-numbers'>
          {this.challengeNumbers.map((value, index) => (
            <Number
              key={index}
              id={index}
              value={
                this.state.gameStatus === Game.gameStatusEnum.new ? '?' : value
              }
              clickable={this.isNumberAvailable(index)}
              onClick={this.selectNumber}
            />
          ))}
        </div>
        <div className='footer'>
          {gameStatus === Game.gameStatusEnum.new && (
            <button onClick={this.startGame}>Start</button>
          )}

          {gameStatus === Game.gameStatusEnum.playing && (
            <Timer value={remainingSeconds} />
          )}

          {[Game.gameStatusEnum.won, Game.gameStatusEnum.lost].includes(
            gameStatus
          ) && <button onClick={this.props.onPlayAgain}>Play Again</button>}
        </div>
      </div>
    )
  }
}

export default Game
