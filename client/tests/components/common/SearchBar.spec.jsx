import React from 'react';

import SearchBar from '../../../components/common/SearchBar';

describe('Search bar component', () => {
  const props = {
    search: 'ingredients',
    list: 'palm oil, beans',
    handleSearchChange: jest.fn(),
    handleSubmitSearch: jest.fn(),
  };
  it('should render component', () => {
    const wrapper = shallow(<SearchBar {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should simulate change event', () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.find('#search-input').simulate('change');
    expect(props.handleSearchChange).toBeCalled();
  });
  it('should simulate click event', () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.find('#search-button').simulate('click');
    expect(props.handleSubmitSearch).toBeCalled();
  });
});
