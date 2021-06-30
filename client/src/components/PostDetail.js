import React, { forwardRef, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  makeStyles,
  Grid,
  LinearProgress,
  Typography,
  Link,
} from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import PostDetailHeader from "./PostDetailComponents/PostDetailHeader";
import LikeDetail from "./PostDetailComponents/LikeDetail";
import LikeButton from "./PostDetailComponents/LikeButton";
import CommentList from "./PostDetailComponents/CommentList";
import CommentForm from "./PostDetailComponents/CommentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "auto",
  },
  rootmodal: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "auto",
    marginRight: "auto",
  },
  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  actionbar: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  likeModal: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
  },
}));

function PostDetail({ post }, ref) {
  const classes = useStyles();
  const user = useSelector((state) => state.user.userInfo);
  const inputRef = useRef();
  const history = useHistory();
  const [postData, setPostData] = useState(post);

  const handleFocus = (e) => {
    e.preventDefault();
    console.log(ref);
    inputRef.current.focus();
  };

  const handleChange = (changedPostData) => {
    setPostData(changedPostData);
  };

  const renderedPostDetail = () => {
    if (ref) {
      return (
        <Card className={classes.rootmodal} ref={ref}>
          <Grid container>
            <Grid item md={8}>
              <img className={classes.media} src={post.postImage} />
            </Grid>

            <Grid
              item
              md={4}
              sm={12}
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "auto",
              }}
            >
              <PostDetailHeader post={post} />
              <CardContent
                className={classes.content}
                style={{ flexGrow: "1" }}
              >
                <Typography variant="body1" color="textPrimary" component="p">
                  <Link
                    onClick={() => history.push(`/profile/${post._user._id}`)}
                  >
                    {post._user.name}
                  </Link>{" "}
                  <span style={{ textDecorationStyle: "none" }}>
                    {post.postDescription}
                  </span>
                </Typography>
                <CommentList postId={post._id} userId={user._id} />
              </CardContent>
              <div style={{ marginBottom: "auto" }}>
                <CardActions className={classes.actionbar}>
                  <LikeButton userId={user._id} postId={post._id} />
                  <IconButton aria-label="comment" onClick={handleFocus}>
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  <IconButton aria-label="save" style={{ marginLeft: "auto" }}>
                    <BookmarkBorderIcon />
                  </IconButton>
                </CardActions>
                <CardContent className={classes.likeModal}>
                  <LikeDetail likesCount={post.likesCount} />
                </CardContent>
                <CommentForm
                  userId={user._id}
                  postId={post._id}
                  inputRef={inputRef}
                />
              </div>
            </Grid>
          </Grid>
        </Card>
      );
    } else {
      return (
        <Card className={classes.root} ref={ref}>
          <PostDetailHeader post={post} />
          <img className={classes.media} src={post.postImage} />
          <CardActions className={classes.actionbar}>
            <LikeButton userId={user._id} postId={post._id} />
            <IconButton aria-label="comment" onClick={handleFocus}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton aria-label="save" style={{ marginLeft: "auto" }}>
              <BookmarkBorderIcon />
            </IconButton>
          </CardActions>

          <CardContent className={classes.content}>
            <LikeDetail likesCount={post.likesCount} />
            <Typography variant="body1" color="textPrimary" component="p">
              <Link onClick={() => history.push(`/profile/${post._user._id}`)}>
                {post._user.name}
              </Link>{" "}
              <span style={{ textDecorationStyle: "none" }}>
                {post.postDescription}
              </span>
            </Typography>
            <CommentList postId={post._id} userId={user._id} />
          </CardContent>
          <CommentForm
            userId={user._id}
            postId={post._id}
            inputRef={inputRef}
          />
        </Card>
      );
    }
  };

  if (!user || !postData || !post) {
    return <LinearProgress />;
  } else {
    return <>{renderedPostDetail()}</>;
  }
}

export default forwardRef(PostDetail);
