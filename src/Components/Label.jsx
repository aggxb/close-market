import styled from 'styled-components';

const StyledLabel = styled.label`
  color: var(--c1);
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1.25rem')};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Label = ({ id, children, ...props }) => {
  return (
    <StyledLabel htmlFor={id} {...props}>
      {children}
    </StyledLabel>
  );
};

export default Label;
