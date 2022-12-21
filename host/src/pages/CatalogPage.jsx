import React from "react";
import CatalogList from "tree/CatalogList";
import CatalogItem from "tree/CatalogItem";
import { SelectedTreeProvider } from "tree/contexts/selectedTreeContext";
import LayoutHeader from "../components/LayoutHeader";
import "./CatalogPage.css";
import ReservationButton from "payment/ReservationButton";

const CatalogPage = () => {
  return (
    <div>
      <LayoutHeader />
      <div className="host-mfe--catalogContainer">
        <SelectedTreeProvider>
          <div className="host-mfe--catalogListContainer">
            <CatalogList />
          </div>
          <div className="host-mfe--catalogItemContainer">
            <CatalogItem />
            <div className="host-mfe--reservationButtonContainer">
              <ReservationButton />
            </div>
          </div>
        </SelectedTreeProvider>
      </div>
    </div>
  );
};

export default CatalogPage;
