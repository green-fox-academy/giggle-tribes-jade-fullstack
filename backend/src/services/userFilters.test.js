import { user } from './userService';

test('missing password and username', async () => {
  const result = await user.filterInput({});
  expect(result).toEqual('Username and password are required.');
});

test('missing password', async () => {
  const result = await user.filterInput({username:"username"});
  expect(result).toEqual('Password is required.');
});

test('missing username', async () => {
  const result = await user.filterInput({password:"password"});
  expect(result).toEqual('Username is required.');
});

test('too short password', async () => {
  const result = await user.filterInput({username:"username",password:"passt"});
  expect(result).toEqual('Password must be 8 characters.');
});

test('valid input', async () => {
  const result = await user.filterInput({username:"username",password:"password"});
  expect(result).toEqual('');
});

