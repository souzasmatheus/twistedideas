import { useState, useCallback } from 'react';

import { handleCorsErrors } from '../utils/api';

type ReturnType<T> = [
  {data: T | null; loading: boolean; error: boolean},
  () => Promise<void>,
];

const useFetch = <TData>(url: string): ReturnType<TData> => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const beforeFetch = () => {
    setData(null);
    setError(false);
    setLoading(true);
  };

  const fetchData = useCallback(async () => {
    beforeFetch();

    try {
      const res = await fetch(url);
      const parsedData = await res.json();
      setData(parsedData);
    } catch {
      handleCorsErrors<TData>(url, (res) => setData(res), () => setError(true));
    } finally {
      setLoading(false);
    }
  }, [url]);

  return [{ data, loading, error }, fetchData];
};

export default useFetch;
