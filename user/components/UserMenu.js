import styles from "./UserMenu.module.css";

import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

import * as React from "react";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    localStorage.setItem("token", undefined);
    window.location.href = "http://localhost:8080/#/login";
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div className={styles.userMfeMenuContainer} onClick={handleUserClick}>
        <img
          src="http://localhost:8081/user-icon.png"
          width={"32px"}
          height={"32px"}
        />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Button
          className={styles.userMfeLogoutButton}
          onClick={handleLogoutClick}
        >
          Se déconnecter
        </Button>
      </Popover>
    </>
  );
};

export default UserMenu;
