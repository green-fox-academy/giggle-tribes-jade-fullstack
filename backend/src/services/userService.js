import { userRepo } from '../repos/userRepo';
import { kingdomRepo } from '../repos/kingdomRepo';
import { getUser, getKingdomIdForUser } from '../repos/user';
import { resourceService } from './resourceService';

const filterInput = input => {
  if (!input.username && !input.password)
    return 'Username and password are required.';
  if (input.username && !input.password) return 'Password is required.';
  if (!input.username && input.password) return 'Username is required.';
  if (input.password.length < 8) return 'Password must be 8 characters.';
  return '';
};

const add = input => {
  return new Promise(async (resolve, reject) => {
    const invalidInput = filterInput(input);
    if (invalidInput) {
      reject(invalidInput);
    } else {
      try {
        const userid = await userRepo.add({
          username: input.username,
          password: input.password,
        });
        const kingdomid = await kingdomRepo.add('kingdom', {
          kingdomname: input.kingdomname,
        });
        await kingdomRepo.add('user_kingdom', {
          userid: userid,
          kingdomid: kingdomid,
        });
        await resourceService.createResource({ kingdomID: kingdomid });
        resolve({
          id: userid,
          username: input.username,
          kingdomId: kingdomid,
        });
      } catch (error) {
        if (error.duplication) reject('Username is already taken.');
        if (error.validationError) reject(error.validationError);
        reject(error);
      }
    }
  });
};

const get = async ({ username, password }) => {
  const user = await getUser(username, password);
  if (user.length > 0) {
    const kingdom = await getKingdomIdForUser(user[0].id);
    if (kingdom.length > 0) {
      return { userID: user[0].id, kingdomID: kingdom[0].kingdom_id };
    }
  } else {
    throw { error: 'Username or password is incorrect.' };
  }
};

export const userService = {
  filterInput,
  add,
  get,
};
