import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";

import { googleLogin, googleLogout } from "../actions";

function GoogleAuth(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo);
  const authStatus = useSelector((state) => state.user.isSignedIn);

  useEffect(() => {
    if (authStatus) {
      setIsSignedIn(authStatus);
      console.log(userId);
    }
  }, [authStatus]);

  const actionLogin = async (googleData) => {
    dispatch(googleLogin(googleData.tokenId));
  };

  const actionLogout = async () => {
    dispatch(googleLogout());
  };

  const renderedAuth = () => {
    if (authStatus) {
      return (
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={actionLogout}
        />
      );
    } else {
      return (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={actionLogin}
          onFailure={actionLogin}
          cookiePolicy={"single_host_origin"}
        />
      );
    }
  };

  return <div>{renderedAuth()}</div>;
}

export default GoogleAuth;
