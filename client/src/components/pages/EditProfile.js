import React from "react";
import { LinearProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProfileForm from "../Forms/ProfileForm";

function EditProfile(props) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { id } = useParams();
  if (!userInfo) {
    return <LinearProgress />;
  }
  return (
    <ProfileForm
      name={userInfo.name}
      picture={userInfo.picture}
      profileDescription={userInfo.profileDescription}
      id={id}
    />
  );
}

export default EditProfile;
