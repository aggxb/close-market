import React from 'react';
import MarketContext from './MarketContext';

const MarketProvider = ({ children }) => {
  const [mercados, setMercados] = React.useState(() => {
    const mercadosLocais = JSON.parse(localStorage.getItem('mercados'));
    return mercadosLocais ? mercadosLocais : null;
  });
  const [mercadosCadastrados, setMercadosCadastrados] = React.useState(() => {
    const mercadosCadastradosLocais = JSON.parse(
      localStorage.getItem('mercados-cadastrados'),
    );
    return mercadosCadastradosLocais ? mercadosCadastradosLocais : [];
  });
  const [mercadoSelecionado, setMercadoSelecionado] = React.useState(() => {
    const mercadoSelecionadoLocal = JSON.parse(localStorage.getItem('mercado'));
    return mercadoSelecionadoLocal ? mercadoSelecionadoLocal : null;
  });

  React.useEffect(() => {
    localStorage.setItem('mercado', JSON.stringify(mercadoSelecionado));
  }, [mercadoSelecionado]);

  React.useEffect(() => {
    localStorage.setItem(
      'mercados-cadastrados',
      JSON.stringify(mercadosCadastrados),
    );
  }, [mercadosCadastrados]);

  return (
    <MarketContext.Provider
      value={{
        mercados,
        setMercados,
        mercadoSelecionado,
        setMercadoSelecionado,
        mercadosCadastrados,
        setMercadosCadastrados,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export default MarketProvider;
