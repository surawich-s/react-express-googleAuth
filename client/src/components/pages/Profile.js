import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Avatar, LinearProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
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
    maxHeight: "96px",
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
  const history = useHistory();

  useEffect(() => {
    function fetchUserAndPost() {
      dispatch(fetchUser(id));
      dispatch(fetchUserPosts(id));
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
            <Grid
              item
              xs={5}
              container
              justify="flex-end"
              className={classes.avatar}
            >
              <Avatar
                className={classes.large}
                alt={user.name}
                src={user.picture}
              />
            </Grid>
            <Grid item xs={7}>
              <Typography gutterBottom variant="h6" color="textPrimary">
                {user.name}
                <Button
                  variant="outlined"
                  onClick={() => history.push(`/profile/${id}/edit`)}
                >
                  Edit Profile
                </Button>
              </Typography>

              <Typography>This is Profile's Description</Typography>
            </Grid>
          </Grid>
        </Paper>
        <PostForm id={id} userName={user.name} userAvatar={user.picture} />
      </Container>
      <UserPosts posts={posts} id={id} />
    </>
  );
}

export default Profile;
