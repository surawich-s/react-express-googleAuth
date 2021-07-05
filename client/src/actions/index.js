import * as api from "../api";
import {
  LOGIN,
  LOGOUT,
  FETCH_USER,
  CREATE_POST,
  FETCH_USER_POSTS,
  FETCH_POSTS,
  UPDATE_POST,
  FETCH_POST_BY_ID,
  UPDATE_USER_PROFILE,
  CREATE_COMMENT,
  FETCH_POST_COMMENTS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_COMMENT,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../constants/actionTypes";

// User actions

export const googleLogin = () => async (dispatch) => {
  try {
    const { data } = await api.getReqUser();
    // console.log(data);
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

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, userData);
    dispatch({ type: UPDATE_USER_PROFILE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Follow

export const followUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.followUser(id);
    dispatch({ type: FOLLOW_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.unfollowUser(id);
    dispatch({ type: UNFOLLOW_USER, payload: data });
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

export const fetchUserPosts = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserPosts(id);
    dispatch({ type: FETCH_USER_POSTS, payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostById(id);
    dispatch({ type: FETCH_POST_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (postId, comment) => async (dispatch) => {
  try {
    const { data } = await api.createComment(postId, comment);
    dispatch({ type: CREATE_COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchComments = (postId) => async (dispatch) => {
  try {
    const { data } = await api.fetchComment(postId);
    dispatch({ type: FETCH_POST_COMMENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(postId, commentId);
    // console.log(data);
    dispatch({ type: DELETE_COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.likePost(postId);
    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.unlikePost(postId);
    dispatch({ type: UNLIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
