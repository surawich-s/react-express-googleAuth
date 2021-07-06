import React from "react";
import UserPost from "./UserPost";
import { Grid, makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userPostsBox: {
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  noPosts: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

function UserPosts({ posts }) {
  const classes = useStyles();

  return (
    <Box className={classes.userPostsBox} borderTop={1} borderColor="grey.500">
      <Grid
        container
        // justify="center"
        className={classes.userPostsGridContiner}
        spacing={2}
      >
        {posts.map((post) => (
          <Grid
            key={post._id}
            item
            xs={6}
            sm={4}

            // style={{ padding: 0 }}
          >
            <UserPost post={post} />
          </Grid>
        ))}
        {posts.length < 1 && (
          <Typography className={classes.noPosts}>No Posts</Typography>
        )}
      </Grid>
    </Box>
  );
}

export default UserPosts;
