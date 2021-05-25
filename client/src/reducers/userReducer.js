import {
  LOGIN,
  LOGOUT,
  FETCH_USER,
  FETCH_USER_POSTS,
} from "../constants/actionTypes";

const INITIAL_STATE = {
  isSignedIn: false,
  userInfo: null, //store signed in userId
  fetchedUser: null,
  userPosts: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isSignedIn: true, userInfo: action.payload }; //immute changing object
    case LOGOUT:
      return { ...state, isSignedIn: false, userInfo: null };
    case FETCH_USER:
      return { ...state, fetchedUser: action.payload };
    case FETCH_USER_POSTS:
      return { ...state, userPosts: action.payload };
    default:
      return state;
  }
};
