import { CREATE_POST, FETCH_POSTS } from "../constants/actionTypes";
import _, { mapKeys } from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, [action.payload._id]: action.payload };
    // case FETCH_USER_POSTS:
    //   return action.payload;
    case FETCH_POSTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    default:
      return state;
  }
};
