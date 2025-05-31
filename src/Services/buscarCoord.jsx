import { fetchCoord } from '../Api/foursquare';

export const buscarCoord = async (coordenada) => {
  if (!coordenada) throw new Error('Coordenada não fornecida');

  const resposta = await fetchCoord(coordenada);
  
  return resposta;
};
