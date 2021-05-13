import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
	apiKey: "AIzaSyBYIjjGVmi94NChP3ivN9qviErKnUw3Z5I",
	authDomain: "purple-cress-manga-reader.firebaseapp.com",
	projectId: "purple-cress-manga-reader",
	storageBucket: "purple-cress-manga-reader.appspot.com",
	messagingSenderId: "333031723475",
	appId: "1:333031723475:web:d44edd46d5048567c21f26",
	measurementId: "G-HHDSPK3CGS",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

// //uncomment to use emulator
// if (window.location.hostname === "localhost") {
// 	db.useEmulator("localhost", 8080);
// }

//no storage emulation :(
const storage = app.storage().ref();

export { firebase, db, storage };
