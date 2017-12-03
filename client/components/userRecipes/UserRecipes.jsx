import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actionCreators from '../../actions';
import Footer from '../common/Footer';
import Header from './Header';
import Main from './Main';

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
    // console.log('User recipes mounted');
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
          <Main />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
