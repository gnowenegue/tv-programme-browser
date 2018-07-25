import { SEASON_LOAD_PENDING, SEASON_LOAD_SUCCESS, SEASON_LOAD_FAIL } from '../constants/actionTypes';

const defaultState = {
  isLoading: true,
  hasError: false,
  information: {},
};

export default (state = defaultState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case SEASON_LOAD_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case SEASON_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        information: payload,
      };

    case SEASON_LOAD_FAIL:
      return {
        ...defaultState,
        isLoading: false,
        hasError: true,
      };

    default:
      return state;
  }
};
