import React, { Component } from 'react';
// import { Switch, Route } from 'react-router';

import Users from './components/Users.jsx';

import './styles.css';

class App extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    return (
      <div>
        <p>This is from App!</p>
        <Users />
      </div>
    );
  };
}

export default App;