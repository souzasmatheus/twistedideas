import {useEffect, useMemo} from 'react'

import { ListItem, ClickableCell } from "./components";

import useFetch from './hooks/useFetch';
import useQuery from './hooks/useQuery';

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
  const [paramValue] = useQuery('year')

  const treatedData = useMemo(() => data?.filter(user => {
    if (paramValue) {
      return getYear(user.year).toString() === paramValue
    }
    return true
  }) ?? [], [paramValue, data])

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) {
    return <p>LOADING</p>;
  }

  if (error) {
    return <p>ERROR</p>
  }

  return (
    <table>
      <thead>
        <ClickableCell type='th' onClick={() => console.log('yay')}>ID</ClickableCell>
        <ClickableCell type='th' onClick={() => console.log('yay')}>Full name</ClickableCell>
        <ClickableCell type='th' onClick={() => console.log('yay')}>Year</ClickableCell>
      </thead>
      <tbody>
        {treatedData && treatedData.map(({id, first_name, last_name, year}) => (
          <ListItem key={`list-item-${id}`} firstName={first_name} lastName={last_name} {...{id, year}}/>
        ))}
      </tbody>
    </table>
  );
}

export default App;
