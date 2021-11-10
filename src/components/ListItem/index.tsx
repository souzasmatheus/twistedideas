import { getYear } from '../../utils/date'

type ListItemProps = {
  id: number;
  firstName: string;
  lastName: string;
  year: Date | string;
};

const ListItem = ({id, firstName, lastName, year}: ListItemProps) => {
  return (
    <tr>
      <td>{id}</td>
      <td width='60%'>{firstName} {lastName}</td>
      <td>{getYear(year)}</td>
    </tr>
  )
}

export default ListItem
