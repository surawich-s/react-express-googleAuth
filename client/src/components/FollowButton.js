import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { checkFollow } from "../api";
import { followUser, unfollowUser } from "../actions";

const FollowButton = ({ id }) => {
  const [follow, setFollow] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = (e) => {
    e.preventDefault();
    if (follow) {
      dispatch(unfollowUser(id));
    } else {
      dispatch(followUser(id));
    }
  };

  useEffect(() => {
    checkFollow(id).then((response) => {
      setFollow(response.data);
    });
  });

  return (
    <Button
      variant="contained"
      color={follow ? "secondary" : "primary"}
      onClick={handleFollow}
    >
      {follow ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
