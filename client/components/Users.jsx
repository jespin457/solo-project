import React, { Component } from 'react';

class Users extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Enter your Username and Email!</h3>
        <input type="text" id="username"></input>
        <input type="text" id="email"></input>
        <button>Sign In!</button> 
        {/* Functionality: when clicking "Sign In!", it should be that the text boxes are 
          replaced with plain text that displays the signed-in user's username and email*/}
      </div>
    );
  }
}

export default Users