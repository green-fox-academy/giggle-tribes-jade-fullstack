import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import { kingdomReducer } from './kingdomReducer';
import { buildingsReducer } from './buildingsReducer';
import { resourcesReducer } from './resourcesReducer';
import { troopsReducer } from './troopsReducer';

export default combineReducers({
  userReducer,
  kingdomReducer,
  buildingsReducer,
  resourcesReducer,
  troopsReducer,
});
