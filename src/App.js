import React, { Component } from 'react'
import Title from './screens/Title'
import Game from './screens/Game'
import newId from './utils/newId'
import Leaderboard from './screens/Leaderboard'
import './App.css'
import Gameover from './screens/Gameover'

class App extends Component {
  state = {
    displayGame: false,
    displayLeader: false,
    displayGameOver: false,
    answerSize: 4
  }

  showGameComponent = () => {
    this.setState({
      displayGame: !this.state.displayGame
    })
  }

  showLeaderboardComponent = () => {
    console.log('Display Leaderboard')
    this.setState({
      displayLeader: !this.state.displayLeader
    })
  }

  showGameOverComponent = (score, streak) => {
    console.log('Display Gameover/Score Screen')
    this.setState({
      displayGameOver: !this.state.displayGameOver,
      displayGame: false,
      displayLeader: false,
      gameScore: score,
      gameStreaks: streak
    })
  }

  showTitleComponent = () => {
    console.log('Display Title Screen')
    this.setState({
      displayGame: false,
      displayLeader: false,
      displayGameOver: false
    })
  }

  render() {
    const {
      displayGame,
      displayLeader,
      displayGameOver,
      gameScore,
      gameStreaks
    } = this.state
    let screen
    if (displayGame) {
      screen = (
        <Game
          key={newId()}
          challengeSize={6}
          challengeRange={[2, 9]}
          initialSeconds={60}
          answerSize={this.state.answerSize}
          gameOver={this.showGameOverComponent}
        />
      )
    } else if (displayLeader) {
      screen = (
        <Leaderboard
          gameId={newId()}
          showTitleComponent={this.showTitleComponent}
        />
      )
    } else if (displayGameOver) {
      screen = (
        <Gameover
          gameId={newId()}
          showTitleComponent={this.showTitleComponent}
          showLeaderboardComponent={this.showLeaderboardComponent}
          gameScore={gameScore}
          gameStreak={gameStreaks}
        />
      )
    } else {
      screen = (
        <Title
          gameId={newId()}
          answerSize={this.state.answerSize}
          showGameComponent={this.showGameComponent}
          showLeaderboardComponent={this.showLeaderboardComponent}
        />
      )
    }

    return <div>{screen}</div>
  }
}

export default App
