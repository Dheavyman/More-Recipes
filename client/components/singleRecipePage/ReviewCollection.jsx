import React from 'react';
import PropTypes from 'prop-types';

import Review from './Review';

const ReviewCollection = (props) => {
  const { recipe } = props,
    { Reviews } = recipe;
  return (
    <div className="row">
      <div className="col s12 valign-wrapper deep-orange darken-4">
        <h5 className="white-text">Reviews</h5>
      </div>
      <ul className="collection">
        {Reviews && Reviews.map(review => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </div>
  );
};

ReviewCollection.propTypes = {
  recipe: PropTypes.shape().isRequired,
};

export default ReviewCollection;
