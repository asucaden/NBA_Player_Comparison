import { RATING_GET_FAILURE, RATING_GET_SUCCESS } from "../actions/types";

const initialState = {
  player1: {},
  player2: {},
};

export default function playerRater(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RATING_GET_SUCCESS:
      return {
        ...state,
        player1: payload.player1,
        player2: payload.player2,
      };

    case RATING_GET_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
