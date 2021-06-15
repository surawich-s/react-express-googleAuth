import React, { useEffect } from "react";
import PostDetail from "../PostDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../../actions";
import { useParams } from "react-router-dom";

function Post(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector((state) => state.post[id]);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, []);
  if (!post) {
    return <div>Loading...</div>;
  }
  return <PostDetail post={post} />;
}

export default Post;
