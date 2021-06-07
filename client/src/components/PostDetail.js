import React, { forwardRef, useState } from "react";
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
  TextField,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../actions/";
import { useHistory } from "react-router";

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

const INITIAL_STATE = {
  userId: "",
  userName: "",
  commentDetail: "",
  createdAt: "",
};

function PostDetail({ post }, ref) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.userInfo);

  const [comment, setComment] = useState(INITIAL_STATE);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      // post.comments.push(comment);
      // console.log(post);
      dispatch(updatePost(post._id, comment));
      // post.comments.pop(comment);
    }
    setComment(INITIAL_STATE);
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
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          }
          title={post.userName}
        />
        <CardMedia className={classes.media} image={post.postImage} />
        <CardActions className={classes.actionbar}>
          <IconButton aria-label="like">
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton aria-label="comment">
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
        <CardContent>
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
              >
                Post
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default forwardRef(PostDetail);
