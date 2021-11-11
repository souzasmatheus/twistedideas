type ClickableCellProps = {
  onClick: () => void
  type: 'td' | 'th'
};

const ClickableCell: React.FC<ClickableCellProps> = ({children, onClick, type}) => {

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    onClick()
  }

  return type === 'td'
    ? (
      <td className="px-6 py-4 text-sm text-gray-500">
        <a className="h-10 px-5 text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline hover:bg-graygray-500 hover:text-graygray-100" href='/' onClick={handleClick}>
          {children}
        </a>
      </td>
    ) 
    : (
      <th className="px-6 py-2 text-xs text-gray-500">
        <a className="h-10 px-5 text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline hover:bg-graygray-500 hover:text-graygray-100"  href='/' onClick={handleClick}>
          {children}
        </a>
      </th>
    )
}

export default ClickableCell
