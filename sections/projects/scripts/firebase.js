// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBuxLIUM3MsUMsjxbAd5nYsQ4YT1EMIjmI",
    authDomain: "flutter-developer-96ae8.firebaseapp.com",
    projectId: "flutter-developer-96ae8",
    storageBucket: "flutter-developer-96ae8.appspot.com",
    messagingSenderId: "549982520145",
    appId: "1:549982520145:web:af2dc806075badbe014970",
    measurementId: "G-R1VQLGVQ87"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };  // Export the db object so it can be used in other files
