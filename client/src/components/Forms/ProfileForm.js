import React, { useState, useEffect } from 'react';
import {
	Typography,
	Button,
	Container,
	TextField,
	makeStyles,
	Avatar,
	Grid,
	LinearProgress,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateUser } from '../../actions/';
import UploadBase64 from '../UploadBase64';

const useStyles = makeStyles((theme) => ({
	form: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[3],
		padding: theme.spacing(2, 4, 3),
	},
	formContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: '15%',
		paddingTop: theme.spacing(2),
	},
	formElement: {
		marginBottom: theme.spacing(2),
	},
	formLabel: {
		paddingRight: '20px',
	},
	formField: {
		paddingTop: 0,
		marginTop: 0,
	},
	submitButton: {
		width: '20%',
	},
}));

const INITIAL_STATE = {
	name: '',
	picture: '',
	profileDescription: '',
};

function ProfileForm({ name, picture, profileDescription, id }) {
	const [userData, setUserData] = useState(INITIAL_STATE);
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		setUserData({
			name: name,
			picture: picture,
			profileDescription: profileDescription,
		});
	}, [name, picture, profileDescription]);

	console.log(userData);

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(userData);
		dispatch(updateUser(id, userData));
		history.push(`/profile/${id}`);
	};

	const handleOnDoneUpload = (uploadedFiles) => {
		setUserData({ ...userData, picture: uploadedFiles });
		// dispatch(updateUser(id, { picture: uploadedFiles }));
	};

	if (!userData) {
		return <LinearProgress />;
	}

	return (
		<Container className={classes.form}>
			<form
				className={classes.formContainer}
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<Grid container className={classes.formElement}>
					<Grid container xs={3} justify="flex-end" className={classes.formLabel}>
						<Avatar alt={userData.name} src={userData.picture} />
					</Grid>
					<Grid container xs={9} className={classes.formField}>
						<UploadBase64
							defaultPicture={userData.picture}
							handleDoneUpload={handleOnDoneUpload}
						/>
					</Grid>
				</Grid>
				<Grid container className={classes.formElement}>
					<Grid container justify="flex-end" xs={3} className={classes.formLabel}>
						<Typography>Name</Typography>
					</Grid>
					<Grid container xs={9} className={classes.formField}>
						<TextField
							style={{ paddingTop: '0' }}
							value={userData.name}
							onChange={(e) => setUserData({ ...userData, name: e.target.value })}
							variant="outlined"
						/>
					</Grid>
				</Grid>
				<Grid container className={classes.formElement}>
					<Grid container xs={3} justify="flex-end" className={classes.formLabel}>
						<Typography>Bio</Typography>
					</Grid>
					<Grid container xs={9} className={classes.formField}>
						<TextField
							value={userData.profileDescription}
							onChange={(e) =>
								setUserData({ ...userData, profileDescription: e.target.value })
							}
							className={classes.field}
							variant="outlined"
							color="secondary"
							multiline
							rows={4}
						/>
					</Grid>
				</Grid>

				<Grid container>
					<Grid container xs={3}></Grid>
					<Grid container xs={9}>
						<Button
							type="submit"
							color="white"
							variant="outlined"
							className={classes.submitButton}
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default ProfileForm;
