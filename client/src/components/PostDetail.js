import React, { forwardRef, useRef } from "react";
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
  Avatar,
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
    height: "auto",
    objectFit: "cover",
  },
  mediaModal: {
    width: "100%",
    height: "50vw",
  },
  actionbar: {
    paddingTop: 0,
    paddingBottom: 0,
    bottom: 0,
  },
  likeModal: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
  },

  contentModal: {
    paddingTop: 0,
  },

  postDescriptionContainer: {
    display: "flex",
  },

  postDescriptionAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

function PostDetail({ post }, ref) {
  const classes = useStyles();
  const user = useSelector((state) => state.user.userInfo);
  const inputRef = useRef();
  const history = useHistory();

  const handleFocus = (e) => {
    e.preventDefault();
    inputRef.current.focus();
  };

  const renderedPostDetail = () => {
    if (ref) {
      return (
        <Card className={classes.rootmodal} ref={ref}>
          <Grid container>
            <Grid item xs={12} sm={7} md={8}>
              <img className={classes.mediaModal} src={post.postImage} />
            </Grid>

            <Grid
              item
              md={4}
              sm={5}
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "auto",
              }}
            >
              <PostDetailHeader post={post} />
              <CardContent
                className={classes.contentModal}
                // style={{ flexGrow: "1" }}
              >
                <div className={classes.postDescriptionContainer}>
                  <Avatar
                    aria-label="avatar"
                    alt={post._user.name}
                    src={post._user.picture}
                    onClick={() => history.push(`/profile/${post._user._id}`)}
                    className={classes.postDescriptionAvatar}
                  />
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
                </div>

                <CommentList
                  comments={post._comments}
                  postId={post._id}
                  userId={user._id}
                  showAvatar={true}
                />
              </CardContent>
              <div
                style={{
                  bottom: "0",
                  marginTop: "auto",
                }}
              >
                {/* <div> */}
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
        <Card className={classes.root}>
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
            <CommentList
              comments={post._comments}
              postId={post._id}
              userId={user._id}
            />
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

  if (!user || !post) {
    return <LinearProgress />;
  } else {
    return <>{renderedPostDetail()}</>;
  }
}

export default forwardRef(PostDetail);
