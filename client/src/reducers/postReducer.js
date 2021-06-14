import {
  CREATE_POST,
  FETCH_POSTS,
  UPDATE_POST,
} from "../constants/actionTypes";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.payload];
    // case FETCH_USER_POSTS:
    //   return action.payload;
    case FETCH_POSTS:
      return action.payload;
    case UPDATE_POST:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return state;
  }
};

export default postReducer;
