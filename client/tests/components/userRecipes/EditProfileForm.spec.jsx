import React from 'react';

import EditProfileForm from '../../../components/userRecipes/EditProfileForm';

describe('EditProfileForm component', () => {
  it('should render component', () => {
    const props = {
      user: {
        isLoading: false,
        userProfile: {
          username: 'John Mark',
          firstName: 'John',
          lastName: 'Mark',
          email: 'john@example.com',
          aboutMe: 'A lot about me',
        },
      },
      handleProfileChange: jest.fn(),
      handleSubmitProfile: jest.fn(),
      handleCancel: jest.fn(),
    };
    const wrapper = shallow(<EditProfileForm {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call onChange handler function', () => {
    const props = {
      user: {
        isLoading: false,
        userProfile: {
          username: 'John Mark',
          firstName: 'John',
          lastName: 'Mark',
          email: 'john@example.com',
          aboutMe: 'A lot about me',
        },
      },
      handleProfileChange: jest.fn(),
      handleSubmitProfile: jest.fn(),
      handleCancel: jest.fn(),
    };
    const wrapper = shallow(<EditProfileForm {...props} />);

    expect(wrapper.find('#about_user').childAt(0)
      .props().disabled).toBeTruthy();
    wrapper.find('#about_user').childAt(1).simulate(
      'change', { target: { value: 'JOHN' } }
    );
    expect(props.handleProfileChange).toBeCalled();
    wrapper.find('#about_user').childAt(2).simulate(
      'change', { target: { value: 'MARK' } }
    );
    expect(props.handleProfileChange).toBeCalled();
    expect(wrapper.find('#about_user').childAt(3)
      .props().disabled).toBeTruthy();
    wrapper.find('textarea#aboutMe').simulate('change', {
      target: { value: 'You can hola me to know' }
    });
    expect(props.handleProfileChange).toBeCalled();
    wrapper.find('button#confirm-edit-btn').simulate('click');
    expect(props.handleSubmitProfile).toBeCalled();
    wrapper.find('button#cancel-edit-btn').simulate('click');
    expect(props.handleCancel).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should show spinner', () => {
    const props = {
      user: {
        isLoading: true,
        userProfile: {
          username: 'John Mark',
          firstName: 'John',
          lastName: 'Mark',
          email: 'john@example.com',
          aboutMe: 'A lot about me',
        },
      },
      handleProfileChange: jest.fn(),
      handleSubmitProfile: jest.fn(),
      handleCancel: jest.fn(),
    };

    const wrapper = shallow(<EditProfileForm {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
});
