import api from "../utils/api";
import { loadRatings } from "./playerRater";
import { RATE_PLAYER_FAILURE, RATE_PLAYER_SUCCESS } from "./types";

// Register comparison to be tweeted
export const ratePlayers =
  ({ player1, player2, winner }) =>
  async (dispatch) => {
    try {
      const postThis = await { player1, player2, winner };
      const res = await api.post("/playerRating", postThis);
      dispatch({ type: RATE_PLAYER_SUCCESS, payload: res.data });
      dispatch(loadRatings());
    } catch (err) {
      dispatch({ type: RATE_PLAYER_FAILURE });
    }
  };
