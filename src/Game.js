import React, { Component } from "react";
import "./App.css";
import Number from "./Number";
import Target from "./Target";
import Timer from "./Timer";
//https://medium.freecodecamp.org/do-you-want-to-learn-more-about-react-lets-build-and-then-play-a-game-218e0da5be44
const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class Game extends Component {
  challengeNumbers = Array.from({ length: this.props.challengeSize }).map(() =>
    randomNumberBetween(...this.props.challengeRange)
  );

  render() {
    return (
      <div className="game">
        <div className="help">
          Pick 4 numbers that sum to the target in 15 seconds
        </div>
        <Target
          value={randomNumberBetween(30, 100)}
          challengeNumbers={this.challengeNumbers}
          challengeSize={this.props.challengeSize}
        />
        <div className="challenge-numbers">
          <Number value={8} />
          <Number value={5} />
          <Number value={12} />
          <Number value={13} />
          <Number value={5} />
          <Number value={16} />
        </div>
        <div className="footer">
          <Timer value={15} />
          <button>Start</button>
        </div>
      </div>
    );
  }
}

export default Game;
