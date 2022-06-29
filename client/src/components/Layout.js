import React, { useEffect } from 'react';
import {
	Button,
	AppBar,
	Toolbar,
	IconButton,
	Avatar,
	makeStyles,
	Box,
} from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { googleLogin, googleLogout } from '../actions';
import PostForm from '../components/forms/PostForm';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	appbar: {
		width: '100%',
		marginBottom: '0',
		backgroundColor: '#fefefe',
	},
	logoButton: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'center',
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

function Layout({ children }) {
	const classes = useStyles();

	const { user, userLogin } = useSelector((state) => ({
		user: state.user.fetchedUser,
		userLogin: state.user.userInfo,
	}));
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(googleLogin());
	}, [dispatch]);

	const renderedSignIn = () => {
		if (userLogin) {
			return (
				<Avatar
					alt={userLogin.name}
					src={userLogin.picture}
					className={classes.avatar}
					onClick={() => history.push(`/profile/${userLogin._id}`)}
				/>
			);
		}
	};

	const handleLogin = (e) => {
		e.preventDefault();
		const googleLoginUrl = 'http://localhost:5000/api/v1/google';
		window.open(googleLoginUrl, '_self');
	};

	const handleLogout = (e) => {
		dispatch(googleLogout());
		history.push('/');
	};

	return (
		<>
			<AppBar position="sticky" className={classes.appbar} elevation={1}>
				<Toolbar>
					<Box className={classes.logoButton}>
						<IconButton
							disableRipple={true}
							disableFocusRipple={true}
							color="black"
							aria-label="logo"
							onClick={() => history.push('/')}
						>
							<InstagramIcon />
							Instagram
						</IconButton>
					</Box>

					<PostForm />
					{renderedSignIn()}

					{user ? (
						<Button onClick={handleLogout}>Log out</Button>
					) : (
						<Button onClick={handleLogin}>Login Bro</Button>
					)}
				</Toolbar>
			</AppBar>
			{children}
		</>
	);
}

export default Layout;
