import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyAMbAqeCM-UMLf0wWCmQRkK7XRIAed1yFM",
        authDomain: "test-firebase-a2796.firebaseapp.com", // Derived from project ID
        databaseURL: "https://test-firebase-a2796-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "test-firebase-a2796",
        storageBucket: "test-firebase-a2796.firebasestorage.app",
        messagingSenderId: "434486016550",
        appId: "1:434486016550:android:28cbf845c2953e725d04e7",
    }
};

const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
