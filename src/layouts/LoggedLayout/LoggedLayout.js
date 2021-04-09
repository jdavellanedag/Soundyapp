import React from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";
import "./LoggedLayout.scss";
import MenuLeft from "../../components/MenuLeft";

const LoggedLayout = ({ user }) => {
  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <h2>TopBar</h2>
            <Routes />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row width={16}>
          <h2>Player</h2>
        </Grid.Row>
      </Grid>
    </Router>
  );
};

export default LoggedLayout;
