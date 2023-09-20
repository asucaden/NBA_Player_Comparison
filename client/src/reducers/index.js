import { combineReducers } from "redux";
import playerReview from "./playerReview";
import playerRater from "./playerRater";
import { tweetComparison } from "../actions/tweetComparison";

export default combineReducers({
  playerReview,
  playerRater,
  tweetComparison,
});
