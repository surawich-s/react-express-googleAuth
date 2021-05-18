import { LOGIN, LOGOUT } from "../constants/actionTypes";

const INITIAL_STATE = {
  isSignedIn: false,
  userInfo: null, //store signed in userId
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isSignedIn: true, userInfo: action.payload }; //immute changing object
    case LOGOUT:
      return { ...state, isSignedIn: false, userInfo: null };
    default:
      return state;
  }
};
