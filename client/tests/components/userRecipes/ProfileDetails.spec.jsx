import React from 'react';

import ProfileDetails from '../../../components/userRecipes/ProfileDetails';

describe('ProfileDetails component', () => {
  it('should render component', () => {
    const props = {
      user: {
        userProfile: {
          username: 'johnmark',
          firstName: 'John',
          lastName: 'Mark',
          email: 'john@example.com',
          aboutMe: 'This is about me',
        },
      },
      handleStartEdit: jest.fn(),
      currentProfileUserId: 1,
      authenticatedUserId: null,
    };
    const wrapper = shallow(<ProfileDetails {...props} />);

    expect(wrapper).toBeDefined();
  });
  it('should simulate click action', () => {
    const props = {
      user: {
        userProfile: {
          username: 'johnmark',
          firstName: 'John',
          lastName: 'Mark',
          email: 'john@example.com',
          aboutMe: 'This is about me',
        },
      },
      handleStartEdit: jest.fn(),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
    };
    const wrapper = shallow(<ProfileDetails {...props} />);

    expect(wrapper).toBeDefined();
    wrapper.find('button#edit-btn').simulate('click');
    expect(props.handleStartEdit).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
