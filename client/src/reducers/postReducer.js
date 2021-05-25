import { CREATE_POST, FETCH_USER_POSTS } from "../constants/actionTypes";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, [action.payload._id]: action.payload };
    // case FETCH_USER_POSTS:
    //   return action.payload;

    default:
      return state;
  }
};
