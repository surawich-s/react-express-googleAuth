import React from "react";
import { Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router";

function LikeDetail({ likesCount }) {
  const history = useHistory();

  return (
    <Typography variant="body1" color="textPrimary" component="p">
      {likesCount} likes
    </Typography>
  );
}

export default LikeDetail;
