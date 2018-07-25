import { TVSHOW_DETAIL_LOAD_PENDING, TVSHOW_DETAIL_LOAD_SUCCESS, TVSHOW_DETAIL_LOAD_FAIL } from '../constants/actionTypes';

const defaultState = {
  isLoading: true,
  hasError: false,
  information: {},
  credits: [],
  videos: [],
};

export default (state = defaultState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TVSHOW_DETAIL_LOAD_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case TVSHOW_DETAIL_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        information: payload.details,
        credits: payload.credits,
        videos: payload.videos,
      };

    case TVSHOW_DETAIL_LOAD_FAIL:
      return {
        ...defaultState,
        isLoading: false,
        hasError: true,
      };

    default:
      return state;
  }
};
