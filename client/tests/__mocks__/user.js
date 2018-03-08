export default {
  userSignupSuccess: {
    id: 1,
    username: 'George',
    email: 'george@example.com',
    fullName: 'George Fernando',
    notification: false,
    token: 'token',
  },
  userSignupFailure: {
    status: 'Fail',
    message: 'Error message',
  },
  userSigninSuccess: {
    id: 1,
    username: 'George',
    email: 'george@example.com',
    fullName: 'George Fernando',
    notification: false,
    token: 'token',
  },
  userSigninFailure: {
    status: 'Fail',
    message: 'Error message',
  },
  userProfileSuccess: {
    userDetails: 'User details',
  },
  userProfileFailure: {
    status: 'Fail',
    message: 'Error message',
  },
  editProfileSuccess: {
    userDetails: 'User details',
  },
  editProfileFailure: {
    status: 'Fail',
    message: 'Error message',
  },
  uploadImageSuccess: {
    imageUrl: 'image url'
  },
  uploadImageFailure: {
    message: 'Error message',
  },
  signupData: {
    firstName: 'George',
    lastName: 'Fernando',
    username: 'George',
    email: 'george@example.com',
    password: 'password',
  },
  invalidSignupData: {
    firstName: 'George',
    lastName: 'Duke',
    username: 'George',
    email: 'georgeduke@example.com',
    password: 'password',
  },
  signupSuccessResponse: {
    data: {
      user: {
        username: 'User data',
        token: 'user assigned token',
      },
    },
  },
  signupFailureResponse: {
    status: 'Fail',
    message: 'Username already exist',
  },
  signinData: {
    username: 'George',
    password: 'password',
  },
  invalidSigninData: {
    username: 'Not existing',
    password: 'Not existing',
  },
  signinSuccessResponse: {
    data: {
      user: {
        fullName: 'George Fernando',
        token: 'token',
      },
    },
  },
  signinFailureResponse: {
    status: 'Fail',
    message: 'Username or password incorrect',
  },
  fetchProfileSuccessResponse: {
    data: {
      user: {
        firstName: 'George',
        lastName: 'Fernando',
        username: 'George',
        userImage: 'userImage',
        aboutMe: 'This is about me',
      }
    }
  },
  fetchProfileFailureResponse: {
    status: 'Error',
    message: 'Invalid token'
  },
  editProfileSuccessResponse: {
    status: 'Success',
    message: 'User profile updated',
    data: {
      user: {
        firstName: 'George',
        lastName: 'NewFernando',
        username: 'George',
        userImage: 'userImage',
        aboutMe: 'This is about another Fernando',
      },
    },
  },
  editProfileFailureResponse: {
    status: 'Fail',
    message: 'Error updating user profile',
  },
  userImageFile: {
    imageData: 'image data',
  },
  uploadImageSuccessResponse: {
    secure_url: 'secure image url',
  },
  uploadImageFailureResponse: {
    data: {
      error: 'Error uploading image',
    },
  }
};
