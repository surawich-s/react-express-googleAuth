import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
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
  card: {
    display: "flex",
  },
  image: {
    width: theme.spacing(100),
  },
  detail: {
    display: "flex",
    flexDirection: "column",
  },
}));

function PostDetail({ post }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        style={{ height: 0, paddingTop: "56.25%" }}
        image={post.postImage}
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
            color="textSecondary"
            component="p"
          >
            {post.postDescription}
          </Typography>
        </CardContent>
      </Container>
    </Card>
  );
}

export default PostDetail;
