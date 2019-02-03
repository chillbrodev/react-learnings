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
    displayGameOver: true
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

  showGameOverComponent = () => {
    console.log('Display Gameover/Score Screen')
    this.setState({
      displayGameOver: !this.state.displayGameOver,
      displayGame: false,
      displayLeader: false
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
    const { displayGame, displayLeader, displayGameOver } = this.state
    let screen
    if (displayGame) {
      screen = (
        <Game
          key={newId()}
          challengeSize={6}
          challengeRange={[2, 9]}
          initialSeconds={10}
          answerSize={4}
          gameOver={this.showGameOverComponent}
        />
      )
    } else if (displayLeader) {
      screen = <Leaderboard showTitleComponent={this.showTitleComponent} />
    } else if (displayGameOver) {
      screen = (
        <Gameover
          showTitleComponent={this.showTitleComponent}
          showLeaderboardComponent={this.showLeaderboardComponent}
        />
      )
    } else {
      screen = (
        <Title
          gameId={newId()}
          showGameComponent={this.showGameComponent}
          showLeaderboardComponent={this.showLeaderboardComponent}
        />
      )
    }

    return <div>{screen}</div>
  }
}

export default App
