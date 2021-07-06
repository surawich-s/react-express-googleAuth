import React from "react";
import { Grid, Typography, Link, Avatar, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import SettingButton from "./SettingButton";
import { removeComment } from "../../actions";

const useStyles = makeStyles((theme) => ({
  commentAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

function CommentList({ comments, postId, userId, showAvatar }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleRemove = (commentId) => {
    dispatch(removeComment(postId, commentId));
  };

  return (
    <>
      {comments && (
        <Grid container direction="column">
          {comments.map((comment, index) => (
            <Grid
              item
              key={comment._id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {showAvatar && (
                <Avatar
                  aria-label="avatar"
                  alt={comment._user.name}
                  src={comment._user.picture}
                  onClick={() => history.push(`/profile/${comment._user._id}`)}
                  className={classes.commentAvatar}
                />
              )}

              <Typography variant="body1" color="textPrimary" component="p">
                <Link
                  onClick={() => history.push(`/profile/${comment._user._id}`)}
                >
                  {comment._user.name}
                </Link>{" "}
                {comment.commentDetail}
              </Typography>
              {userId === comment._user._id && (
                <SettingButton
                  ownId={comment._id}
                  commentUserId={comment._user._id}
                  userId={userId}
                  handleRemove={handleRemove}
                  style={{ marginLeft: "auto" }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default CommentList;
