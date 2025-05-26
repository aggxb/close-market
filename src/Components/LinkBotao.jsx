import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkBotao = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: max-content;
  padding: 0.75rem 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  text-decoration: none;
  background: ${({ bg }) => `var(--${bg})`};
  color: ${({ color }) => `var(--${color})`};
  border-radius: 10px;
  transition: 0.3s;

  &:hover {
    color: ${({ hovercolor }) => hovercolor ? `var(--${hovercolor})` : ''};
    background: ${({ hoverbg }) => `var(--${hoverbg})`};;
  }

  @media (max-width: 700px) {
    font-size: 1.25rem;
  }
`;

export default LinkBotao;
