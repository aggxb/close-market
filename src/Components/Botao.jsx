import styled from 'styled-components';

const StyledBotao = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    prop !== 'bg' || prop !== 'hoverbg' || prop !== 'padding',
})`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  max-width: max-content;
  padding: ${({ padding }) => (padding ? padding : '.75rem 1rem')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1.5rem')};
  background: ${({ bg }) => `var(--${bg})`};
  color: ${({ color }) => `var(--${color})`};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: ${({ hovercolor }) => (hovercolor ? `var(--${hovercolor})` : '')};
    background: ${({ hoverbg }) => `var(--${hoverbg})`};
  }

   @media (max-width: 700px) {
    font-size: 1.25rem;
  }
`;

const Botao = ({ children, handleClick, ...props }) => {
  return (
    <StyledBotao onClick={handleClick} {...props}>
      {children}
    </StyledBotao>
  );
};

export default Botao;
