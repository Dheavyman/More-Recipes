import React from 'react';

import Spinner from '../../../components/common/Spinner';

describe('Spinner component', () => {
  it('should render spinner', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toEqual(29);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render small spinner', () => {
    const props = {
      size: 'small',
    };
    const wrapper = shallow(<Spinner {...props} />);
    expect(wrapper.find('div').first().hasClass('small')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render big spinner', () => {
    const props = {
      size: 'big',
    };
    const wrapper = shallow(<Spinner {...props} />);
    expect(wrapper.find('div').first().hasClass('big')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
