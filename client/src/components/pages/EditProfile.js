import React from "react";
import { LinearProgress, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProfileForm from "../Forms/ProfileForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    width: "50%",
    margin: "auto",
    marginTop: theme.spacing(4),
  },
}));

function EditProfile() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { id } = useParams();
  const classes = useStyles();
  if (!userInfo) {
    return <LinearProgress />;
  }
  return (
    <div className={classes.root}>
      <ProfileForm
        name={userInfo.name}
        picture={userInfo.picture}
        profileDescription={userInfo.profileDescription}
        id={id}
      />
    </div>
  );
}

export default EditProfile;
