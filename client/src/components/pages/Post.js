import React from "react";
import { useParams } from "react-router";
import PostDetail from "../PostDetail";

function Post({ post }) {
  const { id } = useParams();
  return (
    <>
      <PostDetail post={post} />
    </>
  );
}

export default Post;
