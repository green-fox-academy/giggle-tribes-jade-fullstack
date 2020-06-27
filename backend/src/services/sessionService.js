import { checkUser } from './checkUser';

export const sessionService = {
  async checkLogin(input) {
    const username = input.username;
    const password = input.password;
    const errorMessages = {
      1: 'Password is required.',
      2: 'Username is required.',
      3: 'All fields are required.',
    };
    if (username && password) {
      return checkUser(username, password);
    } else if (username && !password) {
      return { error: errorMessages[1] };
    } else if (!username && password) {
      return { error: errorMessages[2] };
    } else {
      return { error: errorMessages[3] };
    }
  },
};
