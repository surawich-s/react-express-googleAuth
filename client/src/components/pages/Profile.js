import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, ThemeProvider } from "@material-ui/core";
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
  avatarContainer: {
    marginLeft: "auto",
    marginRight: "auto",
  },

  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },

  profileButton: {
    marginLeft: theme.spacing(2),
  },
}));

function Profile() {
  const classes = useStyles();
  const { user, userLogin, posts } = useSelector((state) => ({
    user: state.user.fetchedUser,
    userLogin: state.user.userInfo,
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

  if (!posts || !user || !userLogin) {
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
              className={classes.avatarContainer}
            >
              <Avatar
                className={classes.avatar}
                alt={user.name}
                src={user.picture}
              />
            </Grid>
            <Grid item xs={7}>
              <Typography gutterBottom variant="h6" color="textPrimary">
                {user.name}

                {user._id === userLogin._id ? (
                  <Button
                    variant="outlined"
                    className={classes.profileButton}
                    onClick={() => history.push(`/profile/${id}/edit`)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.profileButton}
                  >
                    Follow
                  </Button>
                )}
              </Typography>

              <Typography>{user.profileDescription}</Typography>
            </Grid>
          </Grid>
        </Paper>
        {user._id === userLogin._id && (
          <PostForm id={id} userName={user.name} userAvatar={user.picture} />
        )}
      </Container>
      <UserPosts posts={posts} />
    </>
  );
}

export default Profile;
