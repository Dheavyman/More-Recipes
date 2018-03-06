import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import userAvatar from '../../public/images/user_avatar_1.png';
import { decodeToken } from '../../utils/authenticate';

const propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    recipeId: PropTypes.number,
    User: PropTypes.shape({
      fullName: PropTypes.string,
      userImage: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  handleDeleteReview: PropTypes.func.isRequired,
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
  const { review, handleDeleteReview } = props;
  const {
    id, recipeId, userId, content, createdAt, User: { fullName, userImage }
  } = review;

  return (
    <li className="collection-item avatar">
      { review &&
      <div>
        <img src={userImage || userAvatar} alt="" className="circle" />
        <span className="name"><b>{fullName}</b></span>
        <p className="created-on">
          {createdOn(createdAt)}
          {userId === decodeToken().user.id &&
          <i
            role="button"
            tabIndex="0"
            className="material-icons delete-review right"
            onClick={() => handleDeleteReview(recipeId, id)}
            data-tip="Delete"
          >
            delete
          </i>
          }
        </p>
        <p className="review-content">
          {content}
        </p>
        <ReactTooltip />
      </div>
      }
    </li>
  );
};

Review.propTypes = propTypes;

export default Review;
