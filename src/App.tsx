import {useEffect, useMemo} from 'react'

import { ListItem, ClickableCell } from "./components";

import useFetch from './hooks/useFetch';
import useQuery from './hooks/useQuery';
import useSort from './hooks/useSort'

import { getYear } from './utils/date'

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  year: Date | string;
};

function App() {
  const [{data, loading, error}, fetch] = useFetch<User[]>(process.env.REACT_APP_API_URL ?? '');
  const [paramValue, setParamValue] = useQuery('year')

  const treatedData = useMemo(() => data?.filter(user => {
    if (paramValue) {
      return getYear(user.year).toString() === paramValue
    }
    return true
  }) ?? [], [paramValue, data])

  const [sortedData, sortBy] = useSort(treatedData)

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) {
    return <p>LOADING</p>;
  }

  if (error) {
    return <p>ERROR</p>
  }

  const handleClearYear = () => {
    setParamValue('')
  }

  return (
    <div className="w-screen flex flex-col">
      {paramValue && (
        <button 
          className="mx-auto mt-5 h-10 px-5 text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline hover:bg-graygray-500 hover:text-graygray-100" 
          onClick={handleClearYear}
        >
          Clear year
        </button>
      )}
      <table className={`w-1/3 mx-auto ${paramValue ? 'mt-5' : 'mt-20'}`} >
        <tr className="bg-gray-50">
          <ClickableCell type='th' onClick={() => sortBy('id')}>ID</ClickableCell>
          <ClickableCell type='th' onClick={() => sortBy('first_name')}>Full name</ClickableCell>
          <ClickableCell type='th' onClick={() => sortBy('year')}>Year</ClickableCell>
        </tr>
        <tbody className="bg-white">
          {sortedData && sortedData.map(({id, first_name, last_name, year}) => (
            <ListItem key={`list-item-${id}`} firstName={first_name} lastName={last_name} {...{id, year}}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
