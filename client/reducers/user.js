import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE, USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  userSignup: null,
  userSignin: null,
  error: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userSignup: action.payload,
        error: {},
      };
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userSignin: action.payload,
        error: {},
      };
    case USER_SIGNIN_FAILURE:
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
