import { PLAYER_LOAD_SUCCESS, PLAYER_LOAD_FAILURE } from '../actions/types';

const initialState = {
  sleeperPlayer: {},
  famousPlayer: {},
};

export default function playerReview(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PLAYER_LOAD_SUCCESS:
      return {
        ...state,
        sleeperPlayer: payload.sleeperPlayer,
        famousPlayer: payload.famousPlayer,
      };

    case PLAYER_LOAD_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
