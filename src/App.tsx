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
    <>
      {paramValue && (
        <button onClick={handleClearYear}>Clear year</button>
      )}
      <table>
        <thead>
          <ClickableCell type='th' onClick={() => sortBy('id')}>ID</ClickableCell>
          <ClickableCell type='th' onClick={() => sortBy('first_name')}>Full name</ClickableCell>
          <ClickableCell type='th' onClick={() => sortBy('year')}>Year</ClickableCell>
        </thead>
        <tbody>
          {sortedData && sortedData.map(({id, first_name, last_name, year}) => (
            <ListItem key={`list-item-${id}`} firstName={first_name} lastName={last_name} {...{id, year}}/>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
