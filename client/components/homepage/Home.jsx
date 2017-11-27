import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actionCreators from '../../actions';
import common from '../common';
import Main from './Main';

const { Header, Footer } = common;

/**
 * Class representing the home component
 *
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {
  /**
   * Component did mount function
   *
   * @returns {object} The response from the server
   * @memberof Home
   */
  componentDidMount() {
    this.props.fetchRecipes();
  }

  /**
   * The render function
   *
   * @returns {any} React element
   * @memberof Home
   */
  render() {
    return (
      <div>
        <Header />
        <Main {...this.props} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);

Home.propTypes = {
  fetchRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
