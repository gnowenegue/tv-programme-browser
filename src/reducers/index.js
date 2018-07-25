import { combineReducers } from 'redux';

import tvshowsReducer from './tvshowsReducer';
import tvshowDetailReducer from './tvshowDetailReducer';
import seasonReducer from './seasonReducer';

export default combineReducers({
  tvshows: tvshowsReducer,
  tvshowDetail: tvshowDetailReducer,
  season: seasonReducer,
});
