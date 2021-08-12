import React, { Component } from 'react';

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'

import SongCard from './SongCard.jsx'
import RatingCard from './RatingCard.jsx'

import '../styles.css';

class UserSignin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedInAlert : "",
      username: "",
      user_id: null,

      retrievedLatestRatings: false,
      ratingCards : [],

      retrievedLatestSongs : false,
      songCards : [],
    }

    this.signIn = this.signIn.bind(this);
    this.getSongList = this.getSongList.bind(this);
    this.getUserRatingList = this.getUserRatingList.bind(this);
    this.addRating = this.addRating.bind(this);
    this.addSong = this.addSong.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.deleteRating = this.deleteRating.bind(this);
  }

  componentDidUpdate() {
    console.log('we updated! let\'s see user_id: ', this.state.user_id);
    if (this.state.user_id && !this.state.retrievedLatestSongs) {
      this.getSongList();
    }

    if (this.state.user_id && !this.state.retrievedLatestRatings) {
      this.getUserRatingList();
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
      user_id: response._id,
      retrievedLatestRatings: false
    })})
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
    // console.log(this.state.user_id);
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

  addRating() {
    try {
      fetch('/api/addRating/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "rating": document.getElementById('rating').value,
          "userId": this.state.user_id,
          "songId": document.getElementById('songId').value
        })
      })
      .then(response => response.json())
      .then(response => {this.setState({
        retrievedLatestRatings: false
      })})
    } catch (err) {
      console.log('Error occured when attempted request to POST rating. Are you signed in? Did you leave a paramater null?');
      console.log(err);
    }
  }

  addSong() {
    try {
      fetch('/api/addSong', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "title": document.getElementById('newTitle').value,
          "artist": document.getElementById('newArtist').value,
          "releaseYear": 1000 //the releaseYear column is sorta useless now...w/e
        })
      })
      .then(response => response.json())
      .then(response => {this.setState({
        retrievedLatestSongs: false
      })})
    } catch(err) {
      console.log('Error occured when attempted request to POST song. Are you signed in? Did you leave a paramater null?')
      console.log(err);
    }
  }

  updateRating() {
    try {
      fetch('/api/updateRating', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          newRating: document.getElementById('newRating').value,
          ratingid: document.getElementById('ratingIdToUpdate').value,
        })
      })
      .then(response => response.json())
      .then(response => {this.setState({
        retrievedLatestRatings: false
      })})
    } catch(err) {
      console.log('Error occured when attempted request to PATCH rating. Are you signed in? Did you leave a paramater null?')
      console.log(err);
    }
  }

  deleteRating() {
    try {
      fetch('/api/deleteRating', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ratingId: document.getElementById('ratingToDel').value
        })
      })
      .then(response => response.json())
      .then(response => {this.setState({
        retrievedLatestRatings: false
      })})
    } catch(err) {
      console.log('Error occured when attempted request to DELETE rating. Are you signed in? Did you leave a paramater null?')
      console.log(err);
    }
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
        <Card id="signInCard">
          <h4>Enter your Username and Password!</h4>
          <input type="text" id="signinUsername" placeholder="Username"></input>
          <input type="password" id="signinEmail" placeholder="Password"></input>
          <Button variant="primary" id="signinButton" onClick = {this.signIn}>Sign In!</Button>
          <p>{this.state.signedInAlert}</p>
        </Card>
        
        <br></br>
        <hr></hr>
        <br></br>

        <Table striped bordered hover id="songTable">
          <thead>
            <tr>
              <th colSpan="3" style={{fontWeight: '700'}}>Songs List</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th style={{fontWeight: '600'}}>Song Title</th>
              <th style={{fontWeight: '600'}}>Artist</th>
              <th style={{fontWeight: '600'}}>Song ID</th>
            </tr>
          </thead>
          <tbody>
            {songsOnPage}
          </tbody>
        </Table>

        <p><u>Add a rating</u></p>
        <input type="text" id="rating" placeholder="Rating"></input>
        <input type="text" id="songId" placeholder="Song ID"></input>
        <Button variant="outline-success" onClick = {this.addRating}>Submit Rating</Button>
        <p><u>Add a song to the database</u></p>
        <input type="text" id="newTitle" placeholder="Title"></input>
        <input type="text" id="newArtist" placeholder="Artist"></input> 
        <Button variant="outline-success" onClick={this.addSong}>Add Song</Button>

        <br></br>
        <br></br>
        <br></br>

        <Table striped bordered hover id="ratingTable">
          <thead>
            <tr>
              <th colSpan="4" style={{fontWeight: '700'}}>Your Ratings</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th style={{fontWeight: '600'}}>Song Title</th>
              <th style={{fontWeight: '600'}}>Artist</th>
              <th style={{fontWeight: '600'}}>Your Rating</th>
              <th style={{fontWeight: '600'}}>Rating ID</th>
            </tr>
          </thead>
          <tbody>
            {ratingsOnPage}
          </tbody>
        </Table>

        <p><u>Update one of your ratings</u></p>
        <input type="text" id="newRating" placeholder="New Rating"></input>
        <input type="text" id="ratingIdToUpdate" placeholder="Rating ID"></input>
        <Button variant="outline-warning" onClick={this.updateRating}>Update Rating</Button>
        <p><u>Delete one of your ratings</u></p>
        <input type="text" id="ratingToDel" placeholder="Rating ID"></input>
        <Button variant="outline-danger" onClick={this.deleteRating}>Delete Rating</Button>
      </div>
    );
  }
}

export default UserSignin;