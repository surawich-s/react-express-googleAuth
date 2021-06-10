import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from "@material-ui/icons/Instagram";
import Avatar from "@material-ui/core/Avatar";
import { Button, CircularProgress } from "@material-ui/core";

import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import GoogleAuth from "./GoogleAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  appbar: {
    width: "100%",
    height: "70px",
    marginBottom: "20px",
    backgroundColor: "#fefefe",
  },
  menuButton: {
    marginLeft: theme.spacing(15),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

function Layout({ children }) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
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

  // const renderedContent = () => {
  //   if (user._id) {
  //     return { children };
  //   }
  // };

  return (
    <div className={classes.root}>
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
          </IconButton>
          <Typography variant="h6" className={classes.title} color="secondary">
            Instagram
          </Typography>
          {renderedSignIn()}
          <GoogleAuth />
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}

export default Layout;
