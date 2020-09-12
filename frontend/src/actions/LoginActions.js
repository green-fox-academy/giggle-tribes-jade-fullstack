import {
  SET_KINGDOM_SUCCESS,
  SET_ERROR_SUCCESS
  } from '../constants/ActionTypes';

export const LoginActions = (data) => {
    const {username, password} = data;
    return dispatch => {
      dispatch({
        type: 'kiscica',
      });
  console.log(username, password);

      return fetch('http://localhost:5000/api/sessions', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            dispatch({ type: SET_ERROR_SUCCESS, payload: data.error })
            return false;
            // this.setState(prevState => ({ ...prevState, error: data.error }));
          } else {
            localStorage.setItem(
                'TRIBES_TOKEN',
                data.token
              );
            dispatch({
                type: SET_KINGDOM_SUCCESS,
                payload: data.kingdomID, //??? a local sotrage-ban be kell állítani a tokent, authService.js?
              })
              return true;
          }
        })
      
    };
  };
  