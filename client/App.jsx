import React, { Component } from 'react';

import UserSignin from './components/UserSignin.jsx';
import EditRatings from './components/EditRatings.jsx';
import UserRatings from './components/UserRatings.jsx'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Music Ratings</h1>
        <UserSignin />
        <UserRatings/>
        <EditRatings />
      </div>
    );
  };
}

export default App;