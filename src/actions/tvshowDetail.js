import { TVSHOW_DETAIL_LOAD_PENDING, TVSHOW_DETAIL_LOAD_SUCCESS, TVSHOW_DETAIL_LOAD_FAIL } from '../constants/actionTypes';

/* eslint-disable import/prefer-default-export */
export const loadTvShowDetail = (options = { id: 0 }) => dispatch => {
  dispatch({ type: TVSHOW_DETAIL_LOAD_PENDING });

  const tvshowDetailEndpoint = `https://api.themoviedb.org/3/tv/${options.id}?api_key=${process.env.API_KEY}`;

  const tvshowCreditsEndpoint = `https://api.themoviedb.org/3/tv/${options.id}/credits?api_key=${process.env.API_KEY}`;

  const tvshowVideosEndpoint = `https://api.themoviedb.org/3/tv/${options.id}/videos?api_key=${process.env.API_KEY}`;

  Promise.all([
    fetch(tvshowDetailEndpoint).then(data => data.json()),
    fetch(tvshowCreditsEndpoint).then(data => data.json()),
    fetch(tvshowVideosEndpoint).then(data => data.json()),
  ])
    .then(([details, credits, videos]) => {
      dispatch({
        type: TVSHOW_DETAIL_LOAD_SUCCESS,
        payload: {
          details,
          credits,
          videos: videos.results,
        },
      });
    })
    .catch(e => dispatch({ type: TVSHOW_DETAIL_LOAD_FAIL, payload: e }));
};
