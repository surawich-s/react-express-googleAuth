import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../actions";
import {
  CircularProgress,
  makeStyles,
  Grid,
  Container,
} from "@material-ui/core";
import PostDetail from "../PostDetail";

const useStyles = makeStyles((theme) => ({
  postsContainer: {
    width: "100%",
    // backgroundColor: "cornsilk",
    paddingTop: "10px",
    paddingLeft: 0,
    paddingRight: 0,
  },
  post: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

function Posts(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.post));
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (!posts) {
    return <CircularProgress />;
  }

  return (
    <Container className={classes.postsContainer} maxWidth="lg">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {posts.map((post) => (
          <Grid className={classes.post} item xs={8} key={post._id}>
            <PostDetail post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Posts;
