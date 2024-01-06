// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0q1Kst3EQwtSkXTZwDv7ca2RvFjN9HUg",
  authDomain: "chemsimm.firebaseapp.com",
  projectId: "chemsimm",
  storageBucket: "chemsimm.appspot.com",
  messagingSenderId: "730276358819",
  appId: "1:730276358819:web:b9d8883b0b78c0f2146d16",
  measurementId: "G-9GF5JC5SKQ"
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

// export const 