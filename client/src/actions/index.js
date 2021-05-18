import * as api from "../api";
import { LOGIN, LOGOUT } from "../constants/actionTypes";

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

// Post actions
