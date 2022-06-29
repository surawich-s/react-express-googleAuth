import React, { useRef } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	IconButton,
	makeStyles,
	LinearProgress,
	Typography,
	Link,
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
	root: {
		width: '80%',
		margin: 'auto',
	},

	media: {
		width: '100%',
		maxHeight: '80vh',
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

	content: {
		paddingTop: 0,
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

function PostFeed({ post }) {
	const classes = useStyles();
	const user = useSelector((state) => state.user.userInfo);
	const inputRef = useRef();
	const history = useHistory();

	const handleFocus = (e) => {
		e.preventDefault();
		inputRef.current.focus();
	};

	if (!post) {
		return <LinearProgress />;
	} else {
		return (
			<Card className={classes.root}>
				<PostDetailHeader post={post} />
				<img
					className={classes.media}
					src={post.postImage}
					alt={post.postDescription}
				/>
				<CardActions className={classes.actionbar}>
					<LikeButton userId={user._id} postId={post._id} />
					<IconButton aria-label="comment" onClick={handleFocus}>
						<ChatBubbleOutlineIcon />
					</IconButton>
					<IconButton aria-label="save" style={{ marginLeft: 'auto' }}>
						<BookmarkBorderIcon />
					</IconButton>
				</CardActions>

				<CardContent className={classes.content}>
					<LikeDetail likesCount={post.likesCount} />
					<Typography variant="body1" color="textPrimary" component="p">
						<Link onClick={() => history.push(`/profile/${post._user._id}`)}>
							{post._user.name}
						</Link>{' '}
						<span style={{ textDecorationStyle: 'none' }}>
							{post.postDescription}
						</span>
					</Typography>

					<CommentList
						comments={post._comments.slice(0, 2)}
						postId={post._id}
						userId={user._id}
					/>
					{post._comments.length > 2 && <Typography>View More</Typography>}
				</CardContent>
				<CommentForm userId={user._id} postId={post._id} inputRef={inputRef} />
			</Card>
		);
	}
}

export default PostFeed;
