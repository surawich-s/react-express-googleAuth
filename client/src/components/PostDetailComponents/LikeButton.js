import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { updatePost } from "../../actions";

function LikeButton({ user, postData, handleChange }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(
    postData.likes.some((like) => like.userId === user._id)
  );

  // const handleLikeDispatch = () => {
  //   if (liked) {
  //     const likeData = {
  //       userId: user._id,
  //       userName: user.name,
  //       createdAt: new Date(),
  //     };
  //     // postData.likes.push(likeData);
  //     // dispatch(updatePost(postData._id, postData));
  //     console.log("liked", liked);
  //   } else {
  //     console.log("unliked", liked);
  //   }

  //   // dispatch(likePost(postId, likeData));
  // };

  const handleLike = (e) => {
    e.preventDefault();
    if (!liked) {
      const likeData = {
        userId: user._id,
        userName: user.name,
        createdAt: new Date(),
      };
      postData.likes.push(likeData);
      handleChange(postData);
      console.log(postData.likes, liked);
    } else {
      const newLikeData = postData.likes.filter(
        (like) => like.userId !== user._id
      );
      postData.likes = newLikeData;
      handleChange(postData);
      console.log(postData.likes, liked);
    }
    setLiked(!liked);
  };

  useEffect(() => {
    dispatch(updatePost(postData._id, postData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liked]);
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
