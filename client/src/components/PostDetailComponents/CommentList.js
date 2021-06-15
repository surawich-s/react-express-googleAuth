import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import SettingButton from "./SettingButton";
import { updatePost } from "../../actions";

function CommentList({ postData, user, handleChange }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleRemove = (index) => {
    postData.comments.splice(index, 1);
    handleChange(postData);
    dispatch(updatePost(postData._id, postData));
  };

  return (
    <>
      <Typography variant="body1" color="textPrimary" component="p">
        <Link onClick={() => history.push(`/profile/${postData.userId}`)}>
          {postData.userName}
        </Link>{" "}
        <span style={{ textDecorationStyle: "none" }}>
          {postData.postDescription}
        </span>
      </Typography>
      <Grid container direction="column">
        {postData.comments.map((comment, index) => (
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
              <Link onClick={() => history.push(`/profile/${comment.userId}`)}>
                {comment.userName}
              </Link>{" "}
              {comment.commentDetail}
            </Typography>
            {user._id === comment.userId ? (
              <SettingButton
                index={index}
                handleRemove={handleRemove}
                style={{ marginLeft: "auto" }}
              />
            ) : null}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CommentList;
