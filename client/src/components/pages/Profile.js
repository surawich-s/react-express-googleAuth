import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Avatar, Button, Box } from "@material-ui/core";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchUser } from "../../actions/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
    paddingLeft: theme.spacing(30),
  },

  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
  button: {
    margin: theme.spacing(1),
    alignSelf: "center",
  },
}));

function Profile() {
  const classes = useStyles();
  const user = useSelector((state) => state.user.fetchedUser);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);
  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={10}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <Avatar
                className={(classes.img, classes.large)}
                alt={user.name}
                src={user.picture}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" color="textPrimary">
                  {user.name}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  ID: {user._id}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddAPhotoOutlinedIcon />}
        >
          Add Post
        </Button>
      </Box>
    </div>
  );
}

export default Profile;
