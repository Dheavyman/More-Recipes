import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  userSignup: null,
  userSignin: null,
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
        userSignin: action.payload,
        error: {},
      };
    case actionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default user;
