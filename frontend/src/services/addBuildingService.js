import { env } from '../env';

const addBuildingService = (kingdomId,type) => {
  console.log(`building ${type}`);
  return new Promise ( (resolve,reject) => {
    fetch(`${env.BACKEND_URL}/api/kingdoms/${kingdomId}/buildings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        TRIBES_TOKEN: localStorage.getItem('TRIBES_TOKEN'),
      },
      body: JSON.stringify({"type": type})
    })
      .then(result => result.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
};

export default addBuildingService;
