// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAghvEp06y6genxXzvEHoCZCYbUPtWpU-M",
  authDomain: "mbtestapp-32be2.firebaseapp.com",
  projectId: "mbtestapp-32be2",
  storageBucket: "mbtestapp-32be2.firebasestorage.app",
  messagingSenderId: "354817685069",
  appId: "1:354817685069:web:6714b6d38d424681594e04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const registerFirebaseUser = async (userEmail, userPassword) => {
    try {
        await createUserWithEmailAndPassword(
          auth,
          userEmail,
          userPassword
        );
        return "registered";
      } catch (error) {
        console.log(error);
        return "unregistered";
      }
};

export const signinFirebaseUser = async (userEmail, userPassword) => {
    try {
      const result = await signInWithEmailAndPassword(auth, userEmail, userPassword);
      return { email: result.user.email, uid: result.user.uid, accessToken: result.user.accessToken} ;
    } catch (error) {
      if (error) {
        return (error.message);
      }
    }
}