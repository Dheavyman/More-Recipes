import React from 'react';

import Category from '../../../components/common/Category';

const props = {
  handleSearchCategory: jest.fn(() => Promise.resolve()),
};

describe('Category component', () => {
  it('should render category component', () => {
    const wrapper = shallow(<Category {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.find('li').length).toEqual(6);
    expect(wrapper.find('ul').children().length).toEqual(6);
    expect(wrapper.find('ul').childAt(0).text()).toBe('Breakfast');
    expect(wrapper.find('ul').childAt(1).text()).toBe('Lunch');
    expect(wrapper.find('ul').childAt(2).text()).toBe('Dinner');
    expect(wrapper.find('ul').childAt(3).text()).toBe('Appetizer');
    expect(wrapper.find('ul').childAt(4).text()).toBe('Main');
    expect(wrapper.find('ul').childAt(5).text()).toBe('Dessert');
    expect(wrapper).toMatchSnapshot();
  });
  it('should search for a category', () => {
    const wrapper = shallow(<Category {...props} />);
    wrapper.find('[name="breakfast"]').simulate('click');
    expect(props.handleSearchCategory).toBeCalled();
    wrapper.find('[name="lunch"]').simulate('click');
    expect(props.handleSearchCategory).toBeCalled();
    wrapper.find('[name="dinner"]').simulate('click');
    expect(props.handleSearchCategory).toBeCalled();
    wrapper.find('[name="appetizer"]').simulate('click');
    expect(props.handleSearchCategory).toBeCalled();
    wrapper.find('[name="main"]').simulate('click');
    expect(props.handleSearchCategory).toBeCalled();
    wrapper.find('[name="dessert"]').simulate('click');
    expect(props.handleSearchCategory).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
