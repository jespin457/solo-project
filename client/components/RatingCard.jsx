import React, { Component } from 'react';

class RatingCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.songTitle} | {this.props.artist} | {this.props.rating} | {this.props.ratingId}</p>
      </div>
    );
  }
}

export default RatingCard;