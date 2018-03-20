import React from 'react';

import { UserRecipes } from '../../../components/userRecipes';
import userMockData from '../../__mocks__/user';

describe('UserRecipes component', () => {
  let spy;

  beforeEach(() => {
    localStorage.setItem(
      'token',
      userMockData.signinSuccessResponse.data.user.token
    );
  });
  afterEach(() => {
    spy.mockClear();
    localStorage.clear();
  });
  it('should render component', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      fetchUserRecipes: jest.fn(),
      fetchUserFavorites: jest.fn(),
      uploadImage: jest.fn(),
      addRecipe: jest.fn(),
      editRecipe: jest.fn(),
      deleteRecipe: jest.fn(),
      setFavorite: jest.fn(),
      searchRecipe: jest.fn(),
      user: {
        errorFetchingProfile: {},
      },
      userRecipes: {
        imageUploading: false,
        imageUrl: '',
      },
      match: {
        params: {
          userId: 2,
        },
      },
      logoutUser: jest.fn(),
      history: {
        push: jest.fn(),
        replace: jest.fn(),
      },
      location: {
        pathname: 'users/2/dashboard',
      },
    };
    spy = jest.spyOn(UserRecipes.prototype, 'componentWillMount');
    const wrapper = shallow(<UserRecipes {...props} />);

    expect(wrapper).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.currentProfileUserId).toEqual(2);
    expect(wrapper).toMatchSnapshot();
  });
  it('should redirect unauthenticated user to homepage', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      fetchUserRecipes: jest.fn(),
      fetchUserFavorites: jest.fn(),
      uploadImage: jest.fn(() => Promise.resolve()),
      addRecipe: jest.fn(() => Promise.resolve()),
      editRecipe: jest.fn(() => Promise.resolve()),
      deleteRecipe: jest.fn(() => Promise.resolve()),
      setFavorite: jest.fn(() => Promise.resolve()),
      searchRecipe: jest.fn(),
      user: {
        errorFetchingProfile: {},
      },
      userRecipes: {
        imageUploading: false,
        imageUrl: '',
      },
      match: {
        params: {
          userId: 2,
        },
      },
      logoutUser: jest.fn(),
      history: {
        push: jest.fn(),
        replace: jest.fn(),
      },
      location: {
        pathname: 'users/2/dashboard',
      },
    };
    spy = jest.spyOn(UserRecipes.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<UserRecipes {...props} />);

    expect(wrapper).toBeDefined();
    wrapper.setProps({
      user: { errorFetchingProfile: { message: 'jwt expired' } },
    });
    expect(spy).toBeCalled();
    expect(props.history.push).toBeCalled();
    wrapper.setProps({
      location: { pathname: 'users/5/dashboard' }
    });
    expect(spy).toBeCalled();
    expect(props.fetchUserProfile).toBeCalled();
    expect(props.fetchUserRecipes).toBeCalled();
    expect(props.fetchUserFavorites).toBeCalled();
  });
  it('should simulate instance methods event', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      fetchUserRecipes: jest.fn(),
      fetchUserFavorites: jest.fn(),
      uploadImage: jest.fn(() => Promise.resolve()),
      addRecipe: jest.fn(() => Promise.resolve()),
      editRecipe: jest.fn(() => Promise.resolve()),
      deleteRecipe: jest.fn(() => Promise.resolve()),
      setFavorite: jest.fn(() => Promise.resolve()),
      searchRecipe: jest.fn(),
      user: {
        errorFetchingProfile: {},
      },
      userRecipes: {
        imageUploaded: false,
        imageUrl: '',
      },
      match: {
        params: {
          userId: 2,
        },
      },
      logoutUser: jest.fn(),
      history: {
        push: jest.fn(),
        replace: jest.fn(),
      },
      location: {
        pathname: 'users/2/dashboard',
      },
    };
    const recipe = {
      id: 5,
      title: 'Macaroni',
      category: 'Dinner',
      description: 'Tasty macaroni',
      preparationTime: 45,
      ingredients: 'Macaroni, groundnut oil, salt',
      directions: 'Do this, do that',
      recipeImage: 'Recipe image',
      upvotes: 0,
      downvotes: 0,
      views: 1,
      favorites: 0,
    };
    const wrapper = shallow(<UserRecipes {...props} />);
    spy = jest.spyOn(wrapper.instance(), 'handleImagePreview');

    expect(wrapper).toBeDefined();

    wrapper.instance().handleOpenEdit(recipe);
    expect(wrapper.instance().state.recipeToEdit).toEqual(recipe);
    expect(wrapper.instance().state.openEdit).toEqual(true);

    wrapper.instance().handleEditChange({
      target: { name: 'description', value: 'Iyabasira Rice' }
    });
    expect(wrapper.instance().state.recipeToEdit.description)
      .toEqual('Iyabasira Rice');

    wrapper.instance().handleEditRecipe({ preventDefault: jest.fn() });
    expect(props.uploadImage).not.toBeCalled();
    expect(props.editRecipe).toBeCalled();

    wrapper.setState({ imageData: 'image data' });
    wrapper.instance().handleEditRecipe({ preventDefault: jest.fn() });
    expect(props.uploadImage).toBeCalled();

    wrapper.instance().handleOpenDelete(
      5,
      'Are you sure you want to delete this recipe?',
      'Delete Recipe',
      'Delete'
    );
    expect(wrapper.instance().state.recipeId).toEqual(5);
    expect(wrapper.instance().state.deleteMessage).toEqual(
      'Are you sure you want to delete this recipe?');
    expect(wrapper.instance().state.actionTitle).toEqual('Delete Recipe');
    expect(wrapper.instance().state.action).toEqual('Delete');
    expect(wrapper.instance().state.openDelete).toEqual(true);

    wrapper.instance().handleOpenAdd();
    expect(wrapper.instance().state.openAdd).toEqual(true);

    wrapper.instance().handleClose();
    expect(wrapper.instance().state.openEdit).toEqual(false);
    expect(wrapper.instance().state.openDelete).toEqual(false);
    expect(wrapper.instance().state.openAdd).toEqual(false);
    expect(wrapper.instance().state.category).toEqual('Select Category');
    expect(wrapper.instance().state.imagePreview).toEqual('');

    wrapper.instance().handleImagePreview('image data');
    expect(wrapper.instance().state.imagePreview).toEqual('image data');

    wrapper.instance().handleEditChange({
      target: { name: 'preparationTime', value: 74 }
    });
    expect(wrapper.instance().state.recipeToEdit.preparationTime).toEqual(74);

    wrapper.instance().handleChange({
      target: { name: 'title', value: 'German burger' },
    });
    expect(wrapper.instance().state.title).toEqual('German burger');

    wrapper.instance().handleSelect({ target: { value: 'Dinner' } });
    expect(wrapper.instance().state.category).toEqual('Dinner');

    wrapper.instance().handleDrop([{ preview: 'image file' }]);
    expect(spy).toBeCalled();
  });
  it('should handle submit events', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      fetchUserRecipes: jest.fn(),
      fetchUserFavorites: jest.fn(),
      uploadImage: jest.fn(() => Promise.resolve()),
      addRecipe: jest.fn(() => Promise.resolve()),
      editRecipe: jest.fn(() => Promise.resolve()),
      deleteRecipe: jest.fn(() => Promise.resolve()),
      setFavorite: jest.fn(() => Promise.resolve()),
      searchRecipe: jest.fn(),
      user: {
        errorFetchingProfile: {},
      },
      userRecipes: {
        imageUploading: false,
        imageUrl: '',
        error: {}
      },
      match: {
        params: {
          userId: 2,
        },
      },
      logoutUser: jest.fn(() => Promise.resolve()),
      history: {
        push: jest.fn(),
        replace: jest.fn(),
      },
      location: {
        pathname: 'users/2/dashboard',
      },
    };
    const wrapper = shallow(<UserRecipes {...props} />);

    expect(wrapper).toBeDefined();
    wrapper.setState({
      title: 'Macaroni',
      category: 'Dinner',
      description: 'Tasty macaroni',
      preparationTime: 45,
      ingredients: 'Macaroni, groundnut oil, salt',
      directions: 'Do this, do that',
      imageData: null,
    });
    wrapper.instance().handleAddRecipe({ preventDefault: jest.fn() });
    expect(props.uploadImage).not.toBeCalled();
    expect(wrapper).toMatchSnapshot();

    wrapper.setState({ imageData: 'image data' });
    wrapper.instance().handleAddRecipe({ preventDefault: jest.fn() });
    expect(props.uploadImage).toBeCalled();
    expect(props.addRecipe).toBeCalled();
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ userRecipes: { imageUploaded: true } });
    wrapper.instance().handleAddRecipe({ preventDefault: jest.fn() });
    expect(props.addRecipe).toBeCalled();
    expect(wrapper).toMatchSnapshot();

    wrapper.instance().handleLogoutUser();
    expect(props.logoutUser).toBeCalled();
    expect(wrapper).toMatchSnapshot();

    wrapper.instance().handleSearchCategory({ target: { name: 'rice' } });
    expect(props.history.push).toBeCalled();
    expect(wrapper).toMatchSnapshot();

    wrapper.instance().handleDeleteRecipe(2, 'Delete Recipe');
    expect(props.deleteRecipe).toBeCalled();
    wrapper.instance().handleDeleteRecipe(2, 'Remove Recipe');
    expect(props.setFavorite).toBeCalled();
  });
});
