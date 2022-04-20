import React, { useState } from 'react';
import { makeStyles, Typography, IconButton, Modal } from '@material-ui/core';
import PostDetailModal from './postdetail/PostDetailModal';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

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
	const [open, setOpen] = useState(false);
	const [hoverEffect, setHoverEffect] = useState(false);
	const ref = React.useRef();
	const classes = useStyles();

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.imageContainer}>
			<img
				className={classes.image}
				src={post.postImage}
				alt={post._id}
				onClick={() => setOpen(true)}
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

			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
			>
				<PostDetailModal post={post} ref={ref} />
			</Modal>
		</div>
	);
}

export default UserPost;
