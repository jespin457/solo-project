import React, { Component } from 'react';

class SongCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <th>{this.props.songTitle}</th>
        <th>{this.props.artist}</th>
        <th>{this.props.songId}</th>
      </tr>
    );
  }
}

export default SongCard;