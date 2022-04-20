import React from 'react';
import { Typography } from '@material-ui/core';

function LikeDetail({ likesCount }) {
	return (
		<Typography variant="body1" color="textPrimary" component="p">
			{likesCount} likes
		</Typography>
	);
}

export default LikeDetail;
