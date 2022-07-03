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
	loginPanel: {
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

function Layout({ children }) {
	const classes = useStyles();

	const { userLogin } = useSelector((state) => ({
		userLogin: state.user.userInfo,
	}));
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(googleLogin());
	}, [dispatch]);

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
							color="primary"
							aria-label="logo"
							onClick={() => history.push('/')}
						>
							<InstagramIcon />
							Instagram
						</IconButton>
					</Box>

					{userLogin ? (
						<Box className={classes.loginPanel}>
							<PostForm />
							<Avatar
								alt={userLogin.name}
								src={userLogin.picture}
								className={classes.avatar}
								onClick={() => history.push(`/profile/${userLogin._id}`)}
							/>
							<Button onClick={handleLogout}>Log out</Button>
						</Box>
					) : (
						<Box className={classes.loginPanel}>
							<Button onClick={handleLogin}>Log in</Button>
							<Button onClick={handleLogin}>Sign up</Button>
						</Box>
					)}
				</Toolbar>
			</AppBar>
			{children}
		</>
	);
}

export default Layout;
