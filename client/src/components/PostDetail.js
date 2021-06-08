import React, { forwardRef, useRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  Box,
  Grid,
  Link,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import LikeButton from "./PostDetailComponents/LikeButton";
import CommentForm from "./PostDetailComponents/CommentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    width: 600,
    // alignItems: "center",
    // justifyContent: "center",
  },
  media: {
    width: 600,
    height: 600,
    // paddingTop: "56.25%",
  },
  actionbar: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
  },
}));

function PostDetail({ post }, ref) {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user.userInfo);
  const inputRef = useRef();

  const handleFocus = (e) => {
    e.preventDefault();
    inputRef.current.focus();
  };

  return (
    <Box style={{ display: "inline-block" }}>
      <Card className={classes.root} ref={ref}>
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
              <MoreHorizIcon />
            </IconButton>
          }
          title={
            <Typography onClick={() => history.push(`/profile/${post.userId}`)}>
              {post.userName}
            </Typography>
          }
        />
        <CardMedia className={classes.media} image={post.postImage} />
        <CardActions className={classes.actionbar}>
          <LikeButton user={user} postId={post._id} />
          <IconButton aria-label="comment" onClick={handleFocus}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton aria-label="save" style={{ marginLeft: "auto" }}>
            <BookmarkBorderIcon />
          </IconButton>
        </CardActions>
        <CardContent className={classes.content}>
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
                  <Link
                    onClick={() => history.push(`/profile/${comment.userId}`)}
                  >
                    {comment.userName}
                  </Link>{" "}
                  {comment.commentDetail}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CommentForm user={user} postId={post._id} inputRef={inputRef} />
      </Card>
    </Box>
  );
}

export default forwardRef(PostDetail);
