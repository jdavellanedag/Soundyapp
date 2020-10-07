import React, { useState } from "react";
import firebase from "./utils/Firebase";
import "firebase/auth";
import Auth from "./pages/Auth";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChanged((currentuser) => {
    if (!currentuser) {
      setUser(null);
    } else {
      setUser(currentuser);
    }
    setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }

  return !user ? <Auth /> : <UserLogged />;
};

// Mock for userloged, delete this thing in future
const UserLogged = () => {
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>Usuario logeado</h1>
      <button onClick={logout}>Cerrar sesion</button>
    </div>
  );
};

export default App;
