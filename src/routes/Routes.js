import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/artists" exact>
        <h1>Artists</h1>
      </Route>
      <Route path="/settings" exact>
        <h1>Config</h1>
      </Route>
    </Switch>
  );
};

export default Routes;
