import { LOGIN, LOGOUT, FETCH_USER } from "../constants/actionTypes";

const INITIAL_STATE = {
  isSignedIn: false,
  userInfo: null, //store signed in userId
  fetchedUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isSignedIn: true, userInfo: action.payload }; //immute changing object
    case LOGOUT:
      return { ...state, isSignedIn: false, userInfo: null };
    case FETCH_USER:
      return { ...state, fetchedUser: action.payload };

    default:
      return state;
  }
};

export default userReducer;
