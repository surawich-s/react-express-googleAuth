import * as api from "../api";
import {
  LOGIN,
  LOGOUT,
  FETCH_USER,
  CREATE_POST,
} from "../constants/actionTypes";

// User actions

export const googleLogin = (token) => async (dispatch) => {
  try {
    const { data } = await api.googleAuthLogin(token);
    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const googleLogout = () => async (dispatch) => {
  try {
    const { data } = await api.googleAuthLogout();
    dispatch({ type: LOGOUT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUser(id);
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Post actions

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
