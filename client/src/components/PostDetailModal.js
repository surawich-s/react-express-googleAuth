import React from "react";
import { Modal, makeStyles } from "@material-ui/core";
import PostDetail from "./PostDetail";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
        <div>
          <PostDetail post={post} ref={ref} />
        </div>
      </Modal>
    </>
  );
}

export default PostDetailModal;
