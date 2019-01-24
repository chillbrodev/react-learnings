import React, { Component } from "react";
import Table from "./Table";
import "./App.css";
import Form from "./Form";

class App extends Component {
  state = {
    characters: []
  };

  removeCharacter = index => {
    const { characters } = this.state;
    this.setState({
      characters: characters.filter((char, i) => {
        return i !== index;
      })
    });
  };

  handleSubmit = character => {
    this.setState({ characters: [...this.state.characters, character] });
  };

  render() {
    return (
      <div className="container">
        <h1>Data</h1>
        <Table
          characterData={this.state.characters}
          removeCharacter={this.removeCharacter}
        />
        <h1>Submit Form</h1>
        <Form handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
