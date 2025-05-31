import React from 'react';
import styled from 'styled-components';
import LocationContext from '../Contexts/LocationContext';
import MarketContext from '../Contexts/MarketContext';
import { obterLocalizacao } from '../Services/geolocation';
import Header from '../Components/Header';
import Titulo from '../Components/Titulo';
import Subtitulo from '../Components/Subtitulo';
import Input from '../Components/Input';
import Label from '../Components/Label';
import Paragrafo from '../Components/Paragrafo';
import Botao from '../Components/Botao';
import ListaMercados from '../Components/ListaMercados';
import Mercado from '../Components/Mercado';
import MercadoInfo from '../Components/MercadoInfo';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCarSide, FaSearchLocation } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Head from '../Components/Head';

const CoordContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const CoordBtnDiv = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const HomeAdministrador = () => {
  const [erroMercado, setErroMercado] = React.useState(null);
  const {
    coordenada,
    setCoordenada,
    inputCoordenada,
    setInputCoordenada,
    setErro,
    erro,
  } = React.useContext(LocationContext);
  const {
    mercados,
    setMercadoSelecionado,
    mercadosCadastrados,
    setMercadosCadastrados,
  } = React.useContext(MarketContext);
  const inputRef = React.useRef();
  const navigate = useNavigate();

  const confirmarCoordenada = () => {
    setCoordenada(inputCoordenada);
  };

  const validarCoordenada = () => {
    const regex = /^[-+]?\d+(\.\d+)?,-[-+]?\d+(\.\d+)?$/;
    if (!regex.test(inputCoordenada)) {
      setErro('Insira uma coordenada válida');
      return;
    }

    setErro(null);
    confirmarCoordenada();
  };

  const handleChange = (valor) => {
    setInputCoordenada(valor);

    if (erro) {
      setErro(null);
    }
  };

  const obterLocalizacaoAtual = () => {
    obterLocalizacao(setCoordenada, setErro);
  };

  const realizarCadastro = (mercado) => {
    const jaExiste = mercadosCadastrados.some(
      (mercadoCadastrado) => mercadoCadastrado.fsq_id === mercado.fsq_id,
    );

    if (jaExiste) {
      setErroMercado(mercado.fsq_id);
      return;
    }

    setMercadoSelecionado(mercado);
    setMercadosCadastrados((mercadosCadastrados) => [
      ...mercadosCadastrados,
      mercado,
    ]);
    navigate(`/supermercado/${mercado.fsq_id}`);
  };

  return (
    <>
      <Head
        titulo="Buscar Coordenada"
        descricao="Busque supermercados através de uma coordenada"
      />
      <Header />
      <CoordContainer>
        <Titulo>Coordenadas</Titulo>
        <Label fontSize="1.75rem" id="coordenada">
          Informe a coordenada
        </Label>
        <Input
          id="coordenada"
          ref={inputRef}
          inputValue={inputCoordenada}
          setValue={handleChange}
          onBlur={validarCoordenada}
          placeholder="Latitude, longitude (ex: -23.5,-46.6)"
          erro={erro}
        />
        {erro && (
          <Paragrafo color="c10" style={{ marginTop: '.5rem' }}>
            {erro}
          </Paragrafo>
        )}
        <CoordBtnDiv>
          <Botao
            handleClick={validarCoordenada}
            bg="c5"
            hoverbg="c3"
            hovercolor="c5"
          >
            Buscar Coordenada Informada
          </Botao>
          <Botao
            handleClick={obterLocalizacaoAtual}
            bg="c5"
            hoverbg="c3"
            hovercolor="c5"
          >
            Buscar Coordenada do Dispositivo
          </Botao>
        </CoordBtnDiv>
        {mercados && (
          <>
            <Titulo margintop="2rem" marginbottom="1.5rem">
              Supermercados disponíveis próximos à coordenada (
              {coordenada.replace(',', ', ')})
            </Titulo>
            <ListaMercados>
              {mercados.map(
                ({ fsq_id, geocodes, location, distance, name }) => (
                  <Mercado key={fsq_id}>
                    <Subtitulo>{name}</Subtitulo>
                    <MercadoInfo>
                      <li>
                        <FaLocationDot color="var(--c10)" />
                        {location.formatted_address}
                      </li>
                      <li>
                        <FaCarSide color="var(--c8)" />
                        {distance.toString().length > 3
                          ? `${distance.toLocaleString('de-DE')}km de distância`
                          : `${distance}m de distância`}
                      </li>
                      <li>
                        <FaSearchLocation color="var(--c9)" />
                        {`${geocodes.main.latitude}, ${geocodes.main.longitude}`}
                      </li>
                    </MercadoInfo>
                    <Botao
                      handleClick={() =>
                        realizarCadastro({
                          fsq_id,
                          geocodes,
                          location,
                          distance,
                          name,
                        })
                      }
                      onBlur={() => setErroMercado(null)}
                      bg="c3"
                      color="c7"
                      hoverbg="c2"
                    >
                      Cadastrar Supermercado
                    </Botao>
                    {erroMercado === fsq_id && (
                      <Paragrafo color="c10">
                        Esse supermercado já foi cadastrado
                      </Paragrafo>
                    )}
                  </Mercado>
                ),
              )}
            </ListaMercados>
          </>
        )}
      </CoordContainer>
    </>
  );
};

export default HomeAdministrador;
