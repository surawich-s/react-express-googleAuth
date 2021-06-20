import React from "react";
import { LinearProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ProfileForm from "../Forms/ProfileForm";

function EditProfile(props) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { id } = useParams();
  if (!userInfo) {
    return <LinearProgress />;
  }
  return <ProfileForm userInfo={userInfo} id={id} />;
}

export default EditProfile;
