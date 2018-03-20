import React from 'react';

import { Home } from '../../../components/homepage';

describe('Home component', () => {
  it('should render component', () => {
    const props = {
      recipes: {
        recipes: [],
      },
      retrievePopularRecipes: jest.fn(),
      retrieveRecipes: jest.fn(),
      history: {
        push: jest.fn(),
      },
      location: {},
      resetAuthentication: jest.fn(),
    };
    const wrapper = shallow(<Home {...props} />);

    expect(wrapper).toBeDefined();
  });
  it('should notify users to login when redirected to home', () => {
    const props = {
      recipes: {
        recipes: [],
      },
      retrievePopularRecipes: jest.fn(),
      retrieveRecipes: jest.fn(),
      history: {
        push: jest.fn(),
      },
      location: {
        state: {
          message: 'Unauthenticated user',
        }
      },
      resetAuthentication: jest.fn(),
    };
    const wrapper = shallow(<Home {...props} />);

    expect(wrapper).toBeDefined();
    expect(props.resetAuthentication).toHaveBeenCalled();
  });
  it('should simulate calling class instance properties', () => {
    const props = {
      recipes: {
        recipes: [],
      },
      retrievePopularRecipes: jest.fn(),
      retrieveRecipes: jest.fn(),
      history: {
        push: jest.fn(),
      },
      location: {
        state: {
          message: 'Unauthenticated user',
        }
      },
      resetAuthentication: jest.fn(),
    };
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<Home {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().handleSearchChange({ target: { value: 'title' } });
    expect(wrapper.instance().state.search).toEqual('title');
    wrapper.instance().handleSearchChange({ target: { value: 'ingredients' } });
    expect(wrapper.instance().state.search).toEqual('ingredients');
    wrapper.instance().handleSearchChange(
      { target: { value: 'rice, tomatoes' } }
    );
    expect(wrapper.instance().state.search).toEqual('ingredients');
    expect(wrapper.instance().state.list).toEqual('rice, tomatoes');
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().handleSubmitSearch(event);
    expect(props.history.push).toBeCalled();
    wrapper.instance().handleSearchCategory({ target: { name: 'breakfast' } });
    expect(props.history.push).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});

