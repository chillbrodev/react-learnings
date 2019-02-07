import React, { Component } from 'react'
import axios from 'axios'

class Gameover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: ''
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleUserNameChange(event) {
    this.setState({
      userName: event.target.value
    })
  }

  handleFormSubmit(event) {
    console.log(`A name was submitted: 
    UserName: ${this.state.userName}
    TotalScore: ${this.state.finalScore}`)
    event.preventDefault()
    this.props.showTitleComponent()
  }

  componentDidMount() {
    const { gameScore, gameStreak } = this.props
    let finalScore

    if (this.props.gameStreak > 0) {
      finalScore = gameScore * gameStreak + 1
    } else {
      finalScore = gameScore + 1
    }

    this.setState({
      finalScore: finalScore,
      baseScore: gameScore,
      longestStreak: gameStreak
    })
  }

  render() {
    const { finalScore, baseScore, longestStreak } = this.state
    return (
      <div>
        Base Score: {baseScore}
        <br />
        Longest Steak: {longestStreak}
        <br />
        Total Score: {finalScore}
        <form>
          <label>
            UserName:
            <input
              type='text'
              value={this.state.userName}
              onChange={this.handleUserNameChange}
            />
          </label>
          <button className='btn' onClick={this.handleFormSubmit}>
            Submit
          </button>
        </form>
        <br />
      </div>
    )
  }
}

export default Gameover
