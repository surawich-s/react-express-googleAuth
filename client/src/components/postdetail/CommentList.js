import React from "react";
import { Grid, Typography, Link, Avatar, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import SettingButton from "./SettingButton";
import { removeComment } from "../../actions";

const useStyles = makeStyles((theme) => ({
  comment: {
    paddingTop: theme.spacing(1),
  },
  commentDetailContainer: {
    display: "flex",
    flexDirection: "row",
  },
  commentAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
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
            <>
              <Grid
                container
                className={classes.comment}
                key={comment._id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {showAvatar && (
                  <Grid item xs={2}>
                    <Avatar
                      aria-label="avatar"
                      alt={comment._user.name}
                      src={comment._user.picture}
                      onClick={() =>
                        history.push(`/profile/${comment._user._id}`)
                      }
                      className={classes.commentAvatar}
                    />
                  </Grid>
                )}

                <Grid item xs={10} className={classes.commentDetailContainer}>
                  <Typography variant="body1" color="textPrimary" component="p">
                    <Link
                      onClick={() =>
                        history.push(`/profile/${comment._user._id}`)
                      }
                    >
                      {comment._user.name}
                    </Link>{" "}
                    {comment.commentDetail}
                  </Typography>
                  <div style={{ marginLeft: "auto" }}>
                    {userId === comment._user._id && (
                      <SettingButton
                        ownId={comment._id}
                        commentUserId={comment._user._id}
                        userId={userId}
                        handleRemove={handleRemove}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                  <Typography
                    className={classes.date}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {comment.createdAt}
                  </Typography>
                </Grid>
              </Grid>
            </>
          ))}
        </Grid>
      )}
    </>
  );
}

export default CommentList;
