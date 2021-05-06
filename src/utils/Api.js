import firebaseApp from "./Firebase";
import * as firebase from "firebase";

const db = firebase.firestore(firebaseApp);

export const isUserAdmin = async (uid) => {
  const response = await db.collection(`admins`).doc(uid).get();
  return response.exists;
};

export const reAuthenticate = (password) => {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return user.reauthenticateWithCredential(credential);
};
