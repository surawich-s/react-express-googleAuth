import React, { useEffect } from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SettingButton from "./SettingButton";
import { fetchComments } from "../../actions";

function CommentList({ postId, userId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const comments = useSelector((state) => Object.values(state.comment));

  const handleRemove = (index) => {
    // postData.comments.splice(index, 1);
    // dispatch(updatePost(postData._id, postData));
    // dispatch deleteComment
  };

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, []);

  return (
    <>
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
            {userId === comment._user._id ? (
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
