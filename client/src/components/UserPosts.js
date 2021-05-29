import React, { useState } from "react";
import UserPost from "./UserPost";
import PostDetail from "./PostDetail";
import {
  Grid,
  CircularProgress,
  Container,
  makeStyles,
  Box,
  Modal,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userPostsBox: {
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function UserPosts({ posts }) {
  const classes = useStyles();
  const ref = React.useRef();
  const [currentPost, setCurrentPost] = useState(null);
  const [open, setOpen] = useState(false);

  if (!posts) {
    return <CircularProgress />;
  }

  const handleModal = (post) => {
    setCurrentPost(post);
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPost(null);
  };
  return (
    <>
      <Box
        className={classes.userPostsBox}
        borderTop={1}
        borderColor="grey.500"
      >
        <Container maxWidth="md">
          <Grid container spacing={1}>
            {posts.map((post) => (
              <Grid key={post._id} item xs={12} sm={6} md={4}>
                <UserPost post={post} handleModal={handleModal} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <div>
          <PostDetail post={currentPost} ref={ref} />
        </div>
      </Modal>
    </>
  );
}

export default UserPosts;
