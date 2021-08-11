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
        <h1>Music Ratings and Reccommendations</h1>
        <Users />
      </div>
    );
  };
}

export default App;