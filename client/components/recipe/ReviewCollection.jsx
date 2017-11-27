import React from 'react';

import Review from './Review';

const ReviewCollection = () => (
  <div className="row">
    <div className="col s12 valign-wrapper deep-orange darken-4">
      <h5 className="white-text">Reviews</h5>
    </div>
    <ul className="collection">
      <Review />
      <Review />
    </ul>
  </div>
);

export default ReviewCollection;
