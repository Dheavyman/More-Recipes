import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actionCreators from '../../actions';
import Footer from '../common/Footer';
import Header from './Header';
import Main from './Main';
import { decodeToken } from '../../utils/authenticate';

/**
 * Class representing user recipes
 *
 * @class UserRecipes
 * @extends {React.Component}
 */
class UserRecipes extends React.Component {
  /**
   * Component did mount life cycle method
   *
   * @returns {function} Call the API
   * @memberof UserRecipes
   */
  componentDidMount() {
    const { user: { id } } = decodeToken(),
      userId = id,
      { fetchUserRecipes } = this.props;

    fetchUserRecipes(userId);
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof UserRecipes
   */
  render() {
    return (
      <div>
        <header>
          <Header {...this.props} />
        </header>
        <main>
          <Main reloadPage={this.componentDidMount} {...this.props} />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

UserRecipes.propTypes = {
  fetchUserRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  userRecipes: state.userRecipes,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
