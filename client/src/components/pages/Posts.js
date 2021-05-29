import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../actions";
import { CircularProgress } from "@material-ui/core";
import PostDetail from "../PostDetail";

function Posts(props) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (!posts) {
    return <CircularProgress />;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostDetail post={post} key={post._id} />
      ))}
    </div>
  );
}

export default Posts;
