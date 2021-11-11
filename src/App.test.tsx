import { FC } from 'react';
import { render } from '@testing-library/react';

import App from './App';

import QueryProvider from './providers/QueryProvider';

import useFetch from './hooks/useFetch';
import useSort from './hooks/useSort';

const mockUseFetch = useFetch as jest.Mock;
const mockUseSort = useSort as jest.Mock;

jest.mock('./hooks/useFetch');
jest.mock('./hooks/useSort');

const wrapper: FC = ({ children }) => (
  <QueryProvider>
    {children}
  </QueryProvider>
);

describe('App', () => {
  beforeEach(() => {
    mockUseSort.mockImplementation((data) => ([data, jest.fn()]));
  });

  it('should show loading warning', () => {
    mockUseFetch.mockImplementation(() => ([{ data: null, loading: true, error: false }, jest.fn()]));

    const { getByText } = render(<App />, { wrapper });

    expect(getByText('Loading. Please, wait...')).toBeDefined();
  });

  it('should show error warning', () => {
    mockUseFetch.mockImplementation(() => ([{ data: null, loading: false, error: true }, jest.fn()]));

    const { getByText } = render(<App />, { wrapper });

    expect(getByText('An error occurred. Please, try again.')).toBeDefined();
  });

  it('should render data correctly', () => {
    mockUseFetch.mockImplementation(() => ([{ data: [{ id: 0, first_name: 'Jane', last_name: 'Doe', email: 'jane_doe@gmail.com', year: '2021-10-10' }], loading: false, error: true }, jest.fn()]));

    const { getByText } = render(<App />, { wrapper });

    expect(getByText('ID')).toBeDefined();
    expect(getByText('Full name')).toBeDefined();
    expect(getByText('Year')).toBeDefined();
    expect(getByText('0')).toBeDefined();
    expect(getByText('Jane Doe')).toBeDefined();
    expect(getByText('2021')).toBeDefined();
  });
});
