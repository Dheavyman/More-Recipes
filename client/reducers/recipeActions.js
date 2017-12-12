import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  recipe: {},
  error: {},
  imageUploading: false,
  imageUrl: null,
  errorUploadingImage: {},
};

const recipeActions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recipe: action.payload,
        error: {},
      };

    case actionTypes.ADD_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case actionTypes.UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        imageUploading: true,
      };

    case actionTypes.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        imageUploading: false,
        imageUrl: action.payload,
      };

    case actionTypes.UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        imageUploading: false,
        errorUploadingImage: action.payload,
      };

    default:
      return state;
  }
};

export default recipeActions;
