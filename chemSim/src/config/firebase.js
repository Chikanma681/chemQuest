
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup,signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv8aHzsd35O94QxLhlxhZsm70lsf33nDg",
  authDomain: "last-63619.firebaseapp.com",
  projectId: "last-63619",
  storageBucket: "last-63619.appspot.com",
  messagingSenderId: "692270921424",
  appId: "1:692270921424:web:e888711f12cb02e91410d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Trigger Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in:", user);
    // You can access user information here
        // Get the access token from the user object
    const accessToken = user.accessToken;

    // Store the access token in localStorage
    localStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth)
    console.log('Logged Out')
  } catch (err) {
    console.err("Logout Failed", err)
  }
}
