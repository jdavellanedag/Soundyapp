import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIwBLO7fo0vi3Naz9n1QK7H9vGmscxX04",
  authDomain: "soundyapp-caed8.firebaseapp.com",
  databaseURL: "https://soundyapp-caed8.firebaseio.com",
  projectId: "soundyapp-caed8",
  storageBucket: "soundyapp-caed8.appspot.com",
  messagingSenderId: "533295517681",
  appId: "1:533295517681:web:f6cb4ee1907aa5fa6c7e50",
};

export default firebase.initializeApp(firebaseConfig);
