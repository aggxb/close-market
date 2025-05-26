import styled from 'styled-components';

const Paragrafo = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1.25rem')};
  color: ${({ color }) => (color ? `var(--${color})` : 'var(--c1)')};

  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
`;

export default Paragrafo;
