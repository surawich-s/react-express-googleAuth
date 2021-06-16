import React, { forwardRef, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  makeStyles,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useSelector } from "react-redux";
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
                <CommentList
                  postData={postData}
                  user={user}
                  handleChange={handleChange}
                />
              </CardContent>
              <div style={{ marginBottom: "auto" }}>
                <CardActions className={classes.actionbar}>
                  <LikeButton
                    user={user}
                    postData={postData}
                    handleChange={handleChange}
                  />
                  <IconButton aria-label="comment" onClick={handleFocus}>
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  <IconButton aria-label="save" style={{ marginLeft: "auto" }}>
                    <BookmarkBorderIcon />
                  </IconButton>
                </CardActions>
                <CardContent className={classes.likeModal}>
                  <LikeDetail postData={postData} />
                </CardContent>
                <CommentForm
                  user={user}
                  postData={postData}
                  handleChange={handleChange}
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
            <LikeButton
              user={user}
              postData={postData}
              handleChange={handleChange}
            />
            <IconButton aria-label="comment" onClick={handleFocus}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton aria-label="save" style={{ marginLeft: "auto" }}>
              <BookmarkBorderIcon />
            </IconButton>
          </CardActions>

          <CardContent className={classes.content}>
            <LikeDetail postData={postData} />
            <CommentList
              postData={postData}
              user={user}
              handleChange={handleChange}
            />
          </CardContent>
          <CommentForm
            user={user}
            postData={postData}
            handleChange={handleChange}
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
