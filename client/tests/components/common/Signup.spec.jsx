import React from 'react';

import { Signup } from '../../../components/common/Signup';

describe('Signup component', () => {
  const props = {
    openSignup: true,
    handleToggleSignupModal: jest.fn(),
    handleToggleModal: jest.fn(),
    handleSubmit: jest.fn(),
    handleSubmitSignup: jest.fn(),
    user: {
      isLoading: false,
      error: {},
    },
  };
  it('should render component', () => {
    const wrapper = shallow(<Signup {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should show spinner when submitting details', () => {
    const newProps = {
      ...props,
      user: {
        ...props.user,
        isLoading: true,
        error: {},
      },
    };
    const wrapper = shallow(<Signup {...newProps} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
  it('should show error in signup', () => {
    const newProps = {
      ...props,
      user: {
        ...props.user,
        isLoading: false,
        error: {
          message: 'Error in signup',
        },
      },
    };
    const wrapper = shallow(<Signup {...newProps} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('ErrorMessage').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
