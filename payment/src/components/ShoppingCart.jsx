import React, { useState, useEffect } from "react";
import shoppingCartImg from "../../public/shopping-cart.png";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchReservation, cancelReservation } from "../payment-shared/api";
import {
  CREATE_RESERVATION_EVENT,
  CANCEL_RESERVATION_EVENT,
} from "../payment-shared/event";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const [reservations, setReservations] = useState();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleShoppingCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleReservationCancel = (treeId) => {
    cancelReservation(treeId).then(() => {
      fetchReservation().then((reservations) => {
        setReservations(reservations);
        const cancelReservationEvent = new CustomEvent(
          CANCEL_RESERVATION_EVENT
        );
        window.dispatchEvent(cancelReservationEvent);
      });
    });
  };

  useEffect(() => {
    fetchReservation().then((reservations) => {
      setReservations(reservations);
    });
    window.addEventListener(CREATE_RESERVATION_EVENT, (e) => {
      fetchReservation().then((reservations) => {
        setReservations(reservations);
      });
    });
  }, []);

  return (
    <>
      <div
        className="payment-mfe--shoppingCartContainer"
        onClick={handleShoppingCartClick}
      >
        {reservations?.length > 0 && (
          <div className="payment-mfe--shoppingCartNumber">{`${reservations?.length}`}</div>
        )}
        <img src={shoppingCartImg} width={"32px"} />
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
        {reservations?.length > 0 ? (
          reservations.map((reservation) => (
            <div className="payment-mfe--reservationContainer">
              <Typography sx={{ p: 2 }}>
                {reservation.name} - {reservation.price} €
              </Typography>
              <div
                className="payment-mfe--cancelIconContainer"
                onClick={() => handleReservationCancel(reservation.treeId)}
              >
                <DeleteIcon />
              </div>
            </div>
          ))
        ) : (
          <Typography sx={{ p: 2 }}>Votre panier est vide</Typography>
        )}
      </Popover>
    </>
  );
};

export default ShoppingCart;
