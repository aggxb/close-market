import styled from 'styled-components';

const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => (prop !== 'erro'),
})`
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : '5vh')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1.25rem')};
  padding: 0.5rem;
  background: ${({ bg }) => (bg ? `var(--${bg})` : 'var(--c7)')};
  color: ${({ color }) => (color ? `var(--${color})` : 'var(--c1)')};
  border: ${({ erro }) => (erro ? '2px solid var(--c10)' : 'none')};
  border-radius: 5px;
  transition: 0.3s;

  &:focus {
    outline: 3px solid;
  }
`;

const Input = ({ id, inputValue, setValue, erro, ...props }) => {
  return (
    <>
      <StyledInput
        id={id}
        name={id}
        value={inputValue}
        onChange={({ target }) => setValue(target.value)}
        type="text"
        erro={erro}
        {...props}
      />
    </>
  );
};

export default Input;
