import React from "react";
import { Modal, makeStyles } from "@material-ui/core";
import PostDetail from "./PostDetail";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "block",
    position: "absolute",
    marginTop: "10%",
    overflow: "scroll",
  },
}));

function PostDetailModal({ post, open, setOpen }) {
  const ref = React.useRef();
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <PostDetail post={post} ref={ref} />
      </Modal>
    </>
  );
}

export default PostDetailModal;
