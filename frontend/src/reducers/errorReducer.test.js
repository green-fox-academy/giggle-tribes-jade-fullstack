import * as types from '../constants/ActionTypes';
import { errorReducer } from './errorReducer';

describe('Error reducer', () => {
  it('should return the initial state', () => {
    expect(errorReducer(null, {})).toEqual(null);
  });

  it('should handle SET_ERROR_SUCCESS', () => {
    expect(
      errorReducer(null, {
        type: types.SET_ERROR_SUCCESS,
        payload: 'dummyError',
      })
    ).toEqual('dummyError');
  });

  it('should handle RESET_ERROR_SUCCESS', () => {
    expect(
      errorReducer(null, {
        type: types.RESET_ERROR_SUCCESS,
        payload: 'whatever',
      })
    ).toEqual(null);
  });
});
