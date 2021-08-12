import React, { Component } from 'react';

class RatingCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <th>{this.props.songTitle}</th>
        <th>{this.props.artist}</th>
        <th>{this.props.rating}</th>
        <th>{this.props.ratingId}</th>
      </tr>
    );
  }
}

export default RatingCard;