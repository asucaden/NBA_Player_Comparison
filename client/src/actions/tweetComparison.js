import api from "../utils/api";
import { sleep } from "../utils/sleep";
import { loadPlayers } from "./playerReview";
import { TWEET_COMPARISON_FAIL, TWEET_COMPARISON_SUCCESS } from "./types";

// Register comparison to be tweeted
export const tweetComparison = (players) => async (dispatch) => {
  try {
    await sleep(5000);
    const res = await api.post("/playerComparison", players);
    dispatch({ type: TWEET_COMPARISON_SUCCESS, payload: res.data });
    dispatch(loadPlayers());
  } catch (err) {
    dispatch({ type: TWEET_COMPARISON_FAIL });
  }
};
