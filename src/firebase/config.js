// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKXmlRKfOrzTZXXMHBhFx0hx1AirXVoAY",
  authDomain: "chat-app-86baf.firebaseapp.com",
  projectId: "chat-app-86baf",
  storageBucket: "chat-app-86baf.appspot.com",
  messagingSenderId: "547077139771",
  appId: "1:547077139771:web:a57794813eb1b0cafd1b1e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//? auth referansını alma
export const auth = getAuth(app);
//? saağlayıcının kurulumunu yapma
export const provider = new GoogleAuthProvider();
//? veritabanının referansını alma
export const db = getFirestore(app);
