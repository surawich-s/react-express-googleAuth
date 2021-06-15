import React from "react";
import { CardHeader, Avatar, IconButton, Typography } from "@material-ui/core";
import SettingButton from "./SettingButton";
import { useHistory } from "react-router";

function PostDetailHeader({ post }) {
  const history = useHistory();
  return (
    <CardHeader
      id="simple-modal-title"
      avatar={
        <Avatar
          aria-label="avatar"
          alt={post.userName}
          src={post.userAvatar}
          onClick={() => history.push(`/profile/${post.userId}`)}
        ></Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <SettingButton postId={post._id} />
        </IconButton>
      }
      title={
        <Typography onClick={() => history.push(`/profile/${post.userId}`)}>
          {post.userName}
        </Typography>
      }
    />
  );
}

export default PostDetailHeader;
