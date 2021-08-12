import React, { Component } from 'react';

class RatingCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.songTitle}</td>
        <td>{this.props.artist}</td>
        <td>{this.props.rating}</td>
        <td>{this.props.ratingId}</td>
      </tr>
    );
  }
}

export default RatingCard;