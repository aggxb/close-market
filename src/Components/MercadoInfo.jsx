import styled from 'styled-components';

const StyledMercadoInfo = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    display: flex;
    font-size: 1.25rem;
    gap: .5rem;
    align-items: center;
    color: var(--c1);
  }
`;

const MercadoInfo = ({ children }) => {
  return <StyledMercadoInfo>{children}</StyledMercadoInfo>;
};

export default MercadoInfo;
