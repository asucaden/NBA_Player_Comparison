import { RATE_PLAYER_FAILURE, RATE_PLAYER_SUCCESS } from "../actions/types";

const initialState = {
  player1: {},
  player2: {},
  winner: 1,
};

export default function ratePlayers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RATE_PLAYER_SUCCESS:
      return state;

    case RATE_PLAYER_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
