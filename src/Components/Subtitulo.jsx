import styled from 'styled-components';

const Subtitulo = styled.h2`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1.5rem')};
  color: var(--c1);

   @media (max-width: 700px) {
    font-size: 1.35rem;
  }
`;

export default Subtitulo;
