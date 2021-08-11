import React, { Component } from 'react';
// import { Switch, Route } from 'react-router';

import Users from './components/Users.jsx';

class App extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    return (
      <div>
        <input type="text"></input>
        <button>Click Me!</button>
        <p>This is from App!</p>
        <Users />
      </div>
    );
  };
}

export default App;