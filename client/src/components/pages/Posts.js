import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../actions";
import { CircularProgress, makeStyles, Grid } from "@material-ui/core";
import PostDetail from "../PostDetail";

const useStyles = makeStyles((theme) => ({
  post: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

function Posts(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (!posts) {
    return <CircularProgress />;
  }

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      {posts.map((post) => (
        <Grid className={classes.post} item xs={12} key={post._id}>
          <PostDetail post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
