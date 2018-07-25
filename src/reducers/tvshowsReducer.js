import { TVSHOWS_LOAD_PENDING, TVSHOWS_LOAD_SUCCESS, TVSHOWS_LOAD_FAIL } from '../constants/actionTypes';

const defaultState = {
  isLoading: true,
  hasError: false,
  shows: [],
  currentPage: 0,
  totalPages: 0,
};

export default (state = defaultState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TVSHOWS_LOAD_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case TVSHOWS_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        shows: [
          ...payload.results,
        ],
        currentPage: payload.page,
        totalPages: payload.total_pages,
      };

    case TVSHOWS_LOAD_FAIL:
      return {
        ...defaultState,
        isLoading: false,
        hasError: true,
      };

    default:
      return state;
  }
};
