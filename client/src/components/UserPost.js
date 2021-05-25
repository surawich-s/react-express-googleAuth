import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "300px",
    height: "300px",
  },
}));

function UserPost({ post }) {
  const classes = useStyles();
  return <img className={classes.image} src={post.postImage} alt={post._id} />;
}

export default UserPost;
