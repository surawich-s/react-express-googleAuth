import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Avatar, LinearProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchUser, fetchUserPosts } from "../../actions/";
import PostForm from "../Forms/PostForm";
import UserPosts from "../UserPosts";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: "100%",
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
  },

  large: {
    width: "auto",
    height: "auto",
  },
}));

function Profile() {
  const classes = useStyles();
  const { user, posts } = useSelector((state) => ({
    user: state.user.fetchedUser,
    posts: Object.values(state.post),
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
    <>
      <Container className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={5}>
            <Grid item xs={4} className={classes.avatar}>
              <Avatar
                className={(classes.img, classes.large)}
                alt={user.name}
                src={user.picture}
              />
            </Grid>
            <Grid item xs={8} sm>
              <Typography gutterBottom variant="h5" color="textPrimary">
                {user.name}
              </Typography>
            </Grid>
          </Grid>
          <Typography>This is Profile's Description</Typography>
        </Paper>
        <PostForm id={id} userName={user.name} userAvatar={user.picture} />

        <UserPosts posts={posts} id={id} />
      </Container>
    </>
  );
}

export default Profile;
