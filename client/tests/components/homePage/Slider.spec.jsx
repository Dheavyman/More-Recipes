import React from 'react';

import Slider from '../../../components/homepage/Slider';

describe('Slider component', () => {
  let spy;

  afterEach(() => {
    spy.mockClear();
  });
  it('should render component', () => {
    spy = jest.spyOn(Slider.prototype, 'componentDidMount');
    const wrapper = mount(<Slider />);

    expect(wrapper).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
