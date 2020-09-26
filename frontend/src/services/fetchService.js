import { env } from '../env';

export const generalFetch = async (
  endpoint,
  { method, TRIBES_TOKEN, body }
) => {
  const result = await fetch(`${env.BACKEND_URL}/api/${endpoint}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      TRIBES_TOKEN,
    },
    body,
  });
  return result.json();
};

export const fetchByKingdom = async (kingdomID, endpoint, { method, body }) => {
  const result = await generalFetch(`kingdoms/${kingdomID}/${endpoint}`, {
    method: method,
    TRIBES_TOKEN: localStorage.getItem('TRIBES_TOKEN'),
    body: body,
  });
  return result;
};
