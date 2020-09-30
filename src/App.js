import React from 'react';
import firebase from './utils/Firebase';
import 'firebase/auth';

function App() {

  firebase.auth().onAuthStateChanged(currentuser => {
    console.log(currentuser ? "Logged in" : "Not logged in");
  });

  return (
    <div>
      <h1>Electron/React App</h1>
    </div>
  );
}

export default App;
