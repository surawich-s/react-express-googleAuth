import {
  LOGIN,
  LOGOUT,
  FETCH_USER,
  UPDATE_USER_PROFILE,
} from "../constants/actionTypes";

const INITIAL_STATE = {
  isSignedIn: false,
  userInfo: null, //store signed in userId
  fetchedUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, userInfo: action.payload }; //immute changing object
    case LOGOUT:
      return { ...state, userInfo: null };
    case FETCH_USER:
      return { ...state, fetchedUser: action.payload };
    case UPDATE_USER_PROFILE:
      return { ...state, userInfo: action.payload };

    default:
      return state;
  }
};

export default userReducer;
