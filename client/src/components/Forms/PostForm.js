import React, { useState } from "react";
import FileBase from "react-file-base64";
import {
  Typography,
  Button,
  Container,
  TextField,
  makeStyles,
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createPost } from "../../actions/";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

function PostForm({ id }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [postData, setPostData] = useState({
    userId: id,
    postImage: "",
    postDescription: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postData.postImage) {
      dispatch(createPost(postData));
      history.push(`/profile/${id}`);
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Post
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, postImage: base64 })
          }
        />
        <TextField
          onChange={(e) =>
            setPostData({ ...postData, postDescription: e.target.value })
          }
          className={classes.field}
          label="Description"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
        />

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default PostForm;
