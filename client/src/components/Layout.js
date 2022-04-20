import React, { useEffect } from 'react';
import {
	Button,
	AppBar,
	Toolbar,
	IconButton,
	Avatar,
	makeStyles,
} from '@material-ui/core';

import InstagramIcon from '@material-ui/icons/Instagram';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { googleLogin, googleLogout } from '../actions';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	appbar: {
		width: '100%',
		marginBottom: '0',
		backgroundColor: '#fefefe',
	},
	menuButton: {
		flexGrow: 1,
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

function Layout({ children }) {
	const classes = useStyles();

	const user = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(googleLogin());
	}, [dispatch]);

	const renderedSignIn = () => {
		if (user) {
			return (
				<Avatar
					alt={user.name}
					src={user.picture}
					className={classes.avatar}
					onClick={() => history.push(`/profile/${user._id}`)}
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
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="black"
						aria-label="menu"
						onClick={() => history.push('/')}
					>
						<InstagramIcon />
						Instagram
					</IconButton>
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
