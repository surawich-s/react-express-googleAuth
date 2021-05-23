import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";

import { googleLogin, googleLogout } from "../actions";

function GoogleAuth(props) {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.user.isSignedIn);

  // useEffect(() => {
  //   if (authStatus) {
  //     setIsSignedIn(authStatus);
  //   }
  // }, [authStatus]);

  const handleLogin = async (googleData) => {
    dispatch(googleLogin(googleData.tokenId));
  };

  const handleLogout = async () => {
    dispatch(googleLogout());
  };

  const renderedAuth = () => {
    if (authStatus) {
      return (
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
        />
      );
    } else {
      return (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={"single_host_origin"}
        />
      );
    }
  };

  return <div>{renderedAuth()}</div>;
}

export default GoogleAuth;
