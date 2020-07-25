import { env } from '../env';

const isAuthenticated = () => {
  return new Promise(resolve => {
    fetch(`${env.BACKEND_URL}/api/auth`, {
      method: 'POST',
      headers: {
        TRIBES_TOKEN: localStorage.getItem('TRIBES_TOKEN'),
      },
    })
      .then(result => result.json())
      .then(json => {
        if (json.userId) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
};

export const authService = {
  isAuthenticated,
};
