import React from 'react';

import { CatalogPage } from '../../../components/catalogPage';

describe('CatalogPage component', () => {
  let spy;

  afterEach(() => {
    spy.mockClear();
    localStorage.clear();
  });
  it('should render component', () => {
    const props = {
      searchRecipe: jest.fn(),
      location: {
        search: '',
      },
      history: {
        replace: jest.fn(),
      },
      recipes: {
        recipes: [],
        searchPerformed: false,
      },
      retrieveRecipes: jest.fn(),
    };
    spy = jest.spyOn(CatalogPage.prototype, 'componentDidMount');
    const wrapper = shallow(<CatalogPage {...props} />);

    expect(wrapper).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(props.retrieveRecipes).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should search for recipe if search is performed', () => {
    const props = {
      searchRecipe: jest.fn(),
      location: {
        search: '?search=title&list=rice',
      },
      history: {
        replace: jest.fn(),
      },
      recipes: {
        recipes: [],
        searchPerformed: false,
      },
      retrieveRecipes: jest.fn(),
    };
    spy = jest.spyOn(CatalogPage.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<CatalogPage {...props} />);

    expect(wrapper).toBeDefined();
    expect(props.searchRecipe).toHaveBeenCalled();

    wrapper.setProps({
      recipes: {
        recipes: [{
          id: 5,
          title: 'Macaroni',
          category: 'Dinner',
          description: 'Tasty macaroni',
          preparationTime: 45,
          ingredients: 'Macaroni, groundnut oil, salt',
          directions: 'Do this, do that',
          recipeImage: 'Recipe image',
          upvotes: 0,
          downvotes: 0,
          views: 1,
          favorites: 0,
        }],
        searchPerformed: true,
      }
    });
    expect(spy).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle instance method events', () => {
    const props = {
      searchRecipe: jest.fn(),
      location: {
        search: '',
      },
      history: {
        replace: jest.fn(),
      },
      recipes: {
        recipes: [],
        searchPerformed: false,
      },
      retrieveRecipes: jest.fn(),
    };
    const wrapper = shallow(<CatalogPage {...props} />);

    expect(wrapper).toBeDefined();

    wrapper.instance().handleSearchChange({ target: { value: 'title' } });
    expect(wrapper.instance().state.search).toEqual('title');
    wrapper.instance().handleSearchChange({ target: { value: 'ingredients' } });
    expect(wrapper.instance().state.search).toEqual('ingredients');
    wrapper.instance().handleSearchChange({ target: { value: 'pepper' } });
    expect(wrapper.instance().state.list).toEqual('pepper');

    wrapper.instance().handleSubmitSearch({ preventDefault: jest.fn() });
    expect(wrapper.instance().state.searchedTerm).toEqual('pepper');
    expect(props.searchRecipe).toBeCalled();

    wrapper.instance().handleSearchCategory({ target: { name: 'Appetizer' } });
    expect(props.searchRecipe).toBeCalled();
    expect(props.history.replace).toBeCalled();

    wrapper.instance().retrieveMoreRecipes();
    expect(props.retrieveRecipes).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
