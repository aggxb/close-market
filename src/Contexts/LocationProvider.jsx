import React from 'react';
import LocationContext from './LocationContext';
import { buscarCoord } from '../Services/buscarCoord';
import MarketContext from './MarketContext';

const LocationProvider = ({ children }) => {
  const [coordenada, setCoordenada] = React.useState(() => {
    const coordenadaLocal = localStorage.getItem('coordenada');
    return coordenadaLocal ? coordenadaLocal : '';
  });
  const [inputCoordenada, setInputCoordenada] = React.useState('');
  const [erro, setErro] = React.useState(null);
  const { setMercados } = React.useContext(MarketContext);

  const buscarCoordenada = React.useCallback(async () => {
    try {
      const resposta = await buscarCoord(coordenada);
      setMercados(resposta);
      localStorage.setItem('mercados', JSON.stringify(resposta));
      setInputCoordenada('');
    } catch (error) {
      setErro(error.message);
    }
  }, [coordenada, setMercados]);

  React.useEffect(() => {
    if (coordenada) {
      buscarCoordenada(coordenada);
      localStorage.setItem('coordenada', coordenada);
    }
  }, [coordenada, buscarCoordenada]);

  return (
    <LocationContext.Provider
      value={{
        coordenada,
        setCoordenada,
        erro,
        setErro,
        buscarCoordenada,
        inputCoordenada,
        setInputCoordenada,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
