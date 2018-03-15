import React from 'react';

import Main from '../../../components/userRecipes/Main';

describe('Main component', () => {
  it('should render component', () => {
    const props = {
      openAdd: false,
      openEdit: false,
      openDelete: false,
      handleOpenAdd: jest.fn(),
    };
    const wrapper = shallow(<Main {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
