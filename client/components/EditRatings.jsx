import React, { Component } from 'react';

class EditRatings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>Add a new rating!</h4>
        <input type="text" id="rating"></input>
        <input type="text" id="songId"></input>
        <button>Submit Rating!</button> 
        <br></br>
        <h4>Update one of your ratings!</h4>
        <input type="text" id="newRating"></input>
        <input type="text" id="ratingId"></input>
        <button>Update Rating!</button> 
        {/* Functionality: when clicking "Sign In!", it should be that the text boxes are 
          replaced with plain text that displays the signed-in user's username and email*/}
      </div>
    );
  }
}

export default EditRatings;