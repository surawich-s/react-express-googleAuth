import "dotenv/config";
import axios from "axios";

const Url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
console.log(Url);

// google login

export const googleAuthLogin = () => axios.get(Url + "/google");
export const googleAuthLogout = () => axios.get(Url + "/logout");

// users

export const fetchUser = (id) => axios.get(Url + `/user/${id}`);

export const updateUser = (id, userData) =>
    axios.patch(Url + `/user/${id}`, userData);

export const getReqUser = () => axios.get(Url + "/user");

// follow

export const followUser = (id) => axios.post(Url + `/follow/${id}`);
export const unfollowUser = (id) => axios.post(Url + `/unfollow/${id}`);
export const checkFollow = (id) => axios.get(Url + `/checkfollow/${id}`);

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
