import Titulo from '../Components/Titulo';
import Subtitulo from '../Components/Subtitulo';
import LinkBotao from '../Components/LinkBotao';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import Head from '../Components/Head';

const NaoExisteContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const NaoExiste = () => {
  return (
    <>
      <Head
        titulo="Página não encontrada"
        descricao="Essa página não existe ou não pode ser encontrada"
      />
      <NaoExisteContainer>
        <Titulo>Página não encontrada...</Titulo>
        <div>
          <Subtitulo>Volte para a dashboard: </Subtitulo>
          <LinkBotao to="/" bg="c1" color="c6" hoverbg="c3">
            <FaUser color="var(--c9)" />
            Dashboard
          </LinkBotao>
        </div>
      </NaoExisteContainer>
    </>
  );
};

export default NaoExiste;
