export const obterLocalizacao = (setCoordenada, setErro) => {
  if (!navigator.geolocation) {
    setErro('Geolocalização não suportada');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (posicao) => {
      const latitude = posicao.coords.latitude;
      const longitude = posicao.coords.longitude;
      const coordenadaAtual = `${latitude},${longitude}`;

      setCoordenada(coordenadaAtual);
    },
    () => {
      setErro('Não foi possível obter sua localização');
    },
  );
};
