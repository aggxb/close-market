export const fetchCoord = async (coordenada) => {
  const apiKey = import.meta.env.VITE_FOURSQUARE_API_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
    },
  };

  const params = new URLSearchParams({
    ll: coordenada,
    query: 'supermercado',
    radius: 10000,
    limit: '10',
    sort: 'DISTANCE',
  });

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?${params.toString()}`,
    options,
  );
  const json = await response.json();

  return json.results;
};
