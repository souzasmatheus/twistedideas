import ClickableCell from '../ClickableCell'

import useQuery from '../../hooks/useQuery';

import { getYear } from '../../utils/date'

type ListItemProps = {
  id: number;
  firstName: string;
  lastName: string;
  year: Date | string;
};

const ListItem = ({id, firstName, lastName, year}: ListItemProps) => {
  const [, setValue] = useQuery('year')

  const handleYearSelect = () => {
    setValue(getYear(year).toString())
  }

  return (
    <tr>
      <td>{id}</td>
      <td width='60%'>{firstName} {lastName}</td>
      <ClickableCell type='td' onClick={handleYearSelect} >{getYear(year)}</ClickableCell>
    </tr>
  )
}

export default ListItem
