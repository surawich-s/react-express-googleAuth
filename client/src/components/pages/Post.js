import React, { useEffect, useRef } from "react";
import { makeStyles, LinearProgress } from "@material-ui/core";
import PostDetail from "../PostDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../../actions";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    margin: "auto",
  },
}));

function Post(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector((state) => state.post[id]);
  const ref = useRef();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, []);
  if (!post) {
    return <LinearProgress />;
  }
  return (
    <div className={classes.root}>
      <PostDetail post={post} ref={ref} />
    </div>
  );
}

export default Post;
