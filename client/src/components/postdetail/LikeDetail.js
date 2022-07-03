import React from 'react';
import { Typography } from '@material-ui/core';

function LikeDetail({ likesCount }) {
	return (
		<Typography
			style={{ fontWeight: 'bold' }}
			color="primary"
			fontWeight="fontWeightBold"
			component="p"
		>
			{likesCount} likes
		</Typography>
	);
}

export default LikeDetail;
