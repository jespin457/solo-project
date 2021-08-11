import React, { Component } from 'react';

import SongCard from './SongCard.jsx'

class DisplaySongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songCards: [
      <SongCard
      songId = "Song ID"
      songTitle = "Song Title"
      artist = "Artist"
      releaseYear = "Release Year"
      />,
      <SongCard
      songId = "N/A"
      songTitle = "Since I've Been Loving You"
      artist = "Led Zeppelin"
      releaseYear = "1970"
      />,
      ],
    }
  }

  render() {
    return (
      <div>
        {this.state.songCards}
      </div>
    );
  }
}

export default DisplaySongs;