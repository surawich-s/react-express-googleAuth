import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Avatar, LinearProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { fetchUser, fetchUserPosts } from '../actions';
import FollowButton from '../components/FollowButton';
import UserPosts from '../components/UserPosts';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '10px',
	},
	paper: {
		padding: theme.spacing(2),
		maxWidth: '100%',
		backgroundColor: 'inherit',
	},
	avatarContainer: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},

	avatar: {
		width: theme.spacing(15),
		height: theme.spacing(15),
	},

	profileHeader: {
		display: 'flex',
		paddingLeft: 0,
		flexWrap: 'wrap',
	},

	profileName: {
		marginRight: theme.spacing(2),
	},

	profileButton: {
		// marginLeft: theme.spacing(2),
		// maxWidth: "fit-content",
	},

	userProfileInfo: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},

	userProfileInfoElement: {
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(1),
		'& span': {
			fontWeight: 'bold',
		},
	},

	userPostsBox: {
		display: 'flex',
		justifyContent: 'center',
	},
}));

function Profile() {
	const classes = useStyles();
	const { user, userLogin, posts } = useSelector((state) => ({
		user: state.user.fetchedUser,
		userLogin: state.user.userInfo,
		posts: Object.values(state.post),
	}));
	const dispatch = useDispatch();
	const { id } = useParams();
	const history = useHistory();

	useEffect(() => {
		function fetchUserAndPost() {
			dispatch(fetchUser(id));
			dispatch(fetchUserPosts(id));
		}
		fetchUserAndPost();
	}, [dispatch, id]);

	if (!posts || !user || !userLogin) {
		return <LinearProgress />;
	}

	// TODO: need restful way to get userpost from server
	const userPosts = posts.filter((post) => post._user._id === user._id);

	return (
		<>
			<Container className={classes.root}>
				<Paper className={classes.paper} elevation={0}>
					<Grid container spacing={5}>
						<Grid
							item
							xs={5}
							container
							justify="flex-end"
							className={classes.avatarContainer}
						>
							<Avatar className={classes.avatar} alt={user.name} src={user.picture} />
						</Grid>
						<Grid item xs={7}>
							<Container className={classes.profileHeader}>
								<Typography
									className={classes.profileName}
									variant="h6"
									color="textPrimary"
								>
									{user.name}
								</Typography>

								{user._id === userLogin._id ? (
									<Box className={classes.profileButton}>
										<Button
											variant="outlined"
											onClick={() => history.push(`/profile/${id}/edit`)}
											style={{ backgroundColor: 'transparent' }}
										>
											Edit Profile
										</Button>
									</Box>
								) : (
									<Box className={classes.profileButton}>
										<FollowButton id={user._id} />
									</Box>
								)}
							</Container>

							<Grid item className={classes.userProfileInfo}>
								<Grid item className={classes.userProfileInfoElement}>
									<Typography variant="body1">
										<span>{user.postCount}</span> posts
									</Typography>
								</Grid>
								<Grid item className={classes.userProfileInfoElement}>
									<Typography variant="body1">
										<span>{user.followerCount}</span> followers
									</Typography>
								</Grid>
								<Grid item className={classes.userProfileInfoElement}>
									<Typography variant="body1">
										<span>{user.followingCount}</span> following
									</Typography>
								</Grid>
							</Grid>

							<Typography>{user.profileDescription}</Typography>
						</Grid>
					</Grid>
				</Paper>
				<Box className={classes.userPostsBox}>
					<UserPosts posts={userPosts.reverse()} />
				</Box>
			</Container>
		</>
	);
}

export default Profile;
