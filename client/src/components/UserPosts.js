import React from "react";
import UserPost from "./UserPost";
import {
  Grid,
  CircularProgress,
  Container,
  makeStyles,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userPostsBox: {
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

function UserPosts({ posts, id }) {
  const classes = useStyles();

  console.log(posts);

  if (!posts) {
    return <CircularProgress />;
  }

  return (
    <Box className={classes.userPostsBox} borderTop={1} borderColor="grey.500">
      <Container maxWidth="md">
        <Grid container spacing={1}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={4}>
              <UserPost post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default UserPosts;
