import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { userReducer } from './reducers/userReducer';
import { kingdomReducer } from './reducers/kingdomReducer';
import { buildingsReducer } from './reducers/buildingsReducer';
import { resourcesReducer } from './reducers/resourcesReducer';
import { troopsReducer } from './reducers/troopsReducer';
import { tokenReducer } from './reducers/tokenReducer';
import { errorReducer } from './reducers/errorReducer';

function root(state = {}, action) {
  return {
    user: userReducer(state.user, action),
    kingdom: kingdomReducer(state.kingdom, action),
    buildings: buildingsReducer(state.buildings, action),
    resources: resourcesReducer(state.resources, action),
    troops: troopsReducer(state.troops, action),
    token: tokenReducer(state.token, action),
    error: errorReducer(state.error, action),
  };
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  root,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

export { store };
