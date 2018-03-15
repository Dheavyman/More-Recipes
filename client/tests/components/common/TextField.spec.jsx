import React from 'react';

import TextField from '../../../components/common/TextField';

describe('TextField component', () => {
  const props = {
    id: 'title',
    name: 'title',
    type: 'text',
    defaultValue: null,
    placeholder: 'Title',
    className: 'className',
    required: false,
    disabled: false,
    onChange: jest.fn(),
  };
  it('should render component', () => {
    const wrapper = shallow(<TextField {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should simulate change event', () => {
    const wrapper = shallow(<TextField {...props} />);

    wrapper.find('input').simulate('change');
    expect(props.onChange).toBeCalled();
  });
});
