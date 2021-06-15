import React from "react";
import { Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router";

function LikeDetail({ postData }) {
  const history = useHistory();
  const numberLikes = postData.likes.length || 0;

  const renderedLike = () => {
    if (numberLikes < 1) {
      return (
        <Typography variant="body1" color="textPrimary" component="p">
          0 likes
        </Typography>
      );
    } else {
      return (
        <Typography variant="body1" color="textPrimary" component="p">
          {"Liked by "}
          <Link
            onClick={() =>
              history.push(`/profile/${postData.likes[numberLikes - 1].userId}`)
            }
          >
            {postData.likes[numberLikes - 1].userName}
          </Link>{" "}
          {numberLikes > 2 ? ` and ${numberLikes} others` : null}
        </Typography>
      );
    }
  };

  return <>{renderedLike()}</>;
}

export default LikeDetail;
