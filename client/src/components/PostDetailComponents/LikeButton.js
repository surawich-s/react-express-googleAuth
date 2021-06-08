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

function LikeButton({ user, postId }) {
  const dispatch = useDispatch();
  const [likeButtonColor, setLikeButtonColor] = useState("secondary");

  const handleLikeButtonColor = () => {
    if (likeButtonColor === "secondary") {
      setLikeButtonColor("primary");
    } else {
      setLikeButtonColor("secondary");
    }
  };

  const handleLikeDispatch = () => {
    const likeData = {
      userId: user._id,
      userName: user.name,
      createdAt: new Date(),
    };
    dispatch(likePost(postId, likeData));
  };

  const handleLike = (e) => {
    e.preventDefault();
    if (user._id) {
      handleLikeButtonColor();
      handleLikeDispatch();
    }
  };
  return (
    <IconButton aria-label="like" onClick={handleLike} color={likeButtonColor}>
      <FavoriteIcon />
    </IconButton>
  );
}

export default LikeButton;
