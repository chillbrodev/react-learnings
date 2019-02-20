import React, { Component } from 'react'

class Rules extends Component {
  render() {
    return (
      <div>
        <div className='rules'>
          RULES:
          <br />
          Select up to {this.props.answerSize} numbers to make a sum.
          <br />
          Sums made in a row result in a streak.
          <br />
          The longer the streak the higher the score!
          <br />
        </div>
        <button className='rules-start' onClick={this.props.startGame}>
          Start
        </button>
      </div>
    )
  }
}

export default Rules
