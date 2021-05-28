import React, { useState } from "react";
import { makeStyles, Modal } from "@material-ui/core";
import PostDetail from "./PostDetail";

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

function UserPost({ post }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log("Modal Opened");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <img
        className={classes.image}
        src={post.postImage}
        alt={post._id}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <PostDetail post={post} />
      </Modal>
    </>
  );
}

export default UserPost;
