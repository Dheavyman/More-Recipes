import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.string,
};

const defaultProps = {
  size: undefined
};

/**
 * Spinner component
 *
 * @param {object} props - Properties passed to the component
 *
 * @returns {object} React element
 */
const Spinner = (props) => {
  const { size } = props;

  return (
    <div className={`preloader-wrapper ${size || null} active valign-wrapper`}>
      <div className="spinner-layer spinner-blue">
        <div className="circle-clipper left">
          <div className="circle" />
        </div><div className="gap-patch">
          <div className="circle" />
        </div><div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>

      <div className="spinner-layer spinner-red">
        <div className="circle-clipper left">
          <div className="circle" />
        </div><div className="gap-patch">
          <div className="circle" />
        </div><div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>

      <div className="spinner-layer spinner-yellow">
        <div className="circle-clipper left">
          <div className="circle" />
        </div><div className="gap-patch">
          <div className="circle" />
        </div><div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>

      <div className="spinner-layer spinner-green">
        <div className="circle-clipper left">
          <div className="circle" />
        </div><div className="gap-patch">
          <div className="circle" />
        </div><div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  );
};

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
