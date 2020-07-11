import { authService } from './authService';

test('authorized', async () => {
    global.fetch = jest.fn( () => 
        Promise.resolve({
            json: () => Promise.resolve( { userId: 4, kingdomId: 12})
        })
    );
    let result = await authService.isAuthenticated();
    expect(result).toBe(true);
});

test('not authorized', async () => {
    global.fetch = jest.fn( () => 
        Promise.resolve({
            json: () => Promise.resolve( { error: 'Not valid token.'})
        })
    );
    let result = await authService.isAuthenticated();
    expect(result).toBe(false);
});
  