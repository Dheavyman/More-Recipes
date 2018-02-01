import React from 'react';
import PropTypes from 'prop-types';

import Review from './Review';

const propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

/**
 * ReviewCollection component
 *
 * @param {object} props - The properties passed to the compoenent
 * @returns {object} - React element
 */
const ReviewCollection = (props) => {
  const { reviews } = props;

  return (
    <div className="row">
      <div className="col s12 valign-wrapper deep-orange darken-4">
        <h5 className="white-text">Reviews</h5>
      </div>
      <ul className="collection">
        {reviews && reviews.map(review => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </div>
  );
};

ReviewCollection.propTypes = propTypes;

export default ReviewCollection;
