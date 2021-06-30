import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { updatePost } from "../../actions";

function LikeButton({ userId, postId }) {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const likeData = { _post: postId, _user: userId };

  const handleLike = (e) => {
    e.preventDefault();
  };

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
