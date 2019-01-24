import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Developer from "./Developer";

const list = [
  {
    title: `React`,
    url: `https://reactjs.org/`,
    author: `Jordan Walke`,
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: `Redux`,
    url: `https://reduxjs.org/`,
    author: `Dan Abramov, Andrew Clark`,
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

class App extends Component {
  render() {
    let user = {
      firstName: "Blue",
      lastName: "Topaz"
    };
    const helloWorld = `Welcome to the Road to Learn React Dev`;
    const name = `${user.firstName} ${user.lastName}`;
    const dev = new Developer("Bill", "Shots");
    return (
      <div className="App">
        <h2>{helloWorld}</h2>
        <h3>My name is {name}</h3>

        <h3>Here is a cool list:</h3>
        {list.map(item => {
          return (
            <div key={item.objectID}>
              <br />
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <br />
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </div>
          );
        })}

        <h3>Developer is: {dev.getName()}</h3>
      </div>
    );
  }
}

export default App;
