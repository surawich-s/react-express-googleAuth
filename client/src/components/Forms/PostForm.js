import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import {
	Typography,
	Button,
	Container,
	TextField,
	IconButton,
	makeStyles,
	Modal,
	Fade,
	Backdrop,
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createPost } from '../../actions';

const useStyles = makeStyles((theme) => ({
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: 'block',
	},
	button: {
		margin: theme.spacing(1),
		alignSelf: 'center',
	},
	modal: {
		width: '50%',
		marginRight: 'auto',
		marginLeft: 'auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	form: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function PostForm() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();
	const [postData, setPostData] = useState({
		postImage: '',
		postDescription: '',
	});
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// if (postData.postImage) {
		// 	dispatch(createPost(postData));
		// 	handleClose();
		// 	history.push(`/profile/${id}`);
		// }
		if (postData.postImage) {
			dispatch(createPost(postData));
			handleClose();
			history.push('/');
		}
	};

	return (
		<>
			<IconButton
				disableRipple={true}
				disableFocusRipple={true}
				color="primary"
				className={classes.button}
				onClick={handleOpen}
				style={{ backgroundColor: 'transparent' }}
			>
				<AddAPhotoOutlinedIcon />
			</IconButton>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Container className={classes.form}>
						<Typography variant="h6" color="primary" component="h2" gutterBottom>
							Create a New Post
						</Typography>
						<form noValidate autoComplete="off" onSubmit={handleSubmit}>
							<FileBase
								type="file"
								multiple={false}
								onDone={({ base64 }) => setPostData({ ...postData, postImage: base64 })}
							/>
							<TextField
								onChange={(e) =>
									setPostData({ ...postData, postDescription: e.target.value })
								}
								className={classes.field}
								label="Description"
								variant="outlined"
								color="secondary"
								multiline
								rows={4}
								fullWidth
								required
							/>

							<Button
								type="submit"
								color="white"
								variant="outlined"
								endIcon={<KeyboardArrowRightIcon />}
							>
								Submit
							</Button>
						</form>
					</Container>
				</Fade>
			</Modal>
		</>
	);
}

export default PostForm;
