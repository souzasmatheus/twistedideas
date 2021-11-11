import { render, fireEvent, act } from '@testing-library/react';

import ClickableCell from './index';

describe('ClickableCell', () => {
  it('should call onClick', () => {
    const onClick = jest.fn();

    const { getByText } = render(<ClickableCell onClick={onClick} type='td'>Test</ClickableCell>);

    act(() => {
      fireEvent.click(getByText('Test'));
    });

    expect(onClick).toHaveBeenCalled();
  });

  describe('should render its children independently of type', () => {
    test('td', () => {
      const { getByText } = render(<ClickableCell onClick={jest.fn()} type="td">Test text</ClickableCell>);

      expect(getByText('Test text')).toBeDefined();
    });

    test('th', () => {
      const { getByText } = render(<ClickableCell onClick={jest.fn()} type="td">Another test text</ClickableCell>);

      expect(getByText('Another test text')).toBeDefined();
    });
  });
});
