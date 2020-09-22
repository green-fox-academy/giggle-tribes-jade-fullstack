import { env } from '../env';

export const generalFetch = async (endpoint, { method, headers, body }) => {
  const result = await fetch(`${env.BACKEND_URL}/api/${endpoint}`, {
    method,
    headers,
    body,
  });
  return result.json();
};

export const fetchByKingdom = async (kingdomID, endpoint, { method, body }) => {
  const result = await generalFetch(`kingdoms/${kingdomID}/${endpoint}`, {
    method: method,
    headers: {
      TRIBES_TOKEN: localStorage.getItem('TRIBES_TOKEN'),
    },
    body: body,
  });
  return result;
};
