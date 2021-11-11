import { useRef, useState, useEffect, useCallback } from 'react';

type DataType = Array<{[key: string]: any}>

const useSort = (data: DataType): [DataType, (key: string) => void] => {
  const [sortedData, setSortedData] = useState<DataType>(data);
  const lastOrder = useRef<'ASC' | 'DESC'>('ASC');

  const getSortedData = useCallback(
    (sortKey) => {
      if (!sortKey) {
        setSortedData(data);
      }

      if (lastOrder.current === 'ASC') {
        lastOrder.current = 'DESC';

        const result = data.sort((a, b) => {
          if (typeof a[sortKey] === 'number') {
            return a[sortKey] - b[sortKey];
          } else {
            return a[sortKey]?.localeCompare(b[sortKey]);
          }
        });
        setSortedData([...result]);

        return;
      }

      lastOrder.current = 'ASC';

      const result = data.sort((a, b) => {
        if (typeof a[sortKey] === 'number') {
          return b[sortKey] - a[sortKey];
        } else {
          return b[sortKey]?.localeCompare(a[sortKey]);
        }
      });
      setSortedData([...result]);
    },
    [data]
  );

  const sortBy = useCallback((key: string) => {
    getSortedData(key);
  }, [getSortedData]);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return [sortedData, sortBy];
};

export default useSort;
