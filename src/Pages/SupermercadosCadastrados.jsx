import React from 'react';
import Titulo from '../Components/Titulo';
import ListaMercados from '../Components/ListaMercados';
import MarketContext from '../Contexts/MarketContext';
import Subtitulo from '../Components/Subtitulo';
import Mercado from '../Components/Mercado';
import MercadoInfo from '../Components/MercadoInfo';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCarSide, FaSearchLocation } from 'react-icons/fa';
import Botao from '../Components/Botao';
import UserContext from '../Contexts/UserContext';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Head from '../Components/Head';

const MercadosBtnDiv = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SupermercadosCadastrados = () => {
  const { usuario } = React.useContext(UserContext);
  const { mercadosCadastrados, setMercadosCadastrados, setMercadoSelecionado } =
    React.useContext(MarketContext);
  const navigate = useNavigate();

  const removerSupermercado = (fsq_id) => {
    const mercadosAtualizados = mercadosCadastrados.filter(
      (mercado) => mercado.fsq_id !== fsq_id,
    );
    setMercadosCadastrados(mercadosAtualizados);
    localStorage.setItem('mercados', JSON.stringify(mercadosAtualizados));
  };

  return (
    <>
      <Head
        titulo="Supermercados Cadastrados"
        descricao="Veja os supermercados cadastrados"
      />
      <Header />
      <Titulo margintop="2rem" marginbottom="1.5rem">
        Supermercados Cadastrados
      </Titulo>
      {!mercadosCadastrados.length ? (
        <Subtitulo>Nenhum supermercado cadastrado</Subtitulo>
      ) : (
        <ListaMercados>
          {mercadosCadastrados.map(
            ({ fsq_id, geocodes, location, distance, name }) => (
              <Mercado key={fsq_id}>
                <Subtitulo>{name}</Subtitulo>
                <MercadoInfo>
                  <li>
                    <FaLocationDot color="var(--c10)" />
                    {location.formatted_address}
                  </li>
                  <li>
                    <FaSearchLocation color="var(--c9)" />
                    {`${geocodes.main.latitude}, ${geocodes.main.longitude}`}
                  </li>
                </MercadoInfo>
                <MercadosBtnDiv>
                  <Botao
                    onClick={() => {
                      setMercadoSelecionado({
                        fsq_id,
                        geocodes,
                        location,
                        distance,
                        name,
                      });
                      navigate(`/supermercado/${fsq_id}`);
                    }}
                    bg="c3"
                    color="c7"
                    hoverbg="c2"
                  >
                    {usuario === 'administrador'
                      ? 'Editar Produtos'
                      : 'Visualizar Produtos'}
                  </Botao>
                  {usuario === 'administrador' && (
                    <Botao
                      handleClick={() => removerSupermercado(fsq_id)}
                      bg="c10"
                      color="c7"
                      hoverbg="c2"
                    >
                      Remover Supermercado
                    </Botao>
                  )}
                </MercadosBtnDiv>
              </Mercado>
            ),
          )}
        </ListaMercados>
      )}
    </>
  );
};

export default SupermercadosCadastrados;
