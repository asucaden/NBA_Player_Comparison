import {
  LEADERBOARD_LOAD_SUCCESS,
  LEADERBOARD_LOAD_FAILURE,
} from "../actions/types";

const initialState = {
  players: [],
};

export default function leaderboard(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LEADERBOARD_LOAD_SUCCESS:
      return {
        ...state,
        players: payload.leaderboard,
      };

    case LEADERBOARD_LOAD_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
