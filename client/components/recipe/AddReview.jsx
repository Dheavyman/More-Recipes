import React from 'react';

const AddReview = () => (
  <div className="row">
    <div className="col s12 m12 l8">
      <form className="add-review col s12 center-align" method="post">
        <div className="row">
          <div type="text" className="input-field col s12">
            <textarea
              id="new-review"
              type="text"
              className="materialize-textarea"
              required
            />
            <label htmlFor="new-review">Add your review</label>
          </div>
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

export default AddReview;
