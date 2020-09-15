import { env } from '../env';

export const fetchKingdom = {
  async get(kingdomID, endpoint) {
    const fetchedData = await fetch(
      `${env.BACKEND_URL}/api/kingdoms/${kingdomID}/${endpoint}`,
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
      `${env.BACKEND_URL}/api/kingdoms/${kingdomID}/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          TRIBES_TOKEN: localStorage.getItem('TRIBES_TOKEN'),
        },
        body: JSON.stringify(body),
      }
    );
    return fetchedData.json();
  },
};
