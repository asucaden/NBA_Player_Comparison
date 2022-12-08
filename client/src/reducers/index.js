import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import playerReview from './playerReview';
import { tweetComparison } from '../actions/tweetComparison';

export default combineReducers({ alert, playerReview, tweetComparison, auth });
