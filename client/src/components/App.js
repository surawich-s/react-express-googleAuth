import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

function App(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleLogin = async (googleData) => {
    const res = await fetch("http://localhost:5000/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const log = await res.json();
    setIsSignedIn(true);
    console.log(log);
    // store returned user somehow
  };

  const handleLogout = async () => {
    const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "DELETE",
    });
    const log = await res.json();
    setIsSignedIn(false);
    console.log(log);
  };

  const showData = async () => {
    const res = await fetch("http://localhost:5000/api/v1/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData = await res.json();
    console.log(userData);
  };

  const renderedAuth = () => {
    if (isSignedIn) {
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

  return (
    <div>
      {renderedAuth()}
      <button onClick={showData}>Show</button>
    </div>
  );
}

export default App;
