import firebase from "firebase";

const firebaseConfig = firebase.initializeApp( {
    apiKey: "AIzaSyBE8nQ6meLBYUEoD2lCRV7KmkD9LeQNG9U",
    authDomain: "instagram-clone-react-95da2.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-95da2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "instagram-clone-react-95da2",
    storageBucket: "instagram-clone-react-95da2.appspot.com",
    messagingSenderId: "790434186611",
    appId: "1:790434186611:web:bd78a91b7304a2b0577106",
    measurementId: "G-DBZDLNEY22"
  });

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };




// export default db;