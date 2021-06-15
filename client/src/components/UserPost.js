import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import PostDetailModal from "./PostDetailModal";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

function UserPost({ post }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <img
        className={classes.image}
        src={post.postImage}
        alt={post._id}
        onClick={() => setOpen(true)}
      />
      <PostDetailModal post={post} open={open} setOpen={setOpen} />
    </>
  );
}

export default UserPost;
