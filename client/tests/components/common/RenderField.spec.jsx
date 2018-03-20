import React from 'react';

import RenderField from '../../../components/common/RenderField';

describe('Render field component', () => {
  it('should render component', () => {
    const props = {
      input: {},
      type: 'text',
      label: 'Username',
      meta: {
        touched: false,
        error: null,
      }
    };
    const wrapper = mount(<RenderField {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should show error when present', () => {
    const props = {
      input: {},
      type: 'text',
      label: 'Username',
      meta: {
        touched: true,
        error: 'New error message',
      }
    };
    const wrapper = mount(<RenderField {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('span.red-text').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
