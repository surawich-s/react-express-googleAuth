import React, { forwardRef, useRef, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  makeStyles,
  Box,
  CircularProgress,
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

  if (!user || !postData || !post) {
    return <CircularProgress />;
  } else {
    return (
      <Box style={{ display: "inline-block" }}>
        <Card className={classes.root} ref={ref}>
          <PostDetailHeader post={post} />
          <CardMedia className={classes.media} image={post.postImage} />
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
      </Box>
    );
  }
}

export default forwardRef(PostDetail);
