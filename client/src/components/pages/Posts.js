import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../actions";

function Posts(props) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (posts) {
    console.log(posts);
  }
  return <div>Posts</div>;
}

export default Posts;
