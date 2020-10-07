import React from "react";
import { Button } from "semantic-ui-react";

import "./AuthOptions.scss";

const AuthOptions = (props) => {
  const { setSelectedForm } = props;

  return (
    <div className="auth-options">
      <h2>Millones de canciones para que disfrutes</h2>
      <Button className="register" onClick={() => setSelectedForm("register")}>
        Registrate gratis
      </Button>
      <Button className="login" onClick={() => setSelectedForm("login")}>
        Iniciar sesión
      </Button>
    </div>
  );
};

export default AuthOptions;
