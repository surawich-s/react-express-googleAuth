import React, { useEffect } from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SettingButton from "./SettingButton";
import { removeComment } from "../../actions";

function CommentList({ comments, postId, userId }) {
  const history = useHistory();
  const dispatch = useDispatch();

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
