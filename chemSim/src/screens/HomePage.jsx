import React from "react";
import { signInWithGoogle } from "../config/firebase";
import Header from "../components/Header";
import Animation from "../components/Animation";
import './../css/HomePage.css';

const HomePage = () => {
  return (
    <div  className="whole-page" style={{ backgroundColor: '#242424', minHeight: '100vh' }} >
      <div className="header-section" style={{color:'#ffffff'}}>
        <div>
        <h1>Welcome to ChemQuest</h1>
        <p>Simulate, Analyze, and Explore Chemical Processes</p>
        </div>

      </div>
      <div className="image-section">
        <Animation/>
      </div>
      {/* Other components or content */}
    </div>
  );
};

export default HomePage;

