import React from 'react';
import UserPost from './UserPost';
import { Grid, makeStyles, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	userPostsBox: {
		width: '70vw',
		paddingTop: theme.spacing(3),
		marginTop: theme.spacing(3),
	},
	userPostsGridContiner: {},
	noPosts: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},
}));

function UserPosts({ posts }) {
	const classes = useStyles();

	return (
		<Box className={classes.userPostsBox} borderTop={1} borderColor="dbdbdb">
			<Grid
				container
				justifyContent="center"
				className={classes.userPostsGridContiner}
				spacing={2}
			>
				{posts.map((post) => (
					<Grid key={post._id} item xs={12} sm={6} md={4}>
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
