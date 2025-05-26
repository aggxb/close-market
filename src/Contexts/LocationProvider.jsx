import React from 'react';
import LocationContext from './LocationContext';

const LocationProvider = ({ children }) => {
  const [coordenada, setCoordenada] = React.useState(() => {
    const coordenadaLocal = localStorage.getItem('coordenada');
    return coordenadaLocal ? coordenadaLocal : '';
  });
  const [erro, setErro] = React.useState(null);

  return (
    <LocationContext.Provider
      value={{ coordenada, setCoordenada, erro, setErro }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
