import React from 'react';

import RenderField from '../../../components/common/RenderField';

describe('Render field component', () => {
  const props = {
    input: {},
    type: 'text',
    label: 'Username',
    meta: {
      touched: false,
      error: null,
    }
  };
  it('should render component', () => {
    const wrapper = shallow(<RenderField {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
