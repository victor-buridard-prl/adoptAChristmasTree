import React, { useState, useEffect } from "react";
import { fetchReservation, postReservation } from "../payment-shared/api";
import {
  CREATE_RESERVATION_EVENT,
  SELECT_TREE_EVENT,
  CANCEL_RESERVATION_EVENT,
} from "../payment-shared/event";

import Button from "@mui/material/Button";
import "./ReservationButton.css";

const ReservationButton = () => {
  const [selectedTreeId, setSelectedTreeId] = useState();
  const [reservation, setReservation] = useState();

  const handleAdoptionClick = () => {
    postReservation(selectedTreeId).then(() => {
      const createReservationEvent = new CustomEvent(CREATE_RESERVATION_EVENT, {
        detail: { treeId: selectedTreeId },
      });
      fetchReservation().then((reservations) => {
        const reservation = reservations.find(
          (reservation) => reservation.treeId === Number(selectedTreeId)
        );
        setReservation(reservation);
      });
      window.dispatchEvent(createReservationEvent);
    });
  };

  useEffect(() => {
    window.addEventListener(SELECT_TREE_EVENT, (e) => {
      const treeId = e.detail.treeId;
      setSelectedTreeId(treeId);
      fetchReservation().then((reservations) => {
        const reservation = reservations.find(
          (reservation) => reservation.treeId === Number(treeId)
        );
        setReservation(reservation);
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener(CANCEL_RESERVATION_EVENT, (e) => {
      fetchReservation().then((reservations) => {
        const reservation = reservations.find(
          (reservation) => reservation.treeId === Number(treeId)
        );
        setReservation(reservation);
      });
    });
  }, []);

  if (!selectedTreeId) return <></>;

  return (
    <div className="payment-mfe-reservationButtonContainer">
      <Button
        sx={{
          backgroundColor: "green",
          width: "100%",
          ":hover": { backgroundColor: "#55a35a" },
        }}
        disabled={!!reservation}
        variant="contained"
        onClick={handleAdoptionClick}
      >
        Adopter cet arbre !
      </Button>
    </div>
  );
};

export default ReservationButton;
