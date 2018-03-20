import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

describe('Capitalize first letter', () => {
  it('should capitalize first letter of a string', () => {
    let text = 'lower';

    expect(capitalizeFirstLetter(text)).toEqual('Lower');
    text = 'not starting with capital letter before';
    expect(capitalizeFirstLetter(text))
      .toEqual('Not starting with capital letter before');
  });
});
