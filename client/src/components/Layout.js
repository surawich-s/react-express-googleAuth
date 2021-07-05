import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from "@material-ui/icons/Instagram";
import Avatar from "@material-ui/core/Avatar";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import GoogleAuth from "./GoogleAuth";
import { getReqUser, googleAuthLogin } from "../api/";
import { googleLogin } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  appbar: {
    width: "100%",
    height: "70px",
    marginBottom: "20px",
    backgroundColor: "#fefefe",
  },
  menuButton: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

function Layout({ children }) {
  const classes = useStyles();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const renderedSignIn = () => {
    if (user.isSignedIn) {
      return (
        <Avatar
          alt={user.userInfo.name}
          src={user.userInfo.picture}
          className={classes.avatar}
          onClick={() => history.push(`/profile/${user.userInfo._id}`)}
        />
      );
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const googleLoginUrl = "http://localhost:5000/api/v1/google";
    const newWindow = window.open(
      googleLoginUrl,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      let timer = setInterval(() => {
        if (newWindow.closed) {
          dispatch(googleLogin());
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <>
      <Container className={classes.root}>
        <AppBar position="static" className={classes.appbar} elevation={1}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="secondary"
              aria-label="menu"
              onClick={() => history.push("/")}
            >
              <InstagramIcon />
              Instagram
            </IconButton>
            {renderedSignIn()}
            {/* <GoogleAuth /> */}
            <Button onClick={handleLogin}>Login Bro</Button>
          </Toolbar>
        </AppBar>
        {children}
      </Container>
    </>
  );
}

export default Layout;
