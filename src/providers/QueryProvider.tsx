import { createContext, useState, Dispatch, SetStateAction } from 'react'

type ContextValue = [string | null, Dispatch<SetStateAction<string | null>>]

export const QueryContext = createContext<ContextValue>([null, () => null])

const QueryProvider: React.FC = ({children}) => {
  const [value, setValue] = useState<string | null>(null)

  return (
    <QueryContext.Provider value={[value, setValue]}>
      {children}
    </QueryContext.Provider>
  )
}

export default QueryProvider
