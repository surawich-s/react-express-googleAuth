import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { likePost, unlikePost } from "../../actions";
import { getLike } from "../../api";

function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.preventDefault();
    if (liked) {
      dispatch(unlikePost(postId));
      setLiked(false);
    } else {
      dispatch(likePost(postId));
    }
  };

  useEffect(() => {
    getLike(postId).then((response) => {
      setLiked(response.data);
    });
  });

  return (
    <IconButton
      aria-label="like"
      onClick={handleLike}
      color={liked ? "primary" : "secondary"}
    >
      <FavoriteIcon />
    </IconButton>
  );
}

export default LikeButton;
