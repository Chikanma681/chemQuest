import React from "react";
import { signInWithGoogle } from "../config/firebase";

const HomePage = () => {
  return (
    <div>
      <h1>ChemSim</h1>
    <button onClick={signInWithGoogle}> Sign In </button>
      {/* Other components or content */}
    </div>
  );
};

export default HomePage;
