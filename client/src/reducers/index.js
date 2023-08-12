import { combineReducers } from "redux";
import playerReview from "./playerReview";
import playerRater from "./playerRater";
import ratePlayers from "./ratePlayers";
import { tweetComparison } from "../actions/tweetComparison";

export default combineReducers({
  playerReview,
  playerRater,
  ratePlayers,
  tweetComparison,
});
