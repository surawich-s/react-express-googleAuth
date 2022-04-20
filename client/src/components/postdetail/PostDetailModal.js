import React, { forwardRef, useRef } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	IconButton,
	makeStyles,
	LinearProgress,
	Typography,
	Link,
	Grid,
	Avatar,
} from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PostDetailHeader from './PostDetailHeader';
import LikeDetail from './LikeDetail';
import LikeButton from './LikeButton';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const useStyles = makeStyles((theme) => ({
	rootmodal: {
		width: '80%',
		height: 'auto',
		maxHeight: '80vh',
		// display: 'flex',
		// flexDirection: 'row',
		// flexWrap: 'wrap',
		marginLeft: 'auto',
		marginRight: 'auto',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		overflowY: 'scroll',
	},
	mediaModal: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		maxHeight: '80vh',
		[theme.breakpoints.down('sm')]: {
			maxHeight: '40vh',
		},
	},
	postDetailHeaderModal: {
		width: '100%',
		borderBottom: '1px ridge #dbdbdb',
		alignSelf: 'start',
	},
	actionbarContainer: {
		width: '100%',
		bottom: 0,
		marginTop: 'auto',
		alignSelf: 'end',
		borderTop: '1px ridge #dbdbdb',
	},
	actionbar: {
		paddingTop: 0,
		paddingBottom: 0,
		bottom: 0,
	},
	likeModal: {
		paddingTop: 0,
		paddingBottom: 0,
	},
	contentModal: {
		paddingTop: 0,
		overflow: 'auto',
		flex: '1',
		maxHeight: '50vh',
		[theme.breakpoints.down('md')]: {
			maxHeight: '50vh',
		},
		[theme.breakpoints.down('sm')]: {
			maxHeight: '20vh',
		},
	},

	postDescriptionContainer: {
		display: 'flex',
		paddingTop: theme.spacing(1),
	},

	postDescriptionAvatar: {
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
}));

function PostDetailModal({ post }, ref) {
	const classes = useStyles();
	const user = useSelector((state) => state.user.userInfo);
	const inputRef = useRef();
	const history = useHistory();

	const handleFocus = (e) => {
		e.preventDefault();
		inputRef.current.focus();
	};

	if (!user || !post) {
		return <LinearProgress />;
	} else {
		return (
			<Card className={classes.rootmodal} ref={ref}>
				<Grid
					container
					style={{
						height: '100%',
						width: '100%',
					}}
				>
					<Grid container item xs={12} md={8}>
						<img
							className={classes.mediaModal}
							src={post.postImage}
							alt={post.postDescription}
						/>
					</Grid>

					<Grid container item xs={12} md={4}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
								width: '100%',
							}}
						>
							<div className={classes.postDetailHeaderModal}>
								<PostDetailHeader post={post} />
							</div>

							<CardContent className={classes.contentModal}>
								<Grid container className={classes.postDescriptionContainer}>
									<Grid item xs={2}>
										<Avatar
											aria-label="avatar"
											alt={post._user.name}
											src={post._user.picture}
											onClick={() => history.push(`/profile/${post._user._id}`)}
											className={classes.postDescriptionAvatar}
										/>
									</Grid>
									<Grid item xs={10}>
										<Typography variant="body1" color="textPrimary" component="p">
											<Link onClick={() => history.push(`/profile/${post._user._id}`)}>
												{post._user.name}
											</Link>{' '}
											<span style={{ textDecorationStyle: 'none' }}>
												{post.postDescription}
											</span>
										</Typography>
									</Grid>
								</Grid>

								<CommentList
									comments={post._comments}
									postId={post._id}
									userId={user._id}
									showAvatar={true}
								/>
							</CardContent>

							<div className={classes.actionbarContainer}>
								<CardActions className={classes.actionbar}>
									<LikeButton userId={user._id} postId={post._id} />
									<IconButton aria-label="comment" onClick={handleFocus}>
										<ChatBubbleOutlineIcon />
									</IconButton>
									<IconButton aria-label="save" style={{ marginLeft: 'auto' }}>
										<BookmarkBorderIcon />
									</IconButton>
								</CardActions>
								<CardContent className={classes.likeModal}>
									<LikeDetail likesCount={post.likesCount} />
								</CardContent>
								<CommentForm userId={user._id} postId={post._id} inputRef={inputRef} />
							</div>
						</div>
					</Grid>
				</Grid>
			</Card>
		);
	}
}

export default forwardRef(PostDetailModal);
