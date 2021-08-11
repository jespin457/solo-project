import React, { Component } from 'react';

class SongCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.songTitle} | {this.props.artist} | {this.props.songId}</p>
      </div>
    );
  }
}

export default SongCard;