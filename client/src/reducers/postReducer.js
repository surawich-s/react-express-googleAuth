import _ from "lodash";
import {
  CREATE_POST,
  FETCH_POSTS,
  UPDATE_POST,
  FETCH_POST_BY_ID,
  FETCH_USER_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../constants/actionTypes";

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_POSTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_USER_POSTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_POST_BY_ID:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_COMMENT:
    case DELETE_COMMENT:
    case LIKE_POST:
    case UNLIKE_POST:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};

export default postReducer;
