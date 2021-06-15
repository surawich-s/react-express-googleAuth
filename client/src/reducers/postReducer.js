import {
  CREATE_POST,
  FETCH_POSTS,
  UPDATE_POST,
  FETCH_POST_BY_ID,
  FETCH_USER_POSTS,
} from "../constants/actionTypes";

const INITIAL_STATE = {
  posts: null,
  userPosts: null,
  postById: null,
};

const postReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.payload];
    case FETCH_POSTS:
      return action.payload;
    case FETCH_USER_POSTS:
      return [...state, action.payload];
    case UPDATE_POST:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_POST_BY_ID:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default postReducer;
