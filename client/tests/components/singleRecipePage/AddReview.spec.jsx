import React from 'react';

import AddReview from '../../../components/singleRecipePage/AddReview';

describe('Add review component', () => {
  it('should render component', () => {
    const props = {
      reviewContent: 'This is a nice recipe',
      handleChange: jest.fn(),
      handleAddReview: jest.fn(),
      singleRecipe: {
        isLoading: false,
      }
    };
    const wrapper = shallow(<AddReview {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with spinner and disabling submit button', () => {
    const props = {
      reviewContent: 'This is a nice recipe',
      handleChange: jest.fn(),
      handleAddReview: jest.fn(),
      singleRecipe: {
        isLoading: true,
      }
    };
    const wrapper = shallow(<AddReview {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper.find('button').is('[disabled]')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with spinner and disabling submit button', () => {
    const props = {
      reviewContent: 'This is a nice recipe',
      handleChange: jest.fn(),
      handleAddReview: jest.fn(),
      singleRecipe: {
        isLoading: true,
      }
    };

    const wrapper = shallow(<AddReview {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').props().onSubmit)
      .toEqual(props.handleAddReview);
    expect(wrapper.find('button').props().type).toEqual('submit');
    expect(wrapper.find('Spinner').length).toEqual(1);
    wrapper.find('textarea').simulate('change', {
      target: { value: 'Wonderful recipe' }
    });
    expect(props.handleChange).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
