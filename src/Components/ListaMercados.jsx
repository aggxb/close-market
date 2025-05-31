import styled from 'styled-components'

const StyledListaMercados = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const ListaMercados = ({children}) => {
  return (
    <StyledListaMercados className='showLeft'>{children}</StyledListaMercados>
  )
}

export default ListaMercados