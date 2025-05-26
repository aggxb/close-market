import React from 'react';
import styled from 'styled-components';
import UserContext from '../Contexts/UserContext';
import Paragrafo from '../Components/Paragrafo';
import LinkBotao from '../Components/LinkBotao';
import { FaUser, FaUserTie } from 'react-icons/fa';

const DashContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: calc(100vh - 4rem);
  box-sizing: border-box;
`;

const DashTitulo = styled.h1`
  font-size: 5rem;
  margin-bottom: 1rem;
  color: var(--c1);
  span {
    color: var(--c9);
  }

  @media (max-width: 525px) {
    font-size: 3rem;
  }
`;

const DashBtnDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const Dashboard = () => {
  const { usuario, setUsuario } = React.useContext(UserContext);

  const handleUser = ({ target }) => {
    setUsuario(target.innerText.toLowerCase());
  };

  React.useEffect(() => {
    localStorage.setItem('usuario', usuario);
  }, [usuario]);

  return (
    <DashContainer>
      <DashTitulo>
        CloseMarket<span>.</span>
      </DashTitulo>
      <Paragrafo fontSize='2rem' style={{ marginBottom: '1rem' }}>
        Entrar como:
      </Paragrafo>
      <DashBtnDiv>
        <LinkBotao
          to="/home"
          onClick={handleUser}
          bg="c1"
          color="c6"
          hoverbg="c3"
        >
          <FaUserTie color="var(--c9)" />
          Administrador
        </LinkBotao>
        <LinkBotao
          to="/supermercado"
          onClick={handleUser}
          bg="c1"
          color="c6"
          hoverbg="c3"
        >
          <FaUser color="var(--c9)" />
          Cliente
        </LinkBotao>
      </DashBtnDiv>
    </DashContainer>
  );
};

export default Dashboard;
