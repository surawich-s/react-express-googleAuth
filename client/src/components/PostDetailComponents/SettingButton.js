import React, { useState } from "react";
import { useHistory } from "react-router";
import { Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function SettingButton({ postId, ownId, userId, commentUserId, handleRemove }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleClose();
    handleRemove(ownId);
  };

  return (
    <>
      <MoreHorizIcon style={{ marginLeft: "auto" }} onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {postId && (
          <MenuItem onClick={() => history.push(`/p/${postId}`)}>
            Go to Post
          </MenuItem>
        )}
        {userId && commentUserId === userId && (
          <MenuItem onClick={handleDelete}>Delete Comment</MenuItem>
        )}
        <MenuItem onClick={handleClose}>Cancel</MenuItem>
      </Menu>
    </>
  );
}

export default SettingButton;
