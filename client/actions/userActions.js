import axios from 'axios';

const userSignupRequest = () => ({
  type: 'USER_SIGNUP_REQUEST',
});

const userSignupSuccess = data => ({
  type: 'USER_SIGNUP_SUCCESS',
  payload: data,
});

const userSignupFailure = error => ({
  type: 'USER_SIGNUP_FAILURE',
  payload: error,
});

const userSigninRequest = () => ({
  type: 'USER_SIGNIN_REQUEST',
});

const userSigninSucess = data => ({
  type: 'USER_SIGNIN_SUCCESS',
  payload: data,
});

const userSigninFailure = error => ({
  type: 'USER_SIGNIN_SUCCESS',
  payload: error,
});

const signupUser = values => (dispatch) => {
  dispatch(userSignupRequest());
  axios.post('http://127.0.0.1:3000/api/v1/users/signup', values)
    .then((response) => {
      dispatch(userSignupSuccess(response.data));
    })
    .catch((error) => {
      dispatch(userSignupFailure(error));
    });
};

const signinUser = values => (dispatch) => {
  dispatch(userSigninRequest());
  axios.post('http://127.0.0.1:3000/api/v1/users/signin', values)
    .then((response) => {
      dispatch(userSigninSucess(response.data));
    })
    .catch((error) => {
      dispatch(userSigninFailure(error));
    });
};

export { userSignupRequest, userSignupSuccess, userSignupFailure,
  signupUser, signinUser };
