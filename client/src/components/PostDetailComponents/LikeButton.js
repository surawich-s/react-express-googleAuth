import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { likePost } from "../../actions";

const INITIAL_STATE = {
  userId: "",
  userName: "",
  createdAt: "",
};

function LikeButton({ user, postData, handleChange }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  const handleLikeDispatch = () => {
    if (liked) {
      const likeData = {
        userId: user._id,
        userName: user.name,
        createdAt: new Date(),
      };
      postData.likes.push(likeData);
      console.log(postData);
    }

    // dispatch(likePost(postId, likeData));
  };

  const handleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
    if (user._id) {
      handleLikeDispatch();
    }
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
