import styled from 'styled-components';

const StyledMercado = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &::after {
    content: '';
    width: 100%;
    margin-top: calc(1.25rem - 0.5rem);
    height: 1px;
    background: var(--c3);
  }
  &:last-child::after {
    display: none;
  }
`;

const Mercado = ({ children }) => {
  return <StyledMercado>{children}</StyledMercado>;
};

export default Mercado;
