import React from "react";
import StarRating from 'react-native-star-rating';
 
class CustomStar extends React.Component {
 
  constructor(props) {
    super(props);
  }
 
 
  render() {
    return (
      <StarRating
        disabled={true}
        maxStars={5}
        rating={this.props.starCount}
        fullStarColor={'#1a73e8'}
        starSize={20}
      />
    );
  }
}
 
export default CustomStar;