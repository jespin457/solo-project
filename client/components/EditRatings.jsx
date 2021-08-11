import React, { Component } from 'react';

import DisplaySongs from './DisplaySongs.jsx';
import UserRatings from './UserRatings.jsx';

class EditRatings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DisplaySongs />
        <h4>Add a rating</h4>
        <input type="text" id="rating" placeholder="Rating"></input>
        <input type="text" id="songId" placeholder="Song ID"></input>
        <button id="submitRating">Submit Rating</button>
        <h4>Add a song to the database</h4>
        <input type="text" id="newTitle" placeholder="Title"></input>
        <input type="text" id="newArtist" placeholder="Artist"></input>
        <input type="text" id="newYear" placeholder="Year"></input>
        <button id="updateRating">Add Song</button>
        <br></br>
        <br></br>
        <br></br>
        <UserRatings />
        <h4>Update one of your ratings</h4>
        <input type="text" id="newRating" placeholder="New Rating"></input>
        <input type="text" id="ratingId" placeholder="Rating ID"></input>
        <button id="updateRating">Update Rating</button>
        <h4>Delete one of your ratings</h4>
        <input type="text" id="ratingToDel" placeholder="Rating ID"></input>
        <button id="updateRating">Delete Rating</button>
        {/* Functionality: when clicking "Sign In!", it should be that the text boxes are 
          replaced with plain text that displays the signed-in user's username and email*/}
      </div>
    );
  }
}

export default EditRatings;