import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from "@material-ui/icons/Instagram";
import Avatar from "@material-ui/core/Avatar";

import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(15),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const renderedSignIn = () => {
    if (user.isSignedIn) {
      return (
        <Avatar
          alt={user.userInfo.name}
          src={user.userInfo.picture}
          onClick={() => history.push(`/profile/${user.userInfo._id}`)}
        />
      );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <InstagramIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Instagram
          </Typography>
          {renderedSignIn()}
          <Button color="inherit">
            <GoogleAuth />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
