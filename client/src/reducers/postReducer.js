import {
  CREATE_POST,
  FETCH_POSTS,
  UPDATE_POST,
  CREATE_POST_COMMENT,
} from "../constants/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.payload];
    // case FETCH_USER_POSTS:
    //   return action.payload;
    case FETCH_POSTS:
      return action.payload;
    case UPDATE_POST:
    case CREATE_POST_COMMENT:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return state;
  }
};
