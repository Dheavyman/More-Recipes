import React from 'react';
import PropTypes from 'prop-types';

import userImage from '../../public/images/user.jpg';

const createdOn = date => new Date(date).toLocaleString();

const Review = (props) => {
  const { review } = props,
    { User: { fullName }, content, createdAt } = review;
  return (
    <li className="collection-item avatar">
      { review &&
      <div>
        <img src={userImage} alt="" className="circle" />
        <span className="name"><b>{fullName}</b></span>
        <p className="created-on">{createdOn(createdAt)}</p>
        <p id="review-content">
          {content}
        </p>
      </div>
      }
    </li>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    User: PropTypes.shape({
      fullName: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default Review;
