import React from "react";
import { Switch, Route } from "react-router-dom";

//Pages
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Artist from "../pages/Artist/Artist";
import Artists from "../pages/Artists";

const Routes = ({ user, setReloadApp }) => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/artists" exact>
        <Artists />
      </Route>
      <Route path="/artist/:id" exact>
        <Artist />
      </Route>
      <Route path="/settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} />
      </Route>
    </Switch>
  );
};

export default Routes;
