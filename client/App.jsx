import React, { Component } from 'react';

import UserSignin from './components/UserSignin.jsx';
// import EditRatings from './components/EditRatings.jsx';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    console.log('logging from App.jsx, Line 12!');
  }

  render() {
    return (
      <div>
        <h1>Rate <s>Your</s> <b>My</b> Music</h1>
        <UserSignin />
        {/* <br></br>
        <hr></hr>
        <EditRatings /> */}
      </div>
    );
  };
}

export default App;