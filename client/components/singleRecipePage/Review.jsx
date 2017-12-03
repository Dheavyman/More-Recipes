import React from 'react';
import PropTypes from 'prop-types';

const createdOn = date => new Date(date).toLocaleString();

const Review = (props) => {
  const { review } = props,
    { User: { fullName }, content, createdAt } = review;
  return (
    <li className="collection-item avatar">
      <img src="../../public/images/user.jpg" alt="" className="circle" />
      <span className="name"><b>{fullName}</b></span>
      <p className="created-on">{createdOn(createdAt)}</p>
      <p id="review-content">
        {content}
      </p>
    </li>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    User: PropTypes.shape({
      fullName: PropTypes.string,
    }).isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Review;
