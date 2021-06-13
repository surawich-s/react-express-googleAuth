import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router";

function CommentList({ post }) {
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
          <Grid item key={comment._id}>
            <Typography variant="body1" color="textPrimary" component="p">
              <Link onClick={() => history.push(`/profile/${comment.userId}`)}>
                {comment.userName}
              </Link>{" "}
              {comment.commentDetail}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CommentList;
