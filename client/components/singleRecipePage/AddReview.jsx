import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';

const propTypes = {
  reviewContent: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddReview: PropTypes.func.isRequired,
  singleRecipe: PropTypes.shape({
    isLoading: PropTypes.bool,
  }).isRequired,
};

/**
 * Add review component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} - React element
 */
const AddReview = (props) => {
  const { reviewContent, handleChange, handleAddReview, singleRecipe } = props;
  const { isLoading } = singleRecipe;

  return (
    <div className="row">
      <div className="col s12 m12 l8">
        <form
          className="add-review col s12 center-align"
          onSubmit={handleAddReview}
        >
          <div className="row">
            <div type="text" className="input-field col s12">
              <textarea
                id="new-review"
                type="text"
                value={reviewContent}
                className="materialize-textarea"
                onChange={handleChange}
                required
              />
              <label htmlFor="new-review">Add your review</label>
            </div>
          </div>
          <div className="row" />
          <div className="center-align">
            {isLoading && <Spinner size="small" />}
          </div>
          <div className="row">
            <button
              type="submit"
              className={`btn waves-effect waves-light indigo accent-2
              white-text`}
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddReview.propTypes = propTypes;

export default AddReview;
