import React, { Component } from 'react';

import SongCard from './SongCard.jsx'

class DisplaySongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songCards: [
      ],
    }
  }

  componentDidUpdate() {
    console.log("saw update from DisplaySongs.jsx!");
  }

  render() {
    return (
      <div>
        <u>
        <SongCard
          songTitle = "Song Title"
          artist = "Artist"
          songId = "Song ID"
        />
        </u>
        {this.state.songCards}
      </div>
    );
  }
}

export default DisplaySongs;