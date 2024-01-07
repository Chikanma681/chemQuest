import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Button,
  Container,
} from "reactstrap";
import { signInWithGoogle, logout } from "../config/firebase";
import { Link } from "react-router-dom";

const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSignIn = () => {
    signInWithGoogle().then(() => {
      setIsAuth(true);
    });
  };

  const handleSignOut = () => {
    logout().then(() => {
      setIsAuth(false);
    });
  };

  const buttonStyle = {
    backgroundColor: '#1a1a1a',
    borderColor: 'transparent',
    color: isHovered ? '#646cff' : '#ffffff', // Change text color on hover
  };

  return (
    <Navbar style={{ backgroundColor: '#242424', color: 'rgba(255, 255, 255, 0.87)' }} dark expand="sm">
      <Container className="d-flex justify-content-between align-items-center">
        <NavbarBrand href="/" style={{ fontWeight: '500'}}>
          <h5>ChemQuest</h5>
        </NavbarBrand>
        <div className="ml-auto">
          {!isAuth ? (
            <Button
              onClick={handleSignIn}
              className="custom-button"
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
              onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
            >
              <strong>Sign In</strong>
            </Button>
          ) : (
            <Button
              onClick={handleSignOut}
              className="custom-button"
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
              onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
            >
              Logout
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
