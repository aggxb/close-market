import styled from 'styled-components';

const Titulo = styled.h1.withConfig({
  shouldForwardProp: (prop) => prop !== 'margintop' || prop !== 'marginbottom',
})`
  color: var(--c1);
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '2rem')};
  margin-top: ${({ margintop }) => (margintop ? margintop : 'auto')};
  margin-bottom: ${({ marginbottom }) =>
    marginbottom ? marginbottom : 'auto'};

  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
`;

export default Titulo;
