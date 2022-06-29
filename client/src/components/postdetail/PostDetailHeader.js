import React from 'react';
import { CardHeader, Avatar, IconButton, Typography } from '@material-ui/core';
import SettingButton from './SettingButton';
import { useHistory } from 'react-router';

function PostDetailHeader({ post }) {
	const history = useHistory();
	return (
		<CardHeader
			id="simple-modal-title"
			avatar={
				<Avatar
					aria-label="avatar"
					alt={post._user.name}
					src={post._user.picture}
					onClick={() => history.push(`/profile/${post._user._id}`)}
				></Avatar>
			}
			action={
				<IconButton aria-label="settings">
					<SettingButton postId={post._id} />
				</IconButton>
			}
			title={
				<Typography onClick={() => history.push(`/profile/${post._user._id}`)}>
					{post._user.name}
				</Typography>
			}
		/>
	);
}

export default PostDetailHeader;
