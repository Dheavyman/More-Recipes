import React from 'react';

import IndexUserNav from '../../../components/common/IndexUserNav';

describe('Index user navigation component', () => {
  const props = {
    handleToggleSigninModal: jest.fn(),
    handleToggleSignupModal: jest.fn(),
  };
  it('should render the component', () => {
    const wrapper = shallow(<IndexUserNav {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should simulate search events', () => {
    const wrapper = shallow(<IndexUserNav {...props} />);

    wrapper.find('#signin').simulate('click');
    expect(props.handleToggleSigninModal).toBeCalled();
    wrapper.find('#register').simulate('click');
    expect(props.handleToggleSignupModal).toBeCalled();
  });
});
