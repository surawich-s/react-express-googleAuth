import axios from "axios";

const authUrl = "http://localhost:5000/api/v1/auth";
const postUrl = "http://localhost:5000/api/v1/posts";

export const googleAuthLogin = (data) =>
  axios.post(
    authUrl + "/google",
    { token: data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
export const googleAuthLogout = () => axios.delete(authUrl + "/logout");
