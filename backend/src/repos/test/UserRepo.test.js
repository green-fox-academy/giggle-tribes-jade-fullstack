import { UserRepo } from '../../repos';

test('valid userdata returns db query with params', async () => {
    const db = {
      query: (...query) => {
          return {
              results: {
                  query: query[0],
                  params: query[1]
              }
          }
      }
    };
    try {
      const user = new UserRepo(db);
      const result = await user.add({name:'username',password:'secret'});
      expect(result).toStrictEqual({
        query: 'INSERT INTO users (name,password) VALUES(?,?)',
        params: [ 'username', 'secret' ]
      });
    } catch(err) {
      expect(err).toStrictEqual( Error(1) );
    }
});
  