import axios from "axios";

const Url = "http://localhost:5000/api/v1";

// users

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

export const fetchUser = (id) => axios.get(Url + `/user/${id}`);

// posts

export const createPost = (post) => axios.post(Url + "/posts", post);
