import React from 'react';

import Main from '../../../components/homepage/Main';

describe('Main component', () => {
  it('should render component', () => {
    const props = {
      recipes: {
        recipes: [],
        popularRecipes: [],
      },
      search: 'title',
    };
    const wrapper = shallow(<Main {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
