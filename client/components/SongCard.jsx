import React, { Component } from 'react';

class SongCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.songId} | {this.props.songTitle} | {this.props.artist} | {this.props.releaseYear}</p>
      </div>
    );
  }
}

export default SongCard;