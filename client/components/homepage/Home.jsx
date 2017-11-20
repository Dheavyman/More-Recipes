import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

import common from '../common';
import Main from './Main';

const { Header, Footer } = common;
const Home = props => (
  <div>
    <Header />
    <Main recipes={props.recipes} />
    <Footer />
  </div>
);

const mapStateToProps = state => ({
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);

Home.propTypes = {
  recipes: PropTypes.array,
};

Home.defaultProps = {
  recipes: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
