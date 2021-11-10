import { useEffect, useContext } from 'react'

import { QueryContext } from '../providers/QueryProvider'

type ReturnType = [string | null, (value: string) => void]

const useQuery = (param: string): ReturnType => {
  const [newValue, setNewValue] = useContext(QueryContext)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setNewValue(searchParams.get(param))
  }, [param, setNewValue])

  const setValue = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(param, value);
    setNewValue(value)
    const newurl = window.location.origin + window.location.pathname + '?' + searchParams.toString();
    window.history.pushState({path: newurl}, '', newurl);
  }

  return [newValue, setValue]
}

export default useQuery