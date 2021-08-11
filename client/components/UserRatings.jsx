import React, { Component } from 'react';

import RatingCard from './RatingCard.jsx'

class UserRatings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingCards: [
      <RatingCard
      songTitle = "The Worst Guys"
      artist = "Childish Gambino"
      rating = "3"
      ratingId = "N/A"
      />,
      ],
    }
  }

  render() {
    return (
      <div>
        <u>
        <RatingCard
          songTitle = "Song Title"
          artist = "Artist"
          rating = "Your Rating"
          ratingId = "Rating ID"
        />
        </u>
        {this.state.ratingCards}
      </div>
    );
  }
}

export default UserRatings;