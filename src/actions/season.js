import { SEASON_LOAD_PENDING, SEASON_LOAD_SUCCESS, SEASON_LOAD_FAIL } from '../constants/actionTypes';

/* eslint-disable import/prefer-default-export */
export const loadSeason = (options = { id: 0, seasonId: 1 }) => dispatch => {
  dispatch({ type: SEASON_LOAD_PENDING });

  const apiEndpoint = `https://api.themoviedb.org/3/tv/${options.id}/season/${options.seasonId}?api_key=${process.env.API_KEY}`;

  fetch(apiEndpoint)
    .then(data => data.json())
    .then(data => dispatch({ type: SEASON_LOAD_SUCCESS, payload: data }))
    .catch(e => dispatch({ type: SEASON_LOAD_FAIL, payload: e }));
};
