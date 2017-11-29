const user = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SIGNUP_REQUEST':
      return {
        ...state,
        isLoading: true,
        userSignup: null
      };
    case 'USER_SIGNUP_SUCCESS':
      return {
        ...state,
        isLoading: false,
        userSignup: action.payload
      };
    case 'USER_SIGNUP_FAILURE':
      return {
        ...state,
        isLoading: false,
        userSignup: null,
        error: action.payload
      };
    case 'USER_SIGNIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        userSignin: null
      };
    case 'USER_SIGNIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        userSignin: action.payload
      };
    case 'USER_SIGNIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        userSignin: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default user;
