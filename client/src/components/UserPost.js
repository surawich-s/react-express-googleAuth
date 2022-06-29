import React, { useState } from 'react';
import { makeStyles, Typography, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
	imageContainer: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
	},

	image: {
		width: '100%',
		height: theme.spacing(40),
		objectFit: 'cover',
		'&:hover': {
			transition: '0.5s',
			filter: 'brightness(50%)',
		},
	},
	imageHoverDetail: {
		display: 'flex',
		flexDirection: 'rows',
		position: 'absolute',
		margin: 0,
		top: '50%',
		columnGap: theme.spacing(1),
	},
	imageHoverDetailElement: {
		display: 'flex',
		flexDirection: 'rows',
		alignItems: 'center',
	},
}));

function UserPost({ post }) {
	const [hoverEffect, setHoverEffect] = useState(false);
	const classes = useStyles();
	const history = useHistory();

	return (
		<div className={classes.imageContainer}>
			<img
				className={classes.image}
				src={post.postImage}
				alt={post._id}
				onClick={() => history.push(`/p/${post._id}`)}
				onMouseEnter={() => setHoverEffect(true)}
				onMouseLeave={() => setHoverEffect(false)}
			/>
			{hoverEffect && (
				<div className={classes.imageHoverDetail}>
					<div className={classes.imageHoverDetailElement}>
						<IconButton aria-label="likesCount">
							<FavoriteIcon color="secondary" />
						</IconButton>
						<Typography color="secondary">{post.likesCount}</Typography>
					</div>
					<div className={classes.imageHoverDetailElement}>
						<IconButton aria-label="commentsCount">
							<ChatBubbleIcon color="secondary" />
						</IconButton>
						<Typography color="secondary">{post._comments.length}</Typography>
					</div>
				</div>
			)}
		</div>
	);
}

export default UserPost;
