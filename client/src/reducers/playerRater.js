import {
  RATING_GET_FAILURE,
  RATING_GET_SUCCESS,
  RATE_PLAYER_SUCCESS,
  RATE_PLAYER_FAILURE,
} from "../actions/types";

import updateElo from "../utils/ELO";

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
        updated: 0,
      };

    case RATING_GET_FAILURE:
      return { ...state, error: payload };

    case RATE_PLAYER_SUCCESS:
      const p1 = payload.player1;
      const p2 = payload.player2;

      const p1_prev_fame = p1.cm_fame;
      const p2_prev_fame = p2.cm_fame;

      [p1.cm_fame, p2.cm_fame] = updateElo(
        p1.cm_fame,
        p2.cm_fame,
        payload.winner
      );

      const fame_delta = Math.abs(Math.round(p1_prev_fame - p1.cm_fame));
      return {
        ...state,
        player1: p1,
        player2: p2,
        updated: payload.winner,
        fame_delta,
      };

    case RATE_PLAYER_FAILURE:
      return { ...state, error: payload, updated: 0 };

    default:
      return state;
  }
}
