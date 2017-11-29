const initialState = {
  isLoading: false,
  userSignup: null,
  error: null
};

const user = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default user;
