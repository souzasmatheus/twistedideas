import { useEffect, useMemo } from 'react';

import { ListItem, ClickableCell } from './components';

import useFetch from './hooks/useFetch';
import useQuery from './hooks/useQuery';
import useSort from './hooks/useSort';

import { getYear } from './utils/date';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  year: Date | string;
};

function App () {
  const [{ data, loading, error }, fetch] = useFetch<User[]>(process.env.REACT_APP_API_URL ?? '');
  const [paramValue, setParamValue] = useQuery('year');
  const [sortedData, sortBy] = useSort(data ?? []);

  const treatedData = useMemo(() => sortedData.filter(user => {
    if (paramValue) {
      return getYear(user.year).toString() === paramValue;
    }
    return true;
  }), [paramValue, sortedData]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleClearYear = () => {
    setParamValue('');
  };

  return (
    <div className="w-screen flex flex-col">
      {loading && <p className="mx-auto mt-40 text-2xl">Loading. Please, wait...</p>}
      {error && (
        <div className="mx-auto mt-40 flex flex-col">
          <p className="text-2xl text-red-600">An error occurred. Please, try again.</p>
          <button
            className="mx-auto mt-5 h-10 px-5 text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline hover:bg-graygray-500 hover:text-graygray-100"
            onClick={fetch}
          >
            Try again
          </button>
        </div>
      )}
      {paramValue && data && (
        <button
          className="mx-auto mt-5 h-10 px-5 text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline hover:bg-graygray-500 hover:text-graygray-100"
          onClick={handleClearYear}
        >
          Clear year
        </button>
      )}
      {data &&
        (<table className={`w-1/3 mx-auto ${paramValue ? 'mt-5' : 'mt-20'}`} >
          <tr className="bg-gray-50">
            <ClickableCell type='th' onClick={() => sortBy('id')}>ID</ClickableCell>
            <ClickableCell type='th' onClick={() => sortBy('first_name')}>Full name</ClickableCell>
            <ClickableCell type='th' onClick={() => sortBy('year')}>Year</ClickableCell>
          </tr>
          <tbody className="bg-white">
            {treatedData && treatedData.map(({ id, first_name, last_name, year }) => (
              <ListItem key={`list-item-${id}`} firstName={first_name} lastName={last_name} {...{ id, year }} />
            ))}
          </tbody>
        </table>)
      }
    </div>
  );
}

export default App;
