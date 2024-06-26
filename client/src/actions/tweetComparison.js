import api from "../utils/api";
import { loadPlayers } from "./playerReview";
import { TWEET_COMPARISON_FAIL, TWEET_COMPARISON_SUCCESS } from "./types";

// Register comparison to be tweeted
export const tweetComparison = (players) => async (dispatch) => {
  try {
    dispatch(loadPlayers());
    const res = await api.post("/playerComparison", players);
    dispatch({ type: TWEET_COMPARISON_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: TWEET_COMPARISON_FAIL });
  }
};
