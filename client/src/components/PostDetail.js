import React, { forwardRef } from "react";
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
  Container,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

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
}));

function PostDetail({ post }, ref) {
  const classes = useStyles();

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
        <CardContent>
          <Typography
            id="simple-modal-description"
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {post.userName}
          </Typography>
          <Typography
            id="simple-modal-description"
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {post.postDescription}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default forwardRef(PostDetail);
