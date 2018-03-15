import React from 'react';

import NotFoundPage from '../../../components/notFoundPage';

describe('NotFoundPage component', () => {
  const props = {
    history: {
      goBack: jest.fn(),
    },
  };
  it('should render component', () => {
    const wrapper = shallow(<NotFoundPage {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call go back function on click', () => {
    const wrapper = shallow(<NotFoundPage {...props} />);
    wrapper.find('a').simulate('click');
    expect(props.history.goBack).toBeCalled();
  });
});
