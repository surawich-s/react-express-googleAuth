import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Avatar, LinearProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchUser, fetchUserPosts } from "../../actions/";
import PostForm from "../Forms/PostForm";
import UserPosts from "../UserPosts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
    paddingLeft: theme.spacing(30),
  },

  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
}));

function Profile() {
  const classes = useStyles();
  const { user, posts } = useSelector((state) => ({
    user: state.user.fetchedUser,
    posts: state.post,
  }));
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    function fetchUserAndPost() {
      dispatch(fetchUser(id));
      dispatch(fetchUserPosts(id));
      // console.log(posts);
    }
    fetchUserAndPost();
  }, [dispatch, id]);

  if (!posts || !user) {
    return <LinearProgress />;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={10}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <Avatar
                className={(classes.img, classes.large)}
                alt={user.name}
                src={user.picture}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" color="textPrimary">
                  {user.name}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  ID: {user._id}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <PostForm id={id} userName={user.name} userAvatar={user.picture} />
      <UserPosts posts={posts} id={id} />
    </div>
  );
}

export default Profile;
