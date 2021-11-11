import { useRef, useState, useEffect, useCallback } from 'react';

const useSort = (data: Array<{[key: string]: any}>): [Array<{[key: string]: any}>, (key: string) => void] => {
  const [sortedData, setSortedData] = useState<Array<{[key: string]: any}>>(data);
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
            return a[sortKey]?.localeCompare(b[sortKey], undefined, { numeric: true });
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
          return b[sortKey]?.localeCompare(a[sortKey], undefined, { numeric: true });
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
