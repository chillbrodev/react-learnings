import React, { Component } from 'react'
import Title from './screens/Title'
import Game from './screens/Game'
import newId from './utils/newId'
import Leaderboard from './screens/Leaderboard'
import './App.css'

class App extends Component {
  state = {
    displayGame: false,
    displayLeader: false
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

  render() {
    const { displayGame, displayLeader } = this.state
    let screen
    if (displayGame) {
      screen = (
        <Game
          key={newId()}
          challengeSize={6}
          challengeRange={[2, 9]}
          initialSeconds={60}
          answerSize={4}
        />
      )
    } else if (displayLeader) {
      screen = <Leaderboard />
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
