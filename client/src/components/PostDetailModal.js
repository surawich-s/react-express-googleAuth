import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import PostDetail from "./PostDetail";

function PostDetailModal() {
  const [open, setOpen] = useState(true);
  const ref = React.useRef();
  const post = useSelector((state) => state.post);
  if (!post) {
    return <div>No Modal</div>;
  } else {
    setOpen(true);
  }

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
      >
        <PostDetail post={post} ref={ref} />
      </Modal>
    </>
  );
}

export default PostDetailModal;
