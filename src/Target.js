import React, { Component } from 'react'
import Game from './Game'
import _ from 'lodash'

class Target extends Component {
  target = _.sampleSize(
    this.props.challengeNumbers,
    this.props.challengeSize - 2
  ).reduce((acc, curr) => acc + curr, 0)

  render() {
    return (
      <div className='target'>
        {this.props.gameStatus === Game.gameStatusEnum.new ? '?' : this.target}
      </div>
    )
  }
}

export default Target
