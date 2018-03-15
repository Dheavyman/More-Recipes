import React from 'react';

import Footer from '../../../components/common/Footer';

describe('Footer component', () => {
  it('should renders footer', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('h5').length).toBe(2);
    expect(wrapper.find('i').length).toBe(4);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(2);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
