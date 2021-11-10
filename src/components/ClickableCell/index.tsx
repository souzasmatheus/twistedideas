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
    ? (<td><a href='/' onClick={handleClick}>{children}</a></td>) 
    : (<th><a href='/' onClick={handleClick}>{children}</a></th>)
}

export default ClickableCell
