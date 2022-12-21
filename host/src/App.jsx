import React from "react";
import LoginPage from "user/loginPage";
import CatalogPage from "./pages/CatalogPage";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./index.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route path="/catalog">
          <CatalogPage />
        </Route>
        <Route path="/payment">
          <div>Page Paiement</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
