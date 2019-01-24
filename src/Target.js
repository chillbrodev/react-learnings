import React, { Component } from "react";
import _ from "lodash";

class Target extends Component {
  target = _.sampleSize(
    this.props.challengeNumbers,
    this.props.challengeSize - 2
  ).reduce((acc, curr) => acc + curr, 0);

  render() {
    return <div className="target">{this.target}</div>;
  }
}

export default Target;
