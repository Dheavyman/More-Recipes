import React from 'react';

import { Signin } from '../../../components/common/Signin';

describe('Signin component', () => {
  const props = {
    openSignin: true,
    handleToggleSigninModal: jest.fn(),
    handleToggleModal: jest.fn(),
    handleSubmit: jest.fn(),
    handleSubmitSignin: jest.fn(),
    user: {
      isLoading: false,
      error: {},
    },
  };
  it('should render component', () => {
    const wrapper = shallow(<Signin {...props} />);

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
    const wrapper = shallow(<Signin {...newProps} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
  it('should show error in signin', () => {
    const newProps = {
      ...props,
      user: {
        ...props.user,
        isLoading: false,
        error: {
          message: 'Error in signin',
        },
      },
    };
    const wrapper = shallow(<Signin {...newProps} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('ErrorMessage').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
