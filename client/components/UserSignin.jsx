import React, { Component } from 'react';

import SongCard from './SongCard.jsx'
import RatingCard from './RatingCard.jsx'

class UserSignin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedInAlert : "",
      username: "",
      user_id: "go fuck yourself",

      retrievedLatestRatings: false,
      ratingCards : [],

      retrievedLatestSongs : false,
      songCards : [],
    }

    this.signIn = this.signIn.bind(this);
    this.getSongList = this.getSongList.bind(this);
    this.getUserRatingList = this.getUserRatingList.bind(this);
  }

  componentDidUpdate() {
    if (this.state.user_id) {
      console.log('We have a user _id now!!!: ', this.state.user_id);
    }
  }

  signIn() {
    fetch('/api/loginUser/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "username" : document.getElementById('signinUsername').value,
        "email": document.getElementById('signinEmail').value
      })
    })
    .then(response => response.json())
    .then(response => {this.setState({
      username: `${response.username}`,
      signedInAlert : `Signed into ${response.username}`,
      user_id: response._id
    })})
    .then(this.getSongList())
    .then(this.getUserRatingList());
  }

  getSongList() {
    fetch('/api/getSongs/', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(response => {this.setState({
      songCards : response,
      retrievedLatestSongs : true
    })});
  }

  getUserRatingList() {
    console.log(this.state.user_id);
    fetch('/api/getUserRatings/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify({
        "userId" : this.state.user_id
      })
    })
    .then(response => response.json())
    .then(response => {this.setState({
      ratingCards : response,
      retrievedLatestRatings : true
    })});
  }

  render() {
    let songsOnPage = [];
    for (let i = 0; i < this.state.songCards.length; i++) {
      let songInfo = this.state.songCards[i];
      console.log(songInfo);
      songsOnPage.push(
        <SongCard
          songTitle = {songInfo.title}
          artist = {songInfo.artist}
          songId = {songInfo._id}
          key = {`SongCard${i}`}
        />
      );
    }

    let ratingsOnPage = [];
    for (let i = 0; i < this.state.ratingCards.length; i++) {
      let ratingInfo = this.state.ratingCards[i];
      console.log(ratingInfo);
      ratingsOnPage.push(
        <RatingCard
          songTitle = {ratingInfo.song_title}
          artist = {ratingInfo.artist}
          rating = {ratingInfo.your_rating}
          ratingId = {ratingInfo.rating_id}
          key = {`RatingCard${i}`}
        />
      );
    }

    return (
      <div>
        <h3>Enter your Username and Email!</h3>
        <input type="text" id="signinUsername" placeholder="Username"></input>
        <input type="text" id="signinEmail" placeholder="Email"></input>
        <button onClick = {this.signIn}>Sign In!</button>
        <p>{this.state.signedInAlert}</p>
        
        <br></br>
        <hr></hr>

        <u><SongCard songTitle = "Song Title" artist = "Artist" songId = "Song ID"/></u>
        {songsOnPage}
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

        <u><RatingCard songTitle = "Song Title" artist = "Artist" rating = "Your Rating" ratingId = "Rating ID"/></u>
        {ratingsOnPage}
        <h4>Update one of your ratings</h4>
        <input type="text" id="newRating" placeholder="New Rating"></input>
        <input type="text" id="ratingId" placeholder="Rating ID"></input>
        <button id="updateRating">Update Rating</button>
        <h4>Delete one of your ratings</h4>
        <input type="text" id="ratingToDel" placeholder="Rating ID"></input>
        <button id="updateRating">Delete Rating</button>
      </div>
    );
  }
}

export default UserSignin;