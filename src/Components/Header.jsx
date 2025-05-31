import React from 'react';
import UserContext from '../Contexts/UserContext';
import styled from 'styled-components';
import Paragrafo from './Paragrafo';
import LinkBotao from './LinkBotao';
import { FaUser } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  span {
    font-weight: 600;
    color: var(--c1);
  }

   @media (max-width: 700px) {
    flex-direction: column;
  }

  @media (max-width: 450px) {
    p {
      text-align: center;
    }
  }
`;

const HeaderBtnDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Header = () => {
  const { usuario } = React.useContext(UserContext);

  return (
    <HeaderContainer>
      <Paragrafo fontSize="1.5rem">
        Você entrou como:{' '}
        <span>{`${usuario.charAt(0).toUpperCase()}${usuario.slice(1)} `}</span>
      </Paragrafo>
      <HeaderBtnDiv>
        <LinkBotao to={'/supermercado'} bg="c2" color="c6" hoverbg="c3">
          Supermercados Cadastrados
        </LinkBotao>
        <LinkBotao to="/" bg="c2" color="c6" hoverbg="c3">
          <FaUser color="var(--c9)" />
          Dashboard
        </LinkBotao>
      </HeaderBtnDiv>
    </HeaderContainer>
  );
};

export default Header;
