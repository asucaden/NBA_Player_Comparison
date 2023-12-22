import { combineReducers } from "redux";
import playerReview from "./playerReview";
import playerRater from "./playerRater";
import tweetComparison from "./tweetComparison";
import leaderboard from "./leaderboard";

export default combineReducers({
  playerReview,
  playerRater,
  tweetComparison,
  leaderboard,
});
