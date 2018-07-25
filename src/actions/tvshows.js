import { TVSHOWS_LOAD_PENDING, TVSHOWS_LOAD_SUCCESS, TVSHOWS_LOAD_FAIL } from '../constants/actionTypes';

/* eslint-disable import/prefer-default-export */
export const loadTvShows = (options = {}) => dispatch => {
  dispatch({ type: TVSHOWS_LOAD_PENDING });

  let apiEndpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}`;

  if (options) {
    apiEndpoint += Object.entries(options).reduce((acc, cur) => `${acc}&${cur[0]}=${cur[1]}`, '');
  }

  fetch(apiEndpoint)
    .then(data => data.json())
    .then(data => dispatch({ type: TVSHOWS_LOAD_SUCCESS, payload: data }))
    .catch(e => dispatch({ type: TVSHOWS_LOAD_FAIL, payload: e }));
};
