import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class App extends Component {
  componentWillReceiveProps({ data: { newBlock } }) {
    console.log(newBlock.number);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
        </div>
      </div>
    );
  }
}

const subNewNotification = gql`
  subscription {
    newBlock {
      number
    }
  }
`;

export default graphql(subNewNotification)(App);