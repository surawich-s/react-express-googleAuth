import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  CardContent,
  CardActions,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { commentPost } from "../../actions/";

const useStyles = makeStyles((theme) => ({
  commentFormContainer: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  commentform: {
    display: "flex",
    flexDirection: "row",
  },
  field: {
    display: "block",
    border: "none",
  },
  noBorder: {
    border: "none",
  },
}));

function CommentForm({ userId, postId, inputRef }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      const commentData = { commentDetail: comment };
      dispatch(commentPost(postId, commentData));
      setComment("");
    }
  };
  return (
    <CardContent className={classes.commentFormContainer}>
      <form
        className={classes.commentform}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          value={comment}
          className={classes.field}
          variant="outlined"
          onChange={(e) => setComment(e.target.value)}
          inputRef={inputRef}
          multiline
          rows={1}
          fullWidth
          placeholder="Add a comment..."
          required
          margin="none"
          InputProps={{
            classes: { notchedOutline: classes.noBorder },
          }}
        />
        <CardActions>
          <Button
            style={{ marginLeft: "auto" }}
            type="submit"
            color="primary"
            disabled={comment.length > 0 ? false : true}
          >
            Post
          </Button>
        </CardActions>
      </form>
    </CardContent>
  );
}

export default CommentForm;
