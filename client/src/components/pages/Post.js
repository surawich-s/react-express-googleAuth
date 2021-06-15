import React, { useEffect } from "react";
import PostDetail from "../PostDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../../actions";
import { useParams } from "react-router-dom";

function Post(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const posts = useSelector((state) => state.post);
  const post = posts.filter((post) => post._id === id);

  useEffect(() => {
    dispatch(fetchPostById(id));
    console.log(post);
  }, []);
  if (!post) {
    return <div>Loading...</div>;
  }
  return <PostDetail post={post} />;
}

export default Post;
