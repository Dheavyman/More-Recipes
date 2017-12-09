import React from 'react';
import PropTypes from 'prop-types';

const UserRecipeCard = props => (
  <div className="col s12 m6 l3">
    <div id="recipes" className="card large">
      <a href="recipe.html"><span className="card-title">Spanish Chips</span></a>
      <div className="card-image">
        <a href="recipe.html"><img src="images/image03.jpg" alt="" /></a>
      </div>
      <div className="card-content">
        <p>A light meal full of nutrients with sweet taste.</p>
      </div>
      <div className="card-action">
        <ul className="center-align">
          <li id="views"><i className="material-icons tiny">visibility</i>
            200
          </li>
          <li id="favorites"><i className="material-icons tiny">favorite</i>
            20
          </li>
          <li id="upvotes"><i className="material-icons tiny">thumb_up</i>
            50
          </li>
          <li id="downvotes"><i className="material-icons tiny">thumb_down</i>
            10
          </li>
        </ul>
        <a
          role="button"
          tabIndex="0"
          onClick={props.handleOpenEdit}
          className={`btn-floating waves-effect waves-light green modal-trigger
          right`}
        >
          <i className="material-icons">edit</i>
        </a>
        <a
          role="button"
          tabIndex="0"
          onClick={props.handleOpenDelete}
          className={`modal-trigger btn-floating waves-effect waves-light red
          right`}
        >
          <i className="material-icons">delete</i>
        </a>
      </div>
    </div>
  </div>
);

UserRecipeCard.propTypes = {
  handleOpenEdit: PropTypes.func.isRequired,
  handleOpenDelete: PropTypes.func.isRequired,
};

export default UserRecipeCard;
