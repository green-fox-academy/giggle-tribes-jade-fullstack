export const fetchKingdom = {
  async get(kingdomID, endpoint) {
    const fetchedData = await fetch(
      `http://localhost:5000/api/kingdom/${kingdomID}/${endpoint}`,
      {
        method: 'GET',
        headers: {
          TRIBES_TOKEN: localStorage.getItem('TRIBES_TOKEN'),
        },
      }
    );
    return fetchedData.json();
  },
  async post(kingdomID, endpoint, body) {
    const fetchedData = await fetch(
      `http://localhost:5000/api/kingdom/${kingdomID}/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          TRIBES_TOKEN: localStorage.getItem('TRIBES_TOKEN'),
          body: body,
        },
      }
    );
    return fetchedData.json();
  },
};
