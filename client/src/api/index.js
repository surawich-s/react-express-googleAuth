import axios from "axios";

const Url = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

// google login

export const googleAuthLogin = (data) =>
  axios.post(
    Url + "/google",
    { token: data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
export const googleAuthLogout = () => axios.delete(Url + "/logout");

// users

export const fetchUser = (id) => axios.get(Url + `/user/${id}`);

export const updateUser = (id, userData) =>
  axios.patch(Url + `/user/${id}`, userData);

export const getReqUser = () => axios.get(Url);

// posts

export const createPost = (post) => axios.post(Url + "/posts/", post);

export const fetchUserPosts = (id) =>
  axios.get(Url + `/posts/${id}`, { params: { id } });

export const fetchPosts = () => axios.get(Url + "/posts");

export const updatePost = (id, post) => axios.patch(Url + `/posts/${id}`, post);

export const fetchPostById = (id) => axios.get(Url + `/posts/p/${id}`);

// post comment

export const createComment = (id, comment) =>
  axios.post(Url + `/posts/p/${id}/comment`, comment);

export const fetchComment = (id) => axios.get(Url + `/posts/p/${id}/comment`);

export const deleteComment = (postId, commentId) =>
  axios.delete(Url + `/posts/p/${postId}/comment`, {
    data: {
      commentId: commentId,
    },
  });

// post like

export const likePost = (id) => axios.post(Url + `/posts/p/${id}/like`);

export const getLike = (postId) => axios.get(Url + `/posts/p/${postId}/like`);

export const unlikePost = (postId) =>
  axios.delete(Url + `/posts/p/${postId}/like`);
