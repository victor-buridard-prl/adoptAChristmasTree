import React from "react";
import { Typography } from "@mui/material";
import ShoppingCart from "payment/ShoppingCart";
import UserMenu from "user/userMenu";
import "./LayoutHeader.css";

const LayoutHeader = () => {
  return (
    <div className="mfe-host--layoutHeaderContainer">
      <Typography variant="h4" className="mfe-host--layoutHeaderTitle">
        Adopte un sapin
      </Typography>
      <div className="mfe-host--menuContainer">
        <ShoppingCart />
        <UserMenu />
      </div>
    </div>
  );
};

export default LayoutHeader;
