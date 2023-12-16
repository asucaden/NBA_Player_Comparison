import api from "../utils/api";
import { RATE_PLAYER_FAILURE, RATE_PLAYER_SUCCESS } from "./types";

// Register comparison to be tweeted
export const ratePlayers =
  ({ player1, player2, winner }) =>
  async (dispatch) => {
    try {
      const name1 = player1.cm_name;
      const name2 = player2.cm_name;
      const postThis = { player1: name1, player2: name2, winner };
      api.post("/playerRating", postThis);
      dispatch({
        type: RATE_PLAYER_SUCCESS,
        payload: { player1, player2, winner },
      });
    } catch (err) {
      dispatch({
        type: RATE_PLAYER_FAILURE,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
