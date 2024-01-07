import React from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#ffffff",
  };

  return (
    <Navbar
      style={{ backgroundColor: "#242424", color: "rgba(255, 255, 255, 0.87)" }}
      dark
      expand="sm"
    >
      <Container style={containerStyle}>
        <NavbarBrand href="/" style={{ fontWeight: "500" }}>
          <h5>ChemQuest</h5>
        </NavbarBrand>
        <div>
          <Link to="/menu" style={linkStyle}>
            <strong>Menu</strong>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
