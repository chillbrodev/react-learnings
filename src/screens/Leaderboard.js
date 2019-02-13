import React, { Component } from 'react'
import axios from 'axios'
import API_URLS from '../utils/apiUrls'
import newId from '../utils/newId'

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userScores: {
        data: [
          {
            userName: '',
            score: 0
          }
        ]
      }
    }
  }

  componentDidMount() {
    axios.get(API_URLS.DEV.ALL_SCORES_API).then(res => {
      console.log(JSON.stringify(res.data))
      const userScores = res.data
      this.setState({ userScores })
    })
  }

  compare(userA, userB) {
    if (userA.score < userB.score) return -1
    if (userA.score > userB.score) return 1
    return 0
  }

  render() {
    const { userScores } = this.state
    const tableRows = userScores.data
      .filter(item => item.score > 0)
      .map(item => {
        return (
          <tbody key={newId()}>
            <tr>
              <td key={item.userName}>{item.userName}</td>
              <td key={item.score}>{item.score}</td>
            </tr>
          </tbody>
        )
      })
    return (
      <div>
        <div className='header'>Sum It Up Leaderboard</div>
        <br />
        <table>{tableRows}</table>
        <div className='footer'>
          <button className='btn' onClick={this.props.showTitleComponent}>
            Go to Menu
          </button>
        </div>
      </div>
    )
  }
}

export default Leaderboard
