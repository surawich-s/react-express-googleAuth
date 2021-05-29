import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../actions";
import {
  CircularProgress,
  makeStyles,
  Container,
  Box,
} from "@material-ui/core";
import PostDetail from "../PostDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
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
  }, []);

  if (!posts) {
    return <CircularProgress />;
  }

  return (
    <Container className={classes.root}>
      {posts.map((post) => (
        <Container className={classes.post}>
          <PostDetail post={post} key={post._id} />
        </Container>
      ))}
    </Container>
  );
}

export default Posts;
