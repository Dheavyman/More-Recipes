import React from 'react';

import UserProfile from '../../../components/userRecipes/UserProfile';

describe('UserProfile component', () => {
  let spy;

  afterEach(() => {
    spy.mockClear();
  });
  it('should render component', () => {
    spy = jest.spyOn(UserProfile.prototype, 'componentDidMount');
    const props = {
      fetchUserProfile: jest.fn(),
      editUserProfile: jest.fn(),
      uploadUserImage: jest.fn(),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
      user: {
        isFetchingUserProfile: false,
        imageUploading: false,
        userProfile: {
          fullName: 'John Mark',
          userImage: 'UseR image URL',
        },
        userImageUrl: '',
      },
    };
    const wrapper = shallow(<UserProfile {...props} />);

    expect(wrapper).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should show message for non existing user', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      editUserProfile: jest.fn(),
      uploadUserImage: jest.fn(),
      currentProfileUserId: 567,
      authenticatedUserId: 1,
      user: {
        isFetchingUserProfile: false,
        imageUploading: false,
        userProfile: {},
        userImageUrl: '',
      },
    };
    const wrapper = shallow(<UserProfile {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('h5').text()).toEqual('User does not exist');
    expect(wrapper).toMatchSnapshot();
  });
  it('should show spinner when loading user profile', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      editUserProfile: jest.fn(),
      uploadUserImage: jest.fn(),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
      user: {
        isFetchingUserProfile: true,
        imageUploading: false,
        userProfile: {
          fullName: 'John Mark',
          userImage: 'User image URL',
        },
        userImageUrl: '',
      },
    };
    const wrapper = shallow(<UserProfile {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('should show spinner when uploading image', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      editUserProfile: jest.fn(),
      uploadUserImage: jest.fn(),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
      user: {
        isLoading: false,
        imageUploading: true,
        userProfile: {
          fullName: 'John Mark',
          userImage: null,
        },
        userImageUrl: '',
      },
    };
    const wrapper = shallow(<UserProfile {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('should simulate click event', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      editUserProfile: jest.fn(),
      uploadUserImage: jest.fn(() => Promise.resolve()),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
      user: {
        isLoading: false,
        imageUploading: false,
        userProfile: {
          fullName: 'John Mark',
          userImage: 'User image URL',
        },
        userImageUrl: 'User new image URL',
        error: {}
      },
    };
    const wrapper = mount(<UserProfile {...props} />);

    expect(wrapper).toBeDefined();
    wrapper.find('input#user-image').simulate('change', {
      target: { files: [{ imageUrl: 'Use new image' }] },
      preventDefault: jest.fn(),
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('should simulate edit profile click event', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      editUserProfile: jest.fn(() => Promise.resolve()),
      uploadUserImage: jest.fn(() => Promise.resolve()),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
      user: {
        isLoading: false,
        imageUploading: false,
        userProfile: {
          fullName: 'John Mark',
          userImage: 'User image URL',
        },
        userImageUrl: 'User new image URL',
        error: {}
      },
    };
    const wrapper = mount(<UserProfile {...props} />);
    spy = jest.spyOn(wrapper.instance(), 'handleStartEdit');
    wrapper.instance().forceUpdate();

    expect(wrapper).toBeDefined();
    wrapper.find('button#edit-btn').simulate('click');
    expect(wrapper.state('isEditing')).toEqual(true);
    wrapper.find('input[name="firstName"]').simulate('change', {
      target: { name: 'firstName', value: 'JOHN' },
    });
    expect(spy).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should simulate submit profile action', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      editUserProfile: jest.fn(() => Promise.resolve()),
      uploadUserImage: jest.fn(() => Promise.resolve()),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
      user: {
        isLoading: false,
        imageUploading: false,
        userProfile: {
          fullName: 'John Mark',
          userImage: 'User image URL',
        },
        userImageUrl: 'User new image URL',
        error: {}
      },
    };
    const wrapper = mount(<UserProfile {...props} />);
    spy = jest.spyOn(wrapper.instance(), 'handleSubmitProfile');
    wrapper.instance().forceUpdate();

    expect(wrapper).toBeDefined();
    wrapper.find('button#edit-btn').simulate('click');
    wrapper.find('button#confirm-edit-btn').simulate('click');
    expect(spy).toBeCalled();
  });
  it('should simulate close edit profile action', () => {
    const props = {
      fetchUserProfile: jest.fn(),
      editUserProfile: jest.fn(),
      uploadUserImage: jest.fn(() => Promise.resolve()),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
      user: {
        isLoading: false,
        imageUploading: false,
        userProfile: {
          fullName: 'John Mark',
          userImage: 'User image URL',
        },
        userImageUrl: 'User new image URL',
        error: {}
      },
    };
    const wrapper = mount(<UserProfile {...props} />);
    spy = jest.spyOn(wrapper.instance(), 'handleCancel');
    wrapper.instance().forceUpdate();

    expect(wrapper).toBeDefined();
    wrapper.find('button#edit-btn').simulate('click');
    expect(wrapper.state('isEditing')).toEqual(true);
    wrapper.find('button#cancel-edit-btn').simulate('click');
    expect(spy).toBeCalled();
    expect(wrapper.state('isEditing')).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });
});
