import React, { useState } from "react";
import FileBase from "react-file-base64";
import {
  Typography,
  Button,
  Container,
  TextField,
  makeStyles,
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updateUser } from "../../actions/";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  form: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ProfileForm({ userInfo, id }) {
  const [userData, setUserData] = useState(userInfo);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container className={classes.form}>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Edit Profile
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography>Name: {userData.name}</Typography>
        <TextField
          value={userData.profileDescription}
          onChange={(e) =>
            setUserData({ ...userData, profileDescription: e.target.value })
          }
          className={classes.field}
          label="Description"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
        />

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default ProfileForm;
