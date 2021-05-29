import { CREATE_POST, FETCH_POSTS } from "../constants/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.payload];
    // case FETCH_USER_POSTS:
    //   return action.payload;
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
};
