import {useEffect} from 'react'

import { ListItem } from "./components";

import useFetch from './hooks/useFetch';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  year: Date | string;
};

function App() {
  const [{data, loading, error}, fetch] = useFetch<User[]>(process.env.REACT_APP_API_URL ?? '');

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
      {data && data.map(({id, first_name, last_name, year}) => (
        <ListItem firstName={first_name} lastName={last_name} {...{id, year}}/>
      ))}
    </table>
  );
}

export default App;
