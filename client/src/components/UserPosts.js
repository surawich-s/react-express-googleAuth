import React from "react";
import UserPost from "./UserPost";
import { Grid, Container, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userPostsBox: {
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

function UserPosts({ posts }) {
  const classes = useStyles();

  return (
    <Box className={classes.userPostsBox} borderTop={1} borderColor="grey.500">
      {/* <Container className={classes.userPostsContainer} maxWidth="lg"> */}
      <Grid container spacing={1}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={4} style={{ padding: 0 }}>
            <UserPost post={post} />
          </Grid>
        ))}
      </Grid>
      {/* </Container> */}
    </Box>
  );
}

export default UserPosts;
