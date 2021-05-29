import React, { forwardRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  Container,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "80%",
  },
  media: {
    width: 600,
    height: 600,
    // paddingTop: "56.25%",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
  },
}));

function PostDetail({ post }, ref) {
  const classes = useStyles();

  return (
    <Card className={classes.root} ref={ref}>
      {/* <CardMedia className={classes.media} image={post.postImage} /> */}
      <img
        className={classes.media}
        src={post.postImage}
        alt={post.postDescription}
      />
      <Container className={classes.detail}>
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
        <CardContent>
          <Typography
            id="simple-modal-description"
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {post.postDescription}
          </Typography>
        </CardContent>
      </Container>
    </Card>
  );
}

export default forwardRef(PostDetail);
