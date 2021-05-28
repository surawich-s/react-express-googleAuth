import { CREATE_POST } from "../constants/actionTypes";

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
