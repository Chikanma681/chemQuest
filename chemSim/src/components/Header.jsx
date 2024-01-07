import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, Container, Nav, NavLink, NavItem, Button } from 'reactstrap';
import { signInWithGoogle, logout } from '../config/firebase';

const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const handleSignIn = () => {
    signInWithGoogle().then(() => {
      localStorage.setItem('authToken', 'your_auth_token_here');
      setIsAuth(true);
    });
  };

  const handleSignOut = () => {
    logout().then(() => {
      localStorage.removeItem('authToken');
      setIsAuth(false);
    });
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  };

  const buttonStyle = {
    backgroundColor: '#1a1a1a',
    borderColor: 'transparent',
    marginLeft: '20px',
    color: '#ffffff',
  };

  const hoveredButtonStyle = {
    ...buttonStyle,
    color: '#646cff',
  };

  return (
    <Navbar style={{ backgroundColor: '#242424', color: 'rgba(255, 255, 255, 0.87)' }} dark expand="sm">
      <Container style={containerStyle}>
        <NavbarBrand href="/" style={{ fontWeight: '500' }}>
          <h5>ChemQuest</h5>
        </NavbarBrand>
        <div>
          <Nav navbar className="ms-auto mb-lg-0">
            <NavItem>
              <NavLink
                href="/menu"
                style={isMenuHovered ? hoveredButtonStyle : buttonStyle}
                onMouseEnter={() => setIsMenuHovered(true)}
                onMouseLeave={() => setIsMenuHovered(false)}
              >
                <strong>Menu</strong>
              </NavLink>
            </NavItem>
            <NavItem>
              {isAuth ? (
                <Button
                  style={isLoginHovered ? hoveredButtonStyle : buttonStyle}
                  onClick={handleSignOut}
                  onMouseEnter={() => setIsLoginHovered(true)}
                  onMouseLeave={() => setIsLoginHovered(false)}
                >
                  <strong>Logout</strong>
                </Button>
              ) : (
                <Button
                  style={isLoginHovered ? hoveredButtonStyle : buttonStyle}
                  onClick={handleSignIn}
                  onMouseEnter={() => setIsLoginHovered(true)}
                  onMouseLeave={() => setIsLoginHovered(false)}
                >
                  <strong>Login</strong>
                </Button>
              )}
            </NavItem>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
