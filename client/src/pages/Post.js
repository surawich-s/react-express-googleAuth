import React, { useEffect } from 'react';
import { makeStyles, LinearProgress } from '@material-ui/core';
import PostDetail from '../components/postdetail/PostDetail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById } from '../actions';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'block',
		margin: 'auto',
		marginTop: '20px',
		width: '60vw',
	},
}));

function Post(props) {
	const dispatch = useDispatch();
	const { id } = useParams();
	const post = useSelector((state) => state.post[id]);
	const classes = useStyles();

	useEffect(() => {
		dispatch(fetchPostById(id));
	}, [dispatch, id]);
	if (!post) {
		return <LinearProgress />;
	}
	return (
		<div className={classes.root}>
			<PostDetail post={post} />
		</div>
	);
}

export default Post;
