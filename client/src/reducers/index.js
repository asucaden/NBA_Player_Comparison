import { combineReducers } from "redux";
import playerReview from "./playerReview";
import playerRater from "./playerRater";
import { tweetComparison } from "../actions/tweetComparison";
import leaderboard from "./leaderboard";

export default combineReducers({
  playerReview,
  playerRater,
  tweetComparison,
  leaderboard,
});
