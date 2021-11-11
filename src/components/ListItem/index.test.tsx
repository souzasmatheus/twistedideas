import { render } from '@testing-library/react';

import ListItem from './index';

describe('ListItem', () => {
  it('should render data as expected', () => {
    const props = {
      id: 0,
      firstName: 'John',
      lastName: 'Doe',
      year: '2021-05-01'
    };

    const { getByText } = render(<ListItem {...props} />);

    expect(getByText('0')).toBeDefined();
    expect(getByText('John Doe')).toBeDefined();
    expect(getByText('2021')).toBeDefined();
  });
});
