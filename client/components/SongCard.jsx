import React, { Component } from 'react';

class SongCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.songTitle}</td>
        <td>{this.props.artist}</td>
        <td>{this.props.songId}</td>
      </tr>
    );
  }
}

export default SongCard;