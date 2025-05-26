import styled from 'styled-components';

const StyledListaProdutosContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.2rem;
`

const StyledListaProdutos = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ListaProdutosContainer = ({children}) => {
  return <StyledListaProdutosContainer>{children}</StyledListaProdutosContainer>
}

const ListaProdutos = ({ children }) => {
  return <StyledListaProdutos>{children}</StyledListaProdutos>;
};


export {ListaProdutosContainer, ListaProdutos};
