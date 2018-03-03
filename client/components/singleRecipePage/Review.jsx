import React from 'react';
import PropTypes from 'prop-types';

import userAvatar from '../../public/images/user_avatar_1.png';

const propTypes = {
  review: PropTypes.shape({
    User: PropTypes.shape({
      fullName: PropTypes.string,
      userImage: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

/**
 * Function to format date
 *
 * @param {string} date - The date to be formated
 *
 * @returns {string} - The formated date
 */
const createdOn = date => new Date(date).toLocaleString();

/**
 * Review component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const Review = (props) => {
  const { review } = props;
  const { User: { fullName, userImage }, content, createdAt } = review;

  return (
    <li className="collection-item avatar">
      { review &&
      <div>
        <img src={userImage || userAvatar} alt="" className="circle" />
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

Review.propTypes = propTypes;

export default Review;
