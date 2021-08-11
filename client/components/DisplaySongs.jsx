import React, { Component } from 'react';

import SongCard from './SongCard.jsx'
import UserRatings from './UserRatings.jsx';

class DisplaySongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songCards: [
      <SongCard
      songTitle = "Since I've Been Loving You"
      artist = "Led Zeppelin"
      songId = "N/A"
      />,
      ],
    }
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