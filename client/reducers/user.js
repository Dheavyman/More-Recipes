import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  userSignup: {},
  userSignin: {},
  isAuthenticated: !!localStorage.getItem('token'),
  error: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userSignup: action.payload,
        error: {},
      };
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case actionTypes.SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        userSignin: action.payload,
        error: {},
      };
    case actionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload
      };
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default user;
