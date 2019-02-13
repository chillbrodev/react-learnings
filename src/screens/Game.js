import React, { Component } from 'react'
import Number from '../Number'

import Timer from '../Timer'
import { sampleSize, sum } from 'lodash'

const randomNumberBetween = (min, max) => {
  const random = Math.random()
  return Math.floor(random * (max - min) + min)
}

class Game extends Component {
  constructor(props) {
    super(props)
    this.challengeNumbers = []
    this.target = '?'
  }

  static bgColors = {
    new: 'lightblue',
    playing: 'deepskyblue',
    over: 'lightgreen',
    streak: 'darkorange'
  }

  static gameStatusEnum = {
    new: 'new',
    over: 'over',
    playing: 'playing',
    match: 'match',
    miss: 'miss'
  }

  static getColorFromStatus = () => Game.bgColors[this.state.gameStatus]

  state = {
    gameStatus: Game.gameStatusEnum.new,
    remainingSeconds: this.props.initialSeconds,
    selectedIds: [],
    currentSum: 0,
    matchCount: 0,
    streakCount: 0,
    longestStreak: 0
  }

  componentDidMount() {
    this.startGame()
  }

  isNumberAvailable = numberIndex =>
    this.state.selectedIds.indexOf(numberIndex) === -1

  startGame = () => {
    this.challengeNumbers = Array.from({
      length: this.props.challengeSize
    }).map(() => randomNumberBetween(...this.props.challengeRange))

    this.target = sum(sampleSize(this.challengeNumbers, this.props.answerSize))

    this.setState(
      {
        gameStatus: Game.gameStatusEnum.playing,
        selectedIds: [],
        currentSum: 0
      },
      () => {
        this.intervalId = setInterval(() => {
          this.setState(prevState => {
            const newRemainingSeconds = prevState.remainingSeconds - 1
            if (newRemainingSeconds === 0) {
              clearInterval(this.intervalId)
              return {
                gameStatus: Game.gameStatusEnum.over,
                remainingSeconds: 0
              }
            }
            return { remainingSeconds: newRemainingSeconds }
          })
        }, 1000)
      }
    )
  }

  selectNumber = numberIndex => {
    this.setState(
      prevState => {
        if (prevState.gameStatus !== Game.gameStatusEnum.playing) {
          return null
        }
        const newSelectedIds = [...prevState.selectedIds, numberIndex]
        const currSum = newSelectedIds.reduce(
          (acc, curr) => acc + this.challengeNumbers[curr],
          0
        )
        const gameStatus = this.calcGameStatus(newSelectedIds)
        let newStreakCount = prevState.streakCount
        let newMatchCount = prevState.matchCount
        let newLongestStreak = prevState.longestStreak

        if (gameStatus === Game.gameStatusEnum.match) {
          newStreakCount = prevState.streakCount += 1
          if (newStreakCount >= prevState.longestStreak) {
            console.log('Longest Streak Increase')
            newLongestStreak = prevState.longestStreak += 1
          }
          newMatchCount = prevState.matchCount += 1
        } else if (gameStatus === Game.gameStatusEnum.miss) {
          newStreakCount = 0
        }

        return {
          selectedIds: newSelectedIds,
          gameStatus: gameStatus,
          currentSum: currSum,
          streakCount: newStreakCount,
          matchCount: newMatchCount,
          longestStreak: newLongestStreak
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
      if (sumSelected === this.target) {
        console.log('Streak Increase')
        return Game.gameStatusEnum.match
      } else {
        return Game.gameStatusEnum.playing
      }
    } else {
      console.log(`Matched: ${this.props.answerSize} numbers`)
      if (sumSelected === this.target) {
        console.log('Streak Increase')
        return Game.gameStatusEnum.match
      } else {
        console.log('Streak Reset')
        return Game.gameStatusEnum.miss
      }
    }
  }

  componentDidUpdate() {
    const { gameStatus, longestStreak, matchCount } = this.state

    if (gameStatus === Game.gameStatusEnum.over) {
      console.log('GameOver')
      clearInterval(this.intervalId)
      this.props.gameOver(matchCount, longestStreak)
    }

    if (
      [Game.gameStatusEnum.match, Game.gameStatusEnum.miss].includes(gameStatus)
    ) {
      console.log('Match or Miss: Start Game')
      this.startGame()
    }
  }

  render() {
    const {
      gameStatus,
      remainingSeconds,
      currentSum,
      streakCount,
      matchCount
    } = this.state
    let streakColor
    if (streakCount >= 3) {
      streakColor = Game.bgColors.streak
    }
    return (
      <div className='game'>
        <div className='header'>
          <div className='score-count'>Score: {matchCount}</div>

          {gameStatus === Game.gameStatusEnum.playing && (
            <Timer value={remainingSeconds} />
          )}

          <div className='streak-count' style={{ color: streakColor }}>
            Streak: {streakCount}
          </div>
        </div>
        Target Sum:
        <div
          className='target'
          style={{ backgroundColor: Game.bgColors[gameStatus] }}
        >
          {gameStatus === Game.gameStatusEnum.new ? '?' : this.target}
        </div>
        Current Sum:
        <div className='target'>{currentSum}</div>
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
      </div>
    )
  }
}

export default Game
