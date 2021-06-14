import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router";
import SettingButton from "./SettingButton";

function CommentList({ post, user }) {
  const history = useHistory();

  return (
    <>
      <Typography variant="body1" color="textPrimary" component="p">
        <Link onClick={() => history.push(`/profile/${post.userId}`)}>
          {post.userName}
        </Link>{" "}
        <span style={{ textDecorationStyle: "none" }}>
          {post.postDescription}
        </span>
      </Typography>
      <Grid container direction="column">
        {post.comments.map((comment) => (
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
              <SettingButton style={{ marginLeft: "auto" }} />
            ) : null}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CommentList;
