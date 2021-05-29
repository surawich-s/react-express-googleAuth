import React from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  image: {
    width: "300px",
    height: "300px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  },
}));

function UserPost({ post, handleModal }) {
  const classes = useStyles();

  return (
    <>
      <img
        className={classes.image}
        src={post.postImage}
        alt={post._id}
        onClick={() => handleModal(post)}
      />
    </>
  );
}

export default UserPost;
