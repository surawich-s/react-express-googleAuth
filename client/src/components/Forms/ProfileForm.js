import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import {
  Typography,
  Button,
  Container,
  TextField,
  makeStyles,
  Avatar,
  Grid,
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updateUser } from "../../actions/";
import UploadBase64 from "../UploadBase64";

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "15%",
  },
  formElement: {
    marginBottom: "20px",
  },
  formLabel: {
    paddingRight: "20px",
  },
  formField: {
    paddingTop: 0,
    marginTop: 0,
  },
  submitButton: {
    width: "20%",
  },
}));

function ProfileForm({ userInfo, id }) {
  const [userData, setUserData] = useState(userInfo);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    dispatch(updateUser(id, userData));
  };

  const handleOnDoneUpload = (uploadedFiles) => {
    setUserData({ ...userData, picture: uploadedFiles });
  };

  return (
    <Container className={classes.form}>
      {/* <Typography
        variant="h6"
        // color="textSecondary"
        component="h2"
        gutterBottom
      >
        Edit Profile
      </Typography> */}
      <form
        className={classes.formContainer}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container className={classes.formElement}>
          <Grid
            container
            xs={3}
            justify="flex-end"
            className={classes.formLabel}
          >
            <Avatar src={userData.picture} />
          </Grid>
          <Grid container xs={9} className={classes.formField}>
            <UploadBase64
              defaultPicture={userData.picture}
              handleDoneUpload={handleOnDoneUpload}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.formElement}>
          <Grid
            container
            justify="flex-end"
            xs={3}
            className={classes.formLabel}
          >
            <Typography>Username</Typography>
          </Grid>
          <Grid container xs={9} className={classes.formField}>
            <TextField
              style={{ paddingTop: "0" }}
              value={userData.userName ? userData.userName : ""}
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container className={classes.formElement}>
          <Grid
            container
            justify="flex-end"
            xs={3}
            className={classes.formLabel}
          >
            <Typography>Name</Typography>
          </Grid>
          <Grid container xs={9} className={classes.formField}>
            <TextField
              style={{ paddingTop: "0" }}
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container className={classes.formElement}>
          <Grid
            container
            xs={3}
            justify="flex-end"
            className={classes.formLabel}
          >
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
              color="primary"
              variant="contained"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ProfileForm;
