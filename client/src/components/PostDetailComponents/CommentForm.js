import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  CardContent,
  CardActions,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { updatePost } from "../../actions/";

const INITIAL_STATE = {
  userId: "",
  userName: "",
  commentDetail: "",
  createdAt: "",
};

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

function CommentForm({ user, postData, handleChange, inputRef }) {
  const [comment, setComment] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      postData.comments.push(comment);
      console.log(postData);
      handleChange(postData);
      dispatch(updatePost(postData._id, postData));
    }
    setComment(INITIAL_STATE);
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
          value={comment.commentDetail}
          className={classes.field}
          variant="outlined"
          onChange={(e) =>
            setComment((prevState) => ({
              ...prevState,
              commentDetail: e.target.value,
              userId: user._id,
              userName: user.name,
              createdAt: new Date(),
            }))
          }
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
            disabled={comment.commentDetail.length > 0 ? false : true}
          >
            Post
          </Button>
        </CardActions>
      </form>
    </CardContent>
  );
}

export default CommentForm;
